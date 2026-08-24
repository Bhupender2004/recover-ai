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


FAILURE_REASONS = [
    "insufficient_funds",
    "card_declined",
    "expired_card",
    "network_error",
    "authentication_failed",
    "timeout",
]


PAYMENT_METHODS = [
    "card",
    "upi",
    "netbanking",
    "wallet",
]


RECOVERY_ACTIONS = [
    "retry",
    "payment_link",
    "reminder",
    "escalate",
    "no_action",
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
                random.uniform(1000, 500000), 2
            ),
        })

    return customers


def create_payments(customers):
    payments = []

    start_date = datetime.now() - timedelta(days=180)

    for i in range(NUM_PAYMENTS):

        customer = random.choice(customers)

        payment_id = f"PAY{i + 1:06d}"

        amount = round(
            random.uniform(200, 25000),
            2
        )

        payment_method = random.choice(PAYMENT_METHODS)

        # Most payments succeed.
        status = random.choices(
            ["success", "failed"],
            weights=[0.78, 0.22],
            k=1
        )[0]

        failure_reason = None

        if status == "failed":
            failure_reason = random.choice(
                FAILURE_REASONS
            )

        recovery_action = "no_action"
        recovered = False
        recovered_amount = 0.0

        if status == "failed":

            recovery_action = random.choices(
                RECOVERY_ACTIONS,
                weights=[35, 25, 25, 10, 5],
                k=1
            )[0]

            # Simulate whether recovery succeeds.
            recovery_probability = {
                "retry": 0.65,
                "payment_link": 0.55,
                "reminder": 0.45,
                "escalate": 0.35,
                "no_action": 0.0,
            }

            probability = recovery_probability[
                recovery_action
            ]

            recovered = random.random() < probability

            if recovered:
                recovered_amount = amount

        payment_date = start_date + timedelta(
            days=random.randint(0, 180)
        )

        payments.append({
            "payment_id": payment_id,
            "customer_id": customer["customer_id"],
            "payment_date": payment_date.date(),
            "amount": amount,
            "payment_method": payment_method,
            "status": status,
            "failure_reason": failure_reason,
            "recovery_action": recovery_action,
            "recovered": recovered,
            "recovered_amount": recovered_amount,
        })

    return payments


def main():

    print("Generating customers...")

    customers = create_customers()

    print("Generating payments...")

    payments = create_payments(customers)

    customers_df = pd.DataFrame(customers)
    payments_df = pd.DataFrame(payments)

    output_dir = Path("data/raw")
    output_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    customers_path = (
        output_dir / "customers.csv"
    )

    payments_path = (
        output_dir / "payments.csv"
    )

    customers_df.to_csv(
        customers_path,
        index=False
    )

    payments_df.to_csv(
        payments_path,
        index=False
    )

    print()
    print("Dataset generation complete!")
    print()
    print(f"Customers: {len(customers_df)}")
    print(f"Payments: {len(payments_df)}")
    print()
    print(f"Saved: {customers_path}")
    print(f"Saved: {payments_path}")


if __name__ == "__main__":
    main()