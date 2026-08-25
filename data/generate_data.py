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

        customers.append({
            "customer_id": customer_id,
            "customer_name": fake.name(),
            "customer_email": fake.email(),
            "customer_lifetime_value": round(
                random.uniform(5000, 500000),
                2
            ),

            # Hidden variable used only to create
            # realistic synthetic behavior.
            "customer_reliability": random.uniform(
                0.55,
                0.98
            ),
        })

    return customers


def calculate_recovery_probability(
    reliability,
    customer_success_rate,
    previous_failures,
    recent_failures,
    amount_ratio,
    failure_reason,
):

    probability = (
        0.25
        + 0.35 * customer_success_rate
        + 0.20 * reliability
    )

    # Repeated failures reduce recovery likelihood.
    probability -= (
        previous_failures * 0.025
    )

    probability -= (
        recent_failures * 0.04
    )

    # Payments significantly above normal amount
    # are harder to recover.
    if amount_ratio > 2.0:
        probability -= 0.12

    elif amount_ratio > 1.5:
        probability -= 0.06

    elif amount_ratio <= 1.2:
        probability += 0.04

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
    failure_reason,
):

    if recovery_probability >= 0.80:

        if failure_reason in [
            "timeout",
            "network_error",
        ]:
            return "retry"

        return "payment_link"

    if recovery_probability >= 0.60:
        return "reminder"

    if recovery_probability >= 0.40:
        return "payment_link"

    return "escalate"


def create_payments(customers):

    payments = []

    # Create a chronological event queue.
    #
    # Each customer gets a number of payments,
    # and each customer's dates are generated in
    # chronological order.

    customer_events = []

    for customer in customers:

        num_customer_payments = random.randint(
            5,
            15
        )

        current_date = (
            datetime.now()
            - timedelta(days=180)
        )

        for _ in range(
            num_customer_payments
        ):

            current_date += timedelta(
                days=random.randint(
                    2,
                    12
                )
            )

            customer_events.append({
                "customer": customer,
                "payment_date": current_date,
            })

    # Sort ALL events chronologically.
    customer_events.sort(
        key=lambda x: x["payment_date"]
    )

    # Keep historical state for each customer.
    history = {}

    for customer in customers:

        history[
            customer["customer_id"]
        ] = {
            "amounts": [],
            "successes": 0,
            "failures": 0,
            "failure_dates": [],
            "last_success_date": None,
        }

    payment_counter = 1

    for event in customer_events:

        customer = event["customer"]
        payment_date = event["payment_date"]

        customer_id = customer["customer_id"]

        customer_history = history[
            customer_id
        ]

        previous_amounts = (
            customer_history["amounts"]
        )

        # ------------------------------------------
        # Amount generation
        # ------------------------------------------

        if previous_amounts:

            average_amount = sum(
                previous_amounts
            ) / len(previous_amounts)

            amount = random.gauss(
                average_amount,
                max(
                    average_amount * 0.25,
                    200
                )
            )

            amount = max(
                200,
                min(
                    amount,
                    50000
                )
            )

        else:

            amount = random.uniform(
                500,
                20000
            )

            average_amount = amount

        amount = round(
            amount,
            2
        )

        # ------------------------------------------
        # Payment method
        # ------------------------------------------

        payment_method = random.choice(
            PAYMENT_METHODS
        )

        # ------------------------------------------
        # Historical features BEFORE payment
        # ------------------------------------------

        previous_payment_count = len(
            previous_amounts
        )

        previous_success_count = (
            customer_history["successes"]
        )

        previous_failure_count = (
            customer_history["failures"]
        )

        if previous_payment_count > 0:

            customer_success_rate = (
                previous_success_count
                / previous_payment_count
            )

        else:

            # Cold-start assumption.
            customer_success_rate = (
                customer["customer_reliability"]
            )

        amount_ratio = (
            amount
            / max(
                average_amount,
                1
            )
        )

        recent_failure_count = sum(
            1
            for date in
            customer_history["failure_dates"]
            if (
                payment_date - date
            ).days <= 30
        )

        # ------------------------------------------
        # Determine payment status
        # ------------------------------------------

        success_probability = (
            customer["customer_reliability"]
        )

        if payment_method == "upi":
            success_probability += 0.02

        if payment_method == "card":
            success_probability -= 0.01

        # Large unusual payments are slightly
        # more likely to fail.
        if amount_ratio > 2:
            success_probability -= 0.05

        success_probability = max(
            0.40,
            min(
                success_probability,
                0.99
            )
        )

        status = (
            "success"
            if random.random()
            < success_probability
            else "failed"
        )

        failure_reason = None
        recovery_action = "no_action"
        recovered = False
        recovered_amount = 0.0

        # ------------------------------------------
        # Recovery logic
        # ------------------------------------------

        if status == "failed":

            failure_reason = random.choice(
                FAILURE_REASONS
            )

            recovery_probability = (
                calculate_recovery_probability(
                    reliability=(
                        customer[
                            "customer_reliability"
                        ]
                    ),
                    customer_success_rate=(
                        customer_success_rate
                    ),
                    previous_failures=(
                        previous_failure_count
                    ),
                    recent_failures=(
                        recent_failure_count
                    ),
                    amount_ratio=(
                        amount_ratio
                    ),
                    failure_reason=(
                        failure_reason
                    ),
                )
            )

            recovery_action = (
                choose_recovery_action(
                    recovery_probability,
                    failure_reason,
                )
            )

            recovered = (
                random.random()
                < recovery_probability
            )

            if recovered:
                recovered_amount = amount

            customer_history[
                "failures"
            ] += 1

            customer_history[
                "failure_dates"
            ].append(
                payment_date
            )

        else:

            customer_history[
                "successes"
            ] += 1

            customer_history[
                "last_success_date"
            ] = payment_date

        customer_history[
            "amounts"
        ].append(amount)

        payments.append({

            "payment_id":
                f"PAY{payment_counter:06d}",

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

        payment_counter += 1

        if payment_counter > NUM_PAYMENTS:
            break

    return payments


def main():

    print("Generating customers...")

    customers = create_customers()

    print("Generating chronological payments...")

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

    failed = payments_df[
        payments_df["status"] == "failed"
    ]

    print()
    print(
        "Dataset generation complete!"
    )

    print(
        f"Customers: {len(customers_df)}"
    )

    print(
        f"Payments: {len(payments_df)}"
    )

    print(
        f"Failed payments: {len(failed)}"
    )

    if len(failed) > 0:

        print(
            f"Recovery rate: "
            f"{failed['recovered'].mean() * 100:.2f}%"
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