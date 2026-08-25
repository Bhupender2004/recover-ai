from pathlib import Path

import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.dummy import DummyClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from xgboost import XGBClassifier


DATA_PATH = "data/processed/recovery_training_data.csv"

MODEL_DIR = Path("ml/models")
MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def load_data():

    df = pd.read_csv(DATA_PATH)

    df["payment_date"] = pd.to_datetime(
        df["payment_date"]
    )

    return df


def prepare_data(df):

    # Sort chronologically.
    df = df.sort_values(
        "payment_date"
    ).reset_index(drop=True)

    feature_columns = [
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

    target_column = "recovered"

    X = df[feature_columns].copy()
    y = df[target_column].astype(int)

    # Temporal 80/20 split.
    split_index = int(
        len(df) * 0.80
    )

    X_train = X.iloc[:split_index]
    X_test = X.iloc[split_index:]

    y_train = y.iloc[:split_index]
    y_test = y.iloc[split_index:]

    print("Training records:", len(X_train))
    print("Testing records:", len(X_test))

    print(
        "Training recovery rate:",
        round(y_train.mean() * 100, 2),
        "%"
    )

    print(
        "Testing recovery rate:",
        round(y_test.mean() * 100, 2),
        "%"
    )

    return (
        X_train,
        X_test,
        y_train,
        y_test,
    )


def create_preprocessor():

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

    return preprocessor


def evaluate_model(
    model_name,
    model,
    X_test,
    y_test,
):

    predictions = model.predict(
        X_test
    )

    probabilities = model.predict_proba(
        X_test
    )[:, 1]

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        zero_division=0
    )

    auc = roc_auc_score(
        y_test,
        probabilities
    )

    print()
    print("=" * 60)
    print(model_name)
    print("=" * 60)

    print(
        f"Accuracy : {accuracy:.4f}"
    )

    print(
        f"Precision: {precision:.4f}"
    )

    print(
        f"Recall   : {recall:.4f}"
    )

    print(
        f"F1 Score : {f1:.4f}"
    )

    print(
        f"ROC-AUC  : {auc:.4f}"
    )

    print()
    print("Confusion Matrix:")

    print(
        confusion_matrix(
            y_test,
            predictions
        )
    )

    print()
    print("Classification Report:")

    print(
        classification_report(
            y_test,
            predictions,
            target_names=[
                "Not Recovered",
                "Recovered",
            ],
            zero_division=0
        )
    )

    return {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "roc_auc": auc,
    }


def main():

    print("Loading dataset...")

    df = load_data()

    print(
        f"Total records: {len(df)}"
    )

    (
        X_train,
        X_test,
        y_train,
        y_test,
    ) = prepare_data(df)

    preprocessor = create_preprocessor()

    # --------------------------------------------------
    # BASELINE
    # --------------------------------------------------

    baseline = Pipeline([
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "classifier",
            DummyClassifier(
                strategy="most_frequent"
            ),
        ),
    ])

    baseline.fit(
        X_train,
        y_train
    )

    baseline_metrics = evaluate_model(
        "Baseline",
        baseline,
        X_test,
        y_test,
    )

    # --------------------------------------------------
    # LOGISTIC REGRESSION
    # --------------------------------------------------

    logistic_model = Pipeline([
        (
            "preprocessor",
            create_preprocessor(),
        ),
        (
            "classifier",
            LogisticRegression(
                max_iter=1000,
                class_weight="balanced",
            ),
        ),
    ])

    logistic_model.fit(
        X_train,
        y_train
    )
    
        # Save the complete preprocessing + model pipeline.
    model_path = MODEL_DIR / "recovery_model.joblib"

    joblib.dump(
        logistic_model,
        model_path
    )

    print()
    print(
        f"Saved Logistic Regression model to: "
        f"{model_path}"
    )

    logistic_metrics = evaluate_model(
        "Logistic Regression",
        logistic_model,
        X_test,
        y_test,
    )

    # --------------------------------------------------
    # XGBOOST
    # --------------------------------------------------

    xgb_model = Pipeline([
        (
            "preprocessor",
            create_preprocessor(),
        ),
        (
            "classifier",
            XGBClassifier(
                n_estimators=300,
                max_depth=5,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                objective="binary:logistic",
                eval_metric="logloss",
                random_state=42,
            ),
        ),
    ])

    xgb_model.fit(
        X_train,
        y_train
    )

    xgb_metrics = evaluate_model(
        "XGBoost",
        xgb_model,
        X_test,
        y_test,
    )

    # --------------------------------------------------
    # MODEL COMPARISON
    # --------------------------------------------------

    print()
    print("=" * 60)
    print("MODEL COMPARISON")
    print("=" * 60)

    results = pd.DataFrame([
        {
            "model": "Baseline",
            **baseline_metrics,
        },
        {
            "model": "Logistic Regression",
            **logistic_metrics,
        },
        {
            "model": "XGBoost",
            **xgb_metrics,
        },
    ])

    print(
        results.to_string(
            index=False
        )
    )


if __name__ == "__main__":
    main()