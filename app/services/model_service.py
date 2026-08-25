from pathlib import Path

import joblib
import pandas as pd


MODEL_PATH = Path(
    "ml/models/recovery_model.joblib"
)


FEATURE_COLUMNS = [
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


class RecoveryModelService:

    def __init__(self):

        if not MODEL_PATH.exists():

            raise FileNotFoundError(
                f"Model not found: {MODEL_PATH}. "
                "Run python ml/train_model.py first."
            )

        self.model = joblib.load(
            MODEL_PATH
        )

    def predict_probability(
        self,
        features: dict,
    ) -> float:

        data = pd.DataFrame(
            [features]
        )

        data = data[
            FEATURE_COLUMNS
        ]

        probability = (
            self.model
            .predict_proba(data)[0][1]
        )

        return round(
            float(probability),
            6,
        )