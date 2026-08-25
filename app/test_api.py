from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():

    response = client.get(
        "/api/health"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "healthy"


def test_analyze():

    payload = {
        "payment_id": "TEST_PAYMENT",
        "amount": 5000,
        "payment_method": "upi",
        "failure_reason": "timeout",
        "customer_lifetime_value": 100000,
        "previous_payment_count": 10,
        "previous_success_count": 8,
        "previous_failure_count": 2,
        "previous_average_amount": 4500,
        "recent_failure_count": 1,
    }

    response = client.post(
        "/api/analyze",
        json=payload,
    )

    assert response.status_code == 200

    data = response.json()

    assert (
        0
        <= data["recovery_probability"]
        <= 1
    )

    assert (
        data["expected_recovery_value"]
        >= 0
    )

    assert data[
        "recommended_action"
    ] in [
        "RETRY",
        "PAYMENT_LINK",
        "REMINDER",
        "ESCALATE",
        "NO_ACTION",
    ]


def test_analyze_rejects_invalid_amount():

    payload = {
        "payment_id": "INVALID_PAYMENT",
        "amount": -100,
        "payment_method": "upi",
        "failure_reason": "timeout",
    }

    response = client.post(
        "/api/analyze",
        json=payload,
    )

    assert response.status_code == 422