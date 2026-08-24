import random
from datetime import datetime, timedelta
from pathlib import Path

import pandas as pd
from faker import Faker


fake = Faker("en_IN")

random.seed(42)
Faker.seed(42)

NUM_CUSTOMERS = 1000
NUM_PAYMENTS = 10000

PAYMENT_METHODS = [
    "card",
    "upi",
    "netbanking",
    "wallet",
]

FAILURE_REASONS = [
    "insufficient_funds",
    "card_declined",
    "expired_card",
    "network_error",
    "authentication_failed",
    "timeout",
]


def create_customers():
    customers = []

    for i in range(NUM_CUSTOMERS):

        customer_id = f"CUST{i + 1:05d}"

        # Each customer has a different natural
        # payment reliability.
        customer_reliability = random.uniform(
            0.55,
            0.98
        )

        customers.append({
            "customer_id": customer_id,
            "customer_name": fake.name(),
            "customer_email": fake.email(),
            "customer_lifetime_value": round(
                random.uniform(5000, 500000),
                2
            ),
            "customer_reliability": customer_reliability,
        })

    return customers


def calculate_recovery_probability(
    customer_reliability,
    amount,
    average_amount,
    recent_failures,
    failure_reason,
):
    """
    Estimate the natural probability that a failed
    payment can eventually be recovered.

    IMPORTANT:
    This does NOT depend on recovery_action.

    That allows our ML model to learn meaningful
    relationships between customer/payment behavior
    and recovery outcome.
    """

    probability = customer_reliability

    # Payment size relative to customer's normal
    # payment size.
    amount_ratio = amount / max(
        average_amount,
        1
    )

    if amount_ratio <= 1.2:
        probability += 0.05

    elif amount_ratio >= 2.0:
        probability -= 0.12

    # Recent failures indicate increasing payment
    # difficulty.
    probability -= (
        recent_failures * 0.035
    )

    # Failure reason influences recoverability.
    failure_adjustments = {
        "timeout": 0.08,
        "network_error": 0.07,
        "authentication_failed": 0.01,
        "expired_card": -0.05,
        "card_declined": -0.07,
        "insufficient_funds": -0.10,
    }

    probability += failure_adjustments[
        failure_reason
    ]

    return max(
        0.05,
        min(probability, 0.95)
    )


def choose_recovery_action(
    recovery_probability,
    failure_reason
):
    """
    Recovery policy used by the application.

    This is separate from the recovery outcome.
    """

    if recovery_probability >= 0.80:

        if failure_reason in [
            "timeout",
            "network_error"
        ]:
            return "retry"

        return "payment_link"

    elif recovery_probability >= 0.60:

        return "reminder"

    elif recovery_probability >= 0.40:

        return "payment_link"

    else:

        return "escalate"


def create_payments(customers):

    payments = []

    start_date = (
        datetime.now()
        - timedelta(days=180)
    )

    # Maintain a small amount of historical
    # information for each customer.
    customer_history = {}

    for customer in customers:

        customer_history[
            customer["customer_id"]
        ] = {
            "payments": [],
            "successful_payments": [],
            "failed_payments": [],
        }

    for i in range(NUM_PAYMENTS):

        customer = random.choice(customers)

        customer_id = customer["customer_id"]

        history = customer_history[
            customer_id
        ]

        # Generate amount around the customer's
        # historical average when possible.
        if history["payments"]:

            average_amount = sum(
                history["payments"]
            ) / len(
                history["payments"]
            )

            amount = random.gauss(
                average_amount,
                max(
                    average_amount * 0.30,
                    200
                )
            )

            amount = max(
                200,
                min(amount, 50000)
            )

        else:

            amount = random.uniform(
                200,
                25000
            )

            average_amount = amount

        amount = round(
            amount,
            2
        )

        payment_method = random.choice(
            PAYMENT_METHODS
        )

        # Customer reliability influences the
        # probability of a successful payment.
        success_probability = (
            customer["customer_reliability"]
        )

        # Small randomness based on payment method.
        if payment_method == "upi":
            success_probability += 0.02

        elif payment_method == "card":
            success_probability -= 0.01

        success_probability = max(
            0.40,
            min(
                success_probability,
                0.99
            )
        )

        status = (
            "success"
            if random.random() < success_probability
            else "failed"
        )

        failure_reason = None
        recovery_action = "no_action"
        recovered = False
        recovered_amount = 0.0

        if status == "failed":

            failure_reason = random.choice(
                FAILURE_REASONS
            )

            recent_failures = len(
                history["failed_payments"][-3:]
            )

            recovery_probability = (
                calculate_recovery_probability(
                    customer_reliability=(
                        customer[
                            "customer_reliability"
                        ]
                    ),
                    amount=amount,
                    average_amount=(
                        average_amount
                    ),
                    recent_failures=(
                        recent_failures
                    ),
                    failure_reason=(
                        failure_reason
                    ),
                )
            )

            # Choose action based on information
            # available at the time of failure.
            recovery_action = (
                choose_recovery_action(
                    recovery_probability,
                    failure_reason
                )
            )

            # Recovery outcome is based on the
            # underlying recovery probability,
            # NOT directly on the action.
            recovered = (
                random.random()
                < recovery_probability
            )

            if recovered:
                recovered_amount = amount

            history[
                "failed_payments"
            ].append(amount)

        else:

            history[
                "successful_payments"
            ].append(amount)

        history[
            "payments"
        ].append(amount)

        payment_date = (
            start_date
            + timedelta(
                days=random.randint(
                    0,
                    180
                )
            )
        )

        payments.append({

            "payment_id":
                f"PAY{i + 1:06d}",

            "customer_id":
                customer_id,

            "payment_date":
                payment_date.date(),

            "amount":
                amount,

            "payment_method":
                payment_method,

            "status":
                status,

            "failure_reason":
                failure_reason,

            "recovery_action":
                recovery_action,

            "recovered":
                recovered,

            "recovered_amount":
                recovered_amount,
        })

    return payments


def main():

    print("Generating customers...")

    customers = create_customers()

    print("Generating payments...")

    payments = create_payments(
        customers
    )

    customers_df = pd.DataFrame(
        customers
    )

    payments_df = pd.DataFrame(
        payments
    )

    output_dir = Path(
        "data/raw"
    )

    output_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    customers_df.to_csv(
        output_dir / "customers.csv",
        index=False
    )

    payments_df.to_csv(
        output_dir / "payments.csv",
        index=False
    )

    print()
    print(
        "Dataset generation complete!"
    )

    print(
        f"Customers: "
        f"{len(customers_df)}"
    )

    print(
        f"Payments: "
        f"{len(payments_df)}"
    )

    print(
        f"Failed payments: "
        f"{(payments_df['status'] == 'failed').sum()}"
    )

    print(
        f"Recovery rate: "
        f"{payments_df.loc[payments_df['status'] == 'failed', 'recovered'].mean() * 100:.2f}%"
    )

    print()
    print(
        "Saved:"
    )

    print(
        "data/raw/customers.csv"
    )

    print(
        "data/raw/payments.csv"
    )


if __name__ == "__main__":
    main()