"""Aktualität und erwartete Website-Zustände im Tagesbericht prüfen."""
import unittest
from datetime import datetime, timezone
from status_report import CHECKS, website_status

class ReportRules(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 11, 16, 9, 40, tzinfo=timezone.utc)
        self.state = {"letzte_pruefung_utc": "2026-11-16T09:35:00+00:00", "ergebnis": {p: [code, 0.2] for p, code in CHECKS}}

    def test_expected_public_pages_and_protected_mcp(self):
        self.assertIn("IST Website OK", website_status(self.state, self.now))
        self.state["ergebnis"]["/mcp"] = [200, 0.2]
        self.assertIn("FEHLER/OFFEN", website_status(self.state, self.now))

    def test_stale_measurement_is_not_healthy(self):
        self.state["letzte_pruefung_utc"] = "2026-11-16T09:24:00+00:00"
        self.assertTrue(website_status(self.state, self.now).startswith("OFFEN"))

    def test_missing_result_is_not_healthy(self):
        self.state["ergebnis"].pop("/kontakt")
        self.assertIn("FEHLER/OFFEN", website_status(self.state, self.now))

if __name__ == "__main__":
    unittest.main()