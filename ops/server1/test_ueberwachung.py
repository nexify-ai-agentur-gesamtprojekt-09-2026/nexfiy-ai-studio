"""Konkrete Betriebsregeln ohne Netzwerk oder Zugangsdaten prüfen."""
import unittest
from datetime import datetime, timezone
from ueberwachung import CHECKS, update_state, daily_report

class MonitoringRules(unittest.TestCase):
    def setUp(self):
        self.good = {p: (code, 0.2) for p, code in CHECKS}
        self.bad = {**self.good, "/": (503, 0.2)}

    def test_two_failures_before_alert(self):
        calls = []
        notify = lambda *args: calls.append(args) or True
        state = {}
        update_state(state, self.bad, notify)
        self.assertEqual(calls, [])
        update_state(state, self.bad, notify)
        self.assertEqual(len(calls), 1)
        update_state(state, self.bad, notify)
        self.assertEqual(len(calls), 1)

    def test_failed_recovery_is_not_acknowledged(self):
        state = {"gemeldet": True, "fehlfolge": 2}
        update_state(state, self.good, lambda *_: False)
        self.assertTrue(state["gemeldet"])
        update_state(state, self.good, lambda *_: True)
        self.assertFalse(state["gemeldet"])

    def test_daily_report_only_after_nine_and_once_per_day(self):
        calls = []
        notify = lambda *args: calls.append(args) or True
        state = {}
        daily_report(state, self.good, notify, datetime(2026, 11, 16, 8, 55, tzinfo=timezone.utc))
        self.assertEqual(calls, [])
        daily_report(state, self.good, notify, datetime(2026, 11, 16, 9, 0, tzinfo=timezone.utc))
        daily_report(state, self.good, notify, datetime(2026, 11, 16, 9, 5, tzinfo=timezone.utc))
        self.assertEqual(len(calls), 1)
        self.assertEqual(state["bericht_tag"], "2026-11-16")

    def test_failed_daily_delivery_is_bounded_and_never_claimed(self):
        state = {}
        calls = []
        notify = lambda *args: calls.append(args) and False
        for _ in range(10):
            daily_report(state, self.good, notify, datetime(2026, 11, 16, 9, 0, tzinfo=timezone.utc))
        self.assertEqual(len(calls), 7)
        self.assertNotIn("bericht_tag", state)

if __name__ == "__main__":
    unittest.main()