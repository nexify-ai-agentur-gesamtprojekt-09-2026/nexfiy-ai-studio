"""Echter Vorschau-Browser, Test-Aufrufgrenze zum echten Handler; Slack ausschließlich im Test gemockt."""
import asyncio
import contextlib
import json
import os
import re
from pathlib import Path

import requests
from playwright.async_api import async_playwright


async def main():
    out = Path("/tmp/browser/nx-lead-final")
    out.mkdir(parents=True, exist_ok=True)
    endpoint = os.environ["NX_LEAD_TEST_ENDPOINT"]
    current_ip = None
    run_id = os.environ["NX_LEAD_TEST_RUN_ID"]
    errors = []
    replaced = []
    blocked = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})

        async def to_draft_db(route):
            try:
                if not route.request.frame.url.startswith("http://localhost:8080/"):
                    return await route.abort()
                url = "http://127.0.0.1:8001" + route.request.url.split("/_port_8001", 1)[1]
                await route.fulfill(response=await route.fetch(url=url, max_redirects=0, timeout=0))
            except Exception:
                with contextlib.suppress(Exception):
                    await route.abort()

        await context.route(re.compile(r"^https?://[^/]+/_port_8001/"), to_draft_db)
        await context.add_init_script(r"""(() => { if (location.origin !== "http://localhost:8080") return;
          const W = WebSocket;
          WebSocket = new Proxy(W, { construct(t, a) {
            a[0] = String(a[0]).replace(/^wss?:[/][/][^/]+[/]_port_8001(?=[/])/, "ws://127.0.0.1:8001");
            return Reflect.construct(t, a); } }); })()""")

        # Nur im Browser-Test ersetzen; kein Testflag oder Versandbypass in der Anwendung.
        async def replace_intake(route):
            replaced.append(True)
            await route.fulfill(status=200, content_type="application/javascript", body="export const submitInquiry = (args) => window.__nxLeadSubmit(args);")

        await context.route(re.compile(r"^http://localhost:8080/src/lib/inquiry\.functions\.ts(?:\?.*)?$"), replace_intake)

        async def no_real_submit(route):
            if route.request.method == "POST" and "/kontakt" in route.request.frame.url:
                blocked.append(True)
                return await route.abort()
            await route.fallback()

        await context.route(re.compile(r"^http://localhost:8080/"), no_real_submit)

        async def submit_binding(source, args):
            assert source["frame"].url.startswith("http://localhost:8080/kontakt")
            def send():
                response = requests.post(endpoint, json={"data": args["data"], "ip": current_ip}, timeout=15)
                response.raise_for_status()
                return response.json()
            return await asyncio.to_thread(send)

        await context.expose_binding("__nxLeadSubmit", submit_binding)
        page = await context.new_page()
        page.on("pageerror", lambda _: errors.append(True))
        if os.environ.get("LOVABLE_BROWSER_AUTH_STATUS") == "injected":
            storage_key = os.environ.get("LOVABLE_BROWSER_SUPABASE_STORAGE_KEY")
            session_json = os.environ.get("LOVABLE_BROWSER_SUPABASE_SESSION_JSON")
            cookies = json.loads(os.environ.get("LOVABLE_BROWSER_SUPABASE_COOKIES_JSON") or "[]")
        else:
            with open(os.path.expanduser("~/.cache/lovable-auth/session.json")) as f:
                minted = json.load(f)
            storage_key = minted["storage_key"]
            session_json = json.dumps(minted["session"])
            cookies = minted.get("cookies") or []
        if cookies:
            await context.add_cookies([{**c, "url": "http://localhost:8080"} for c in cookies])
        await page.goto("http://localhost:8080")
        await page.evaluate("([k, v]) => window.localStorage.setItem(k, v)", [storage_key, session_json])

        async def week():
            await page.goto("http://localhost:8080/arbeitsplatz", wait_until="networkidle")
            region = page.get_by_role("region", name="Anfragen · letzte 7 Tage")
            await region.locator("dd").first.wait_for()
            return int(await region.locator("dd").first.inner_text())

        async def fill(message):
            await page.goto("http://localhost:8080/kontakt", wait_until="networkidle")
            assert replaced, "Test-Aufrufgrenze nicht aktiv; keine echte Anfrage absenden."
            form = page.locator("form").filter(has=page.get_by_role("button", name="Anfrage senden", exact=True))
            await form.get_by_role("textbox", name="Name", exact=False).fill("NX LEAD Browserprüfung")
            await form.get_by_role("textbox", name="E-Mail", exact=False).fill(f"nx-lead-browser-{run_id}@example.test")
            await form.get_by_role("textbox", name="Unternehmen", exact=True).fill("Erfundenes Testunternehmen")
            await form.get_by_role("textbox", name="Ihr Anliegen", exact=False).fill(message)
            await form.get_by_role("checkbox").check()
            await form.get_by_role("button", name="Anfrage senden", exact=True).click()
            return form

        before = await week()
        message = f"NX-LEAD-01 Browser {run_id}: fehlende IP darf dieses Vorhaben nicht blockieren."
        await fill(message)
        await page.get_by_role("heading", name="Ihre Anfrage ist eingegangen.").wait_for()
        await page.locator("section.tk-success").screenshot(path=str(out / "1-success.png"))
        assert await week() == before + 1
        await page.get_by_role("region", name="Anfragen · letzte 7 Tage").screenshot(path=str(out / "2-week-plus-one.png"))
        form = await fill(message)
        await form.get_by_role("alert").wait_for()
        assert await form.get_by_role("textbox", name="Ihr Anliegen", exact=False).input_value() == message
        await form.get_by_role("alert").screenshot(path=str(out / "3-duplicate.png"))
        assert await week() == before + 1

        current_ip = os.environ["NX_LEAD_TEST_IP"]
        for i in range(1, 6):
            await fill(f"NX-LEAD-01 Browser {run_id} IP-Limit Anfrage {i}: Ein geprüftes Vorhaben.")
            await page.get_by_role("heading", name="Ihre Anfrage ist eingegangen.").wait_for()
        message = f"NX-LEAD-01 Browser {run_id} IP-Limit Anfrage 6: Ein geprüftes Vorhaben."
        form = await fill(message)
        await form.get_by_role("alert").wait_for()
        assert await form.get_by_role("textbox", name="Name", exact=False).input_value() == "NX LEAD Browserprüfung"
        assert await form.get_by_role("textbox", name="E-Mail", exact=False).input_value() == f"nx-lead-browser-{run_id}@example.test"
        assert await form.get_by_role("textbox", name="Unternehmen", exact=True).input_value() == "Erfundenes Testunternehmen"
        assert await form.get_by_role("textbox", name="Ihr Anliegen", exact=False).input_value() == message
        assert await form.get_by_role("checkbox").is_checked()
        await form.screenshot(path=str(out / "4-sixth-retained-desktop.png"))
        await page.set_viewport_size({"width": 390, "height": 844})
        await form.get_by_role("alert").screenshot(path=str(out / "5-sixth-retained-mobile.png"))
        assert not await page.evaluate("document.documentElement.scrollWidth > innerWidth")
        assert await week() == before + 6
        await page.get_by_role("region", name="Anfragen · letzte 7 Tage").screenshot(path=str(out / "6-week-mobile.png"))
        card = page.get_by_role("article").filter(has=page.get_by_role("heading", name="NX LEAD Browserprüfung", exact=True)).first
        await card.get_by_role("combobox").select_option("in_bearbeitung")
        await page.wait_for_function("document.querySelector('.ws-card select')?.value === 'in_bearbeitung' && !document.querySelector('.ws-card select')?.disabled")
        await page.reload(wait_until="networkidle")
        card = page.get_by_role("article").filter(has=page.get_by_role("heading", name="NX LEAD Browserprüfung", exact=True)).first
        assert await card.get_by_role("combobox").input_value() == "in_bearbeitung"
        await card.screenshot(path=str(out / "7-status-readback.png"))
        assert not blocked, "Unerwarteter direkter Formularaufruf statt sicherer Testgrenze."
        assert not errors, "Browser-Laufzeitfehler."
        print(json.dumps({"form_flow": "passed", "missing_ip_saved": True, "duplicate_no_extra_row": True, "sixth_rejected_inputs_retained": True, "weekly_delta": 6, "admin_status_readback": True, "mobile_overflow": False, "page_errors": len(errors), "real_submission_block_attempts": len(blocked)}))
        await browser.close()


asyncio.run(main())