import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


DATA_PATH = "data/processed/recovery_training_data.csv"


FEATURES = [
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
]


def create_model():

    categorical_features = [
        "payment_method",
        "failure_reason",
    ]

    numerical_features = [
        "amount",
        "customer_lifetime_value",
        "previous_payment_count",
        "previous_success_count",
        "previous_failure_count",
        "previous_average_amount",
        "customer_success_rate",
        "amount_vs_customer_average",
        "recent_failure_count",
    ]

    categorical_pipeline = Pipeline([
        (
            "imputer",
            SimpleImputer(
                strategy="most_frequent"
            ),
        ),
        (
            "encoder",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
        ),
    ])

    numerical_pipeline = Pipeline([
        (
            "imputer",
            SimpleImputer(
                strategy="median"
            ),
        ),
    ])

    preprocessor = ColumnTransformer([
        (
            "categorical",
            categorical_pipeline,
            categorical_features,
        ),
        (
            "numerical",
            numerical_pipeline,
            numerical_features,
        ),
    ])

    return Pipeline([
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "classifier",
            LogisticRegression(
                max_iter=1000,
                class_weight="balanced",
            ),
        ),
    ])


def evaluate_selection(
    results,
    percentage,
    selection_name,
    random_state=42,
):

    count = max(
        1,
        int(len(results) * percentage / 100)
    )

    if selection_name == "AI":

        selected = (
            results
            .sort_values(
                "recovery_probability",
                ascending=False,
            )
            .head(count)
        )

    else:

        selected = (
            results
            .sample(
                n=count,
                random_state=random_state,
            )
        )

    recovery_rate = (
        selected["recovered"].mean()
        * 100
    )

    recovered_revenue = (
        selected["amount"]
        .where(selected["recovered"])
        .sum()
    )

    selected_revenue = (
        selected["amount"].sum()
    )

    return {
        "count": count,
        "selected_revenue": selected_revenue,
        "recovered_revenue": recovered_revenue,
        "recovery_rate": recovery_rate,
    }


def main():

    print("Loading data...")

    df = pd.read_csv(DATA_PATH)

    df["payment_date"] = pd.to_datetime(
        df["payment_date"]
    )

    df = df.sort_values(
        "payment_date"
    ).reset_index(drop=True)

    split_index = int(
        len(df) * 0.80
    )

    train = df.iloc[:split_index]
    test = df.iloc[split_index:].copy()

    X_train = train[FEATURES]
    y_train = train["recovered"].astype(int)

    X_test = test[FEATURES]

    model = create_model()

    print("Training model...")

    model.fit(
        X_train,
        y_train
    )

    probabilities = (
        model.predict_proba(X_test)[:, 1]
    )

    results = test[
        [
            "payment_id",
            "amount",
            "recovered",
        ]
    ].copy()

    results["recovery_probability"] = (
        probabilities
    )

    total_recoverable_revenue = (
        results["amount"]
        .where(results["recovered"])
        .sum()
    )

    overall_recovery_rate = (
        results["recovered"].mean()
        * 100
    )

    print()
    print("=" * 75)
    print("AI VS RANDOM REVENUE PRIORITIZATION")
    print("=" * 75)

    print(
        f"Test payments: "
        f"{len(results)}"
    )

    print(
        f"Overall recovery rate: "
        f"{overall_recovery_rate:.2f}%"
    )

    print(
        f"Total recoverable revenue: "
        f"₹{total_recoverable_revenue:,.2f}"
    )

    print()

    for percentage in [
        10,
        20,
        30,
        50,
    ]:

        # ------------------------------------------
        # AI selection
        # ------------------------------------------

        ai = evaluate_selection(
            results,
            percentage,
            "AI",
        )

        # ------------------------------------------
        # Repeated random baseline
        # ------------------------------------------

        random_recovery_rates = []
        random_recovered_revenues = []

        for seed in range(100):

            random_result = evaluate_selection(
                results,
                percentage,
                "Random",
                random_state=seed,
            )

            random_recovery_rates.append(
                random_result["recovery_rate"]
            )

            random_recovered_revenues.append(
                random_result["recovered_revenue"]
            )

    random_mean_recovery = (
        np.mean(
            random_recovery_rates
        )
    )

    random_std_recovery = (
        np.std(
            random_recovery_rates
        )
    )

    random_mean_revenue = (
        np.mean(
            random_recovered_revenues
        )
    )

    recovery_lift = (
        ai["recovery_rate"]
        - random_mean_recovery
    )

    revenue_lift = (
        ai["recovered_revenue"]
        - random_mean_revenue
    )

    print(
        f"TOP {percentage}%"
    )

    print(
        f"  Payments selected: "
        f"{ai['count']}"
    )

    print()

    print(
        f"  AI recovery rate: "
        f"{ai['recovery_rate']:.2f}%"
    )

    print(
        f"  Random recovery rate: "
        f"{random_mean_recovery:.2f}% "
        f"± {random_std_recovery:.2f}"
    )

    print(
        f"  AI recovery lift: "
        f"+{recovery_lift:.2f} percentage points"
    )

    print()

    print(
        f"  AI recovered revenue: "
        f"₹{ai['recovered_revenue']:,.2f}"
    )

    print(
        f"  Mean random recovered revenue: "
        f"₹{random_mean_revenue:,.2f}"
    )

    print(
        f"  Additional AI revenue: "
        f"₹{revenue_lift:,.2f}"
    )

    print()

    print("-" * 75)

    print()
    print("TOP 10 AI-PRIORITIZED PAYMENTS")
    print("=" * 75)

    print(
        results
        .sort_values(
            "recovery_probability",
            ascending=False,
        )
        .head(10)
        .to_string(index=False)
    )


if __name__ == "__main__":
    main()