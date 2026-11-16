import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  INQUIRY_STATUSES,
  KIND_LABELS,
  STATUS_LABELS,
  countByFilter,
  formatFileSize,
  matchesFilter,
  replyHref,
  toInboxItems,
  type InboxFilter,
  type InboxItem,
  type InquiryStatus,
} from "@/lib/inquiry-inbox";

const FILTERS: { value: InboxFilter; label: string }[] = [
  { value: "offen", label: "Offen" },
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
  { value: "archiviert", label: "Archiviert" },
  { value: "alle", label: "Alle" },
];

const DATE_FORMAT = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

async function loadInbox(): Promise<InboxItem[]> {
  const [general, parts] = await Promise.all([
    supabase
      .from("inquiries")
      .select(
        "id, created_at, kind, name, email, company, message, source_path, status, slack_notified_at, slack_error",
      )
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("teileklar_part_inquiries")
      .select(
        "id, created_at, name, email, vehicle, part, message, status, slack_notified_at, slack_error, attachment_path, attachment_name, attachment_size",
      )
      .order("created_at", { ascending: false })
      .limit(500),
  ]);
  if (general.error)
    throw new Error(`Anfragen konnten nicht geladen werden: ${general.error.message}`);
  if (parts.error)
    throw new Error(`Teilefragen konnten nicht geladen werden: ${parts.error.message}`);
  return toInboxItems(general.data, parts.data);
}

/** Posteingang des Inhaberkontos. Lesen und Statusänderung laufen mit der Anmeldung des Nutzers; die Datenbank prüft die Admin-Rolle. */
export function InquiryInbox() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<InboxFilter>("offen");
  const inbox = useQuery({ queryKey: ["workspace-inbox"], queryFn: loadInbox });
  const counts = useMemo(() => countByFilter(inbox.data ?? []), [inbox.data]);
  const visible = useMemo(
    () => (inbox.data ?? []).filter((item) => matchesFilter(item, filter)),
    [inbox.data, filter],
  );

  const setStatus = useMutation({
    mutationFn: async ({ item, status }: { item: InboxItem; status: InquiryStatus }) => {
      const { error, count } = await supabase
        .from(item.table)
        .update({ status, updated_at: new Date().toISOString() }, { count: "exact" })
        .eq("id", item.id);
      if (error) throw new Error(`Status konnte nicht gespeichert werden: ${error.message}`);
      if (count === 0)
        throw new Error(
          "Status konnte nicht gespeichert werden: keine Berechtigung für diesen Vorgang.",
        );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workspace-inbox"] }),
  });

  if (inbox.isPending)
    return (
      <p className="nx-konto-lead" role="status">
        Anfragen werden geladen …
      </p>
    );
  if (inbox.isError) {
    return (
      <div className="ws-alert" role="alert">
        <p>{inbox.error.message}</p>
        <button
          type="button"
          className="nexify-control secondary-button"
          data-variant="secondary"
          onClick={() => { void inbox.refetch(); void queryClient.invalidateQueries({ queryKey: ["workspace-inquiry-week"] }); }}
        >
          Erneut laden
        </button>
      </div>
    );
  }

  return (
    <div className="ws-inbox">
      <div className="ws-filter" role="group" aria-label="Anfragen filtern">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="ws-filter-option"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
            <span className="ws-filter-count">{counts[option.value]}</span>
          </button>
        ))}
        <button
          type="button"
          className="ws-refresh"
          onClick={() => inbox.refetch()}
          disabled={inbox.isFetching}
        >
          {inbox.isFetching ? "Lädt …" : "Aktualisieren"}
        </button>
      </div>
      {setStatus.isError ? (
        <p className="ws-alert" role="alert">
          {setStatus.error.message}
        </p>
      ) : null}
      {visible.length === 0 ? (
        <p className="ws-empty">
          {filter === "offen"
            ? "Keine offenen Anfragen. Neue Anfragen erscheinen hier und werden in Slack gemeldet."
            : "In dieser Ansicht gibt es keine Anfragen."}
        </p>
      ) : (
        <ol className="ws-list" role="list">
          {visible.map((item) => (
            <li key={`${item.table}-${item.id}`}>
              <InboxCard
                item={item}
                busy={setStatus.isPending && setStatus.variables?.item.id === item.id}
                onStatus={(status) => setStatus.mutate({ item, status })}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function InboxCard({
  item,
  busy,
  onStatus,
}: {
  item: InboxItem;
  busy: boolean;
  onStatus: (status: InquiryStatus) => void;
}) {
  const titleId = `ws-${item.id}`;
  return (
    <article className="ws-card" data-status={item.status} aria-labelledby={titleId}>
      <header className="ws-card-head">
        <div>
          <span className="ws-kind">{KIND_LABELS[item.kind]}</span>
          <h2 id={titleId}>{item.name}</h2>
          <p className="ws-meta">
            Vorgang {item.reference} ·{" "}
            <time dateTime={item.createdAt}>{DATE_FORMAT.format(new Date(item.createdAt))}</time>
          </p>
        </div>
        <label className="ws-status">
          <span>Status</span>
          <select
            value={item.status}
            disabled={busy}
            onChange={(event) => onStatus(event.currentTarget.value as InquiryStatus)}
          >
            {INQUIRY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>
      </header>
      <dl className="ws-details">
        <div>
          <dt>E-Mail</dt>
          <dd>
            <a href={`mailto:${item.email}`}>{item.email}</a>
          </dd>
        </div>
        {item.details.map((detail) => (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
      {item.message ? (
        <p className="ws-message">{item.message}</p>
      ) : (
        <p className="ws-message is-empty">Keine weitere Nachricht.</p>
      )}
      <footer className="ws-card-foot">
        <a
          className="nexify-control primary-button hc-finish-primary"
          data-variant="primary"
          href={replyHref(item)}
        >
          Per E-Mail antworten
        </a>
        {item.attachment ? (
          <AttachmentLink
            path={item.attachment.path}
            label={`${item.attachment.name} (${formatFileSize(item.attachment.size)})`}
          />
        ) : null}
        <span className={`ws-slack is-${item.slack.state}`}>
          {item.slack.state === "gemeldet"
            ? "In Slack gemeldet"
            : item.slack.state === "fehler"
              ? `Slack-Meldung fehlgeschlagen: ${item.slack.error}`
              : "Slack-Meldung ausstehend"}
        </span>
      </footer>
    </article>
  );
}

function AttachmentLink({ path, label }: { path: string; label: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  async function open() {
    setPending(true);
    setError(null);
    // Kurzlebiger Link: der Anhang bleibt privat und wird erst beim Klick freigegeben.
    const { data, error: signError } = await supabase.storage
      .from("teileklar-attachments")
      .createSignedUrl(path, 120);
    setPending(false);
    if (signError || !data) {
      setError(`Anhang nicht verfügbar: ${signError?.message ?? "unbekannt"}`);
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  }
  return (
    <span className="ws-attachment">
      <button
        type="button"
        className="nexify-control secondary-button"
        data-variant="secondary"
        onClick={open}
        disabled={pending}
      >
        {pending ? "Öffnet …" : `Anhang öffnen: ${label}`}
      </button>
      {error ? (
        <span className="ws-alert-inline" role="alert">
          {error}
        </span>
      ) : null}
    </span>
  );
}
