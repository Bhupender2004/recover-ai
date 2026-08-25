from app.services.model_service import (
    RecoveryModelService,
)


def test_model_loads():

    service = RecoveryModelService()

    assert service.model is not None


def test_prediction_returns_probability():

    service = RecoveryModelService()

    features = {
        "amount": 5000,
        "payment_method": "upi",
        "failure_reason": "timeout",
        "customer_lifetime_value": 100000,
        "previous_payment_count": 10,
        "previous_success_count": 8,
        "previous_failure_count": 2,
        "previous_average_amount": 4500,
        "customer_success_rate": 0.8,
        "amount_vs_customer_average": 1.11,
        "recent_failure_count": 1,
    }

    probability = (
        service.predict_probability(
            features
        )
    )

    assert 0 <= probability <= 1