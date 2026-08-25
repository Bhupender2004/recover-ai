from dataclasses import dataclass


MAX_RETRY_ATTEMPTS = 2
MAX_TOTAL_ATTEMPTS = 3


@dataclass
class RecoveryDecision:

    action: str
    recovery_probability: float
    expected_recovery_value: float
    reason: str
    confidence: str


def calculate_expected_value(
    amount: float,
    recovery_probability: float,
) -> float:

    return round(
        amount * recovery_probability,
        2,
    )


def decide_recovery_action(
    amount: float,
    recovery_probability: float,
    failure_reason: str,
    previous_attempts: int = 0,
    customer_lifetime_value: float = 0.0,
) -> RecoveryDecision:

    expected_value = calculate_expected_value(
        amount,
        recovery_probability,
    )

    # ------------------------------------------------
    # SAFETY / STOP CONDITIONS
    # ------------------------------------------------

    if previous_attempts >= MAX_TOTAL_ATTEMPTS:

        return RecoveryDecision(
            action="NO_ACTION",
            recovery_probability=recovery_probability,
            expected_recovery_value=expected_value,
            reason=(
                "Maximum recovery attempts reached."
            ),
            confidence="high",
        )

    # ------------------------------------------------
    # HIGH-CONFIDENCE TEMPORARY FAILURES
    # ------------------------------------------------

    if (
        recovery_probability >= 0.80
        and failure_reason
        in [
            "timeout",
            "network_error",
        ]
        and previous_attempts < MAX_RETRY_ATTEMPTS
    ):

        return RecoveryDecision(
            action="RETRY",
            recovery_probability=recovery_probability,
            expected_recovery_value=expected_value,
            reason=(
                "High recovery probability and "
                "failure appears temporary."
            ),
            confidence="high",
        )

    # ------------------------------------------------
    # AUTHENTICATION / CUSTOMER ACTION
    # ------------------------------------------------

    if (
        recovery_probability >= 0.70
        and failure_reason
        == "authentication_failed"
    ):

        return RecoveryDecision(
            action="PAYMENT_LINK",
            recovery_probability=recovery_probability,
            expected_recovery_value=expected_value,
            reason=(
                "Customer authentication failed; "
                "a fresh payment flow is preferred."
            ),
            confidence="high",
        )

    # ------------------------------------------------
    # MODERATE PROBABILITY
    # ------------------------------------------------

    if recovery_probability >= 0.55:

        return RecoveryDecision(
            action="REMINDER",
            recovery_probability=recovery_probability,
            expected_recovery_value=expected_value,
            reason=(
                "Moderate recovery probability; "
                "use a low-friction reminder."
            ),
            confidence="medium",
        )

    # ------------------------------------------------
    # LOW PROBABILITY
    # ------------------------------------------------

    if recovery_probability < 0.40:

        return RecoveryDecision(
            action="NO_ACTION",
            recovery_probability=recovery_probability,
            expected_recovery_value=expected_value,
            reason=(
                "Low recovery probability does not "
                "justify automatic intervention."
            ),
            confidence="high",
        )

    # ------------------------------------------------
    # FALLBACK
    # ------------------------------------------------

    return RecoveryDecision(
        action="ESCALATE",
        recovery_probability=recovery_probability,
        expected_recovery_value=expected_value,
        reason=(
            "Recovery probability is uncertain; "
            "route for controlled intervention."
        ),
        confidence="low",
    )