"""Konkrete Betriebsregeln ohne Netzwerk oder Zugangsdaten prüfen."""
import unittest
from ueberwachung import CHECKS, update_state

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

    def test_failed_alert_is_retried(self):
        state = {"fehlfolge": 1}
        update_state(state, self.bad, lambda *_: False)
        self.assertFalse(state["gemeldet"])
        update_state(state, self.bad, lambda *_: True)
        self.assertTrue(state["gemeldet"])

if __name__ == "__main__":
    unittest.main()