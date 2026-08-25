from app.services.recovery_simulator import (
    simulate_recovery,
)


def test_high_probability_payment():

    result = simulate_recovery(
        payment_id="PAY001",
        amount=10000,
        recovery_probability=0.95,
        failure_reason="timeout",
        seed=1,
    )

    assert result.final_status == "RECOVERED"

    assert result.total_recovered == 10000


def test_low_probability_payment():

    result = simulate_recovery(
        payment_id="PAY002",
        amount=10000,
        recovery_probability=0.20,
        failure_reason="insufficient_funds",
        seed=1,
    )

    assert result.final_status == "NOT_RECOVERED"

    assert result.total_recovered == 0


def test_simulation_contains_attempts():

    result = simulate_recovery(
        payment_id="PAY003",
        amount=5000,
        recovery_probability=0.60,
        failure_reason="timeout",
        seed=42,
    )

    assert len(result.attempts) >= 1


def test_attempt_limit():

    result = simulate_recovery(
        payment_id="PAY004",
        amount=5000,
        recovery_probability=0.01,
        failure_reason="timeout",
        seed=42,
    )

    assert len(result.attempts) <= 3