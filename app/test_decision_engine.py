from app.services.decision_engine import (
    decide_recovery_action,
)


def test_high_probability_timeout():

    decision = decide_recovery_action(
        amount=10000,
        recovery_probability=0.85,
        failure_reason="timeout",
        previous_attempts=0,
    )

    assert decision.action == "RETRY"


def test_authentication_failure():

    decision = decide_recovery_action(
        amount=10000,
        recovery_probability=0.75,
        failure_reason="authentication_failed",
        previous_attempts=0,
    )

    assert decision.action == "PAYMENT_LINK"


def test_low_probability():

    decision = decide_recovery_action(
        amount=10000,
        recovery_probability=0.25,
        failure_reason="insufficient_funds",
        previous_attempts=0,
    )

    assert decision.action == "NO_ACTION"


def test_max_attempts():

    decision = decide_recovery_action(
        amount=10000,
        recovery_probability=0.90,
        failure_reason="timeout",
        previous_attempts=3,
    )

    assert decision.action == "NO_ACTION"


def test_expected_value():

    decision = decide_recovery_action(
        amount=20000,
        recovery_probability=0.80,
        failure_reason="timeout",
        previous_attempts=0,
    )

    assert (
        decision.expected_recovery_value
        == 16000
    )