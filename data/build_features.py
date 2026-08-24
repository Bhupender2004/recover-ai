import pandas as pd


PAYMENTS_PATH = "data/raw/payments.csv"
CUSTOMERS_PATH = "data/raw/customers.csv"
OUTPUT_PATH = "data/processed/recovery_training_data.csv"


def build_features():

    print("Loading data...")

    payments = pd.read_csv(PAYMENTS_PATH)
    customers = pd.read_csv(CUSTOMERS_PATH)

    payments["payment_date"] = pd.to_datetime(
        payments["payment_date"]
    )

    # Sort chronologically so customer history
    # only uses information available before
    # the current payment.
    payments = payments.sort_values(
        ["customer_id", "payment_date"]
    ).reset_index(drop=True)

    print("Creating customer history features...")

    # Previous number of payments
    payments["previous_payment_count"] = (
        payments.groupby("customer_id")
        .cumcount()
    )

    # Previous successful payments
    payments["previous_success_count"] = (
        payments.groupby("customer_id")["status"]
        .transform(
            lambda x:
            x.eq("success").shift(fill_value=False).cumsum()
        )
    )

    # Previous failed payments
    payments["previous_failure_count"] = (
        payments.groupby("customer_id")["status"]
        .transform(
            lambda x:
            x.eq("failed").shift(fill_value=False).cumsum()
        )
    )

    # Previous payment amount
    payments["previous_average_amount"] = (
        payments.groupby("customer_id")["amount"]
        .transform(
            lambda x:
            x.shift().expanding().mean()
        )
    )

    payments["previous_average_amount"] = (
        payments["previous_average_amount"]
        .fillna(payments["amount"])
    )

    # Customer historical success rate
    payments["customer_success_rate"] = (
        payments["previous_success_count"]
        /
        payments["previous_payment_count"].replace(
            0,
            1
        )
    )

    # How large is this payment compared with
    # the customer's previous average?
    payments["amount_vs_customer_average"] = (
        payments["amount"]
        /
        payments["previous_average_amount"]
    )

    # Recent failure count
    payments["recent_failure_count"] = 0

    for customer_id, group in payments.groupby(
        "customer_id"
    ):

        indices = group.index

        dates = group["payment_date"]

        failure_dates = dates.where(
            group["status"].eq("failed")
        )

        recent_counts = []

        for idx in indices:

            current_date = payments.loc[
                idx,
                "payment_date"
            ]

            count = (
                (failure_dates < current_date)
                &
                (
                    failure_dates
                    >= current_date - pd.Timedelta(days=30)
                )
            ).sum()

            recent_counts.append(count)

        payments.loc[
            indices,
            "recent_failure_count"
        ] = recent_counts

    # Merge customer-level information
    payments = payments.merge(
        customers[
            [
                "customer_id",
                "customer_lifetime_value"
            ]
        ],
        on="customer_id",
        how="left"
    )

    # Keep only failed payments for the
    # recovery prediction problem.
    failed = payments[
        payments["status"] == "failed"
    ].copy()

    # Features available before recovery action.
    feature_columns = [
        "payment_id",
        "customer_id",
        "payment_date",
        "amount",
        "payment_method",
        "failure_reason",
        "customer_lifetime_value",
        "previous_payment_count",
        "previous_success_count",
        "previous_failure_count",
        "previous_average_amount",
        "customer_success_rate",
        "amount_vs_customer_average",
        "recent_failure_count",
        "recovered",
    ]

    training_data = failed[
        feature_columns
    ].copy()

    training_data.to_csv(
        OUTPUT_PATH,
        index=False
    )

    print()
    print("Feature engineering complete!")
    print()
    print(
        f"Training records: {len(training_data)}"
    )
    print(
        f"Features: {len(feature_columns) - 1}"
    )
    print()
    print(f"Saved to: {OUTPUT_PATH}")


if __name__ == "__main__":
    build_features()