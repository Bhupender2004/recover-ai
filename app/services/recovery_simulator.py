from dataclasses import dataclass
from typing import List


@dataclass
class RecoveryAttempt:

    attempt_number: int
    action: str
    probability: float
    expected_value: float
    successful: bool


@dataclass
class RecoverySimulation:

    payment_id: str
    amount: float
    final_status: str
    total_recovered: float
    attempts: List[RecoveryAttempt]


def simulate_recovery(
    payment_id: str,
    amount: float,
    recovery_probability: float,
    failure_reason: str,
    seed: int = 42,
):
    """
    Simulates the recovery lifecycle for one payment.

    This is a development/demo simulator.
    It does NOT make real payment attempts.
    """

    import random

    rng = random.Random(seed)

    attempts = []

    current_probability = recovery_probability

    max_attempts = 3

    for attempt_number in range(
        1,
        max_attempts + 1,
    ):

        expected_value = round(
            amount * current_probability,
            2,
        )

        # Determine action using simple rules.
        if (
            current_probability >= 0.80
            and failure_reason
            in [
                "timeout",
                "network_error",
            ]
            and attempt_number <= 2
        ):

            action = "RETRY"

        elif (
            current_probability >= 0.70
            and failure_reason
            == "authentication_failed"
        ):

            action = "PAYMENT_LINK"

        elif current_probability >= 0.55:

            action = "REMINDER"

        elif current_probability < 0.40:

            action = "NO_ACTION"

        else:

            action = "ESCALATE"

        # No action means simulation stops.
        if action == "NO_ACTION":

            attempts.append(
                RecoveryAttempt(
                    attempt_number=attempt_number,
                    action=action,
                    probability=current_probability,
                    expected_value=expected_value,
                    successful=False,
                )
            )

            break

        # Simulate whether recovery succeeds.
        successful = (
            rng.random()
            < current_probability
        )

        attempts.append(
            RecoveryAttempt(
                attempt_number=attempt_number,
                action=action,
                probability=current_probability,
                expected_value=expected_value,
                successful=successful,
            )
        )

        if successful:

            return RecoverySimulation(
                payment_id=payment_id,
                amount=amount,
                final_status="RECOVERED",
                total_recovered=amount,
                attempts=attempts,
            )

        # Failed attempt:
        #
        # Reduce probability for subsequent
        # attempts so the system doesn't keep
        # hammering the customer.
        current_probability *= 0.70

    return RecoverySimulation(
        payment_id=payment_id,
        amount=amount,
        final_status="NOT_RECOVERED",
        total_recovered=0.0,
        attempts=attempts,
    )