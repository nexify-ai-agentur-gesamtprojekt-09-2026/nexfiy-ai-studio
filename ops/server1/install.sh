#!/bin/bash
# Installiert beide Aufträge als systemd-Timer (Dienstbenutzer nexifyworker, ohne Root-Rechte).
set -e
install -o nexifyworker -g nexifyworker -d /opt/nexify-worker/state
install -m 644 ../../scripts/teileklar_cutout.py freistellung.py ueberwachung.py status_report.py /opt/nexify-worker/
for unit in nexify-freistellung nexify-ueberwachung; do install -m 644 "$unit.service" "$unit.timer" /etc/systemd/system/; done
systemctl daemon-reload
systemctl enable --now nexify-freistellung.timer nexify-ueberwachung.timer
