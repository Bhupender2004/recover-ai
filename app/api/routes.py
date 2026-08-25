from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.services.decision_engine import (
    decide_recovery_action,
)

from app.services.recovery_simulator import (
    simulate_recovery,
)

from app.services.model_service import (
    RecoveryModelService,
)


router = APIRouter(
    prefix="/api",
    tags=["RecoverAI"],
)


model_service = RecoveryModelService()


class RecoveryRequest(BaseModel):

    payment_id: str = "DEMO_PAYMENT"

    amount: float = Field(
        gt=0,
        description="Failed payment amount",
    )

    recovery_probability: float = Field(
        ge=0,
        le=1,
        description="Predicted recovery probability",
    )

    failure_reason: str

    previous_attempts: int = Field(
        default=0,
        ge=0,
    )

    customer_lifetime_value: float = Field(
        default=0,
        ge=0,
    )


class AnalyzeRequest(BaseModel):

    payment_id: str = "DEMO_PAYMENT"

    amount: float = Field(
        gt=0,
        description="Failed payment amount",
    )

    payment_method: str

    failure_reason: str

    customer_lifetime_value: float = Field(
        default=0,
        ge=0,
    )

    previous_payment_count: int = Field(
        default=0,
        ge=0,
    )

    previous_success_count: int = Field(
        default=0,
        ge=0,
    )

    previous_failure_count: int = Field(
        default=0,
        ge=0,
    )

    previous_average_amount: float = Field(
        default=0,
        ge=0,
    )

    recent_failure_count: int = Field(
        default=0,
        ge=0,
    )


@router.get("/health")
def health_check():

    return {
        "status": "healthy",
        "service": "RecoverAI",
    }


@router.post("/decide")
def decide(request: RecoveryRequest):

    decision = decide_recovery_action(
        amount=request.amount,
        recovery_probability=(
            request.recovery_probability
        ),
        failure_reason=request.failure_reason,
        previous_attempts=request.previous_attempts,
        customer_lifetime_value=(
            request.customer_lifetime_value
        ),
    )

    return {
        "payment_id": request.payment_id,
        "amount": request.amount,
        "recovery_probability": (
            request.recovery_probability
        ),
        "expected_recovery_value": (
            decision.expected_recovery_value
        ),
        "recommended_action": (
            decision.action
        ),
        "confidence": (
            decision.confidence
        ),
        "reason": (
            decision.reason
        ),
    }


@router.post("/simulate")
def simulate(request: RecoveryRequest):

    result = simulate_recovery(
        payment_id=request.payment_id,
        amount=request.amount,
        recovery_probability=(
            request.recovery_probability
        ),
        failure_reason=request.failure_reason,
    )

    return {
        "payment_id": result.payment_id,
        "amount": result.amount,
        "final_status": result.final_status,
        "total_recovered": (
            result.total_recovered
        ),
        "attempts": [
            {
                "attempt_number": attempt.attempt_number,
                "action": attempt.action,
                "probability": attempt.probability,
                "expected_value": (
                    attempt.expected_value
                ),
                "successful": attempt.successful,
            }
            for attempt in result.attempts
        ],
    }


@router.post("/analyze")
def analyze(request: AnalyzeRequest):

    features = {
        "amount": request.amount,
        "payment_method": request.payment_method,
        "failure_reason": request.failure_reason,
        "customer_lifetime_value": (
            request.customer_lifetime_value
        ),
        "previous_payment_count": (
            request.previous_payment_count
        ),
        "previous_success_count": (
            request.previous_success_count
        ),
        "previous_failure_count": (
            request.previous_failure_count
        ),
        "previous_average_amount": (
            request.previous_average_amount
        ),
        "customer_success_rate": (
            request.previous_success_count
            / request.previous_payment_count
            if request.previous_payment_count > 0
            else 0
        ),
        "amount_vs_customer_average": (
            request.amount
            / request.previous_average_amount
            if request.previous_average_amount > 0
            else 1
        ),
        "recent_failure_count": (
            request.recent_failure_count
        ),
    }

    recovery_probability = (
        model_service.predict_probability(
            features
        )
    )

    expected_recovery_value = round(
        request.amount
        * recovery_probability,
        2,
    )

    decision = decide_recovery_action(
        amount=request.amount,
        recovery_probability=recovery_probability,
        failure_reason=request.failure_reason,
        previous_attempts=0,
        customer_lifetime_value=(
            request.customer_lifetime_value
        ),
    )

    return {
        "payment_id": request.payment_id,
        "amount": request.amount,
        "recovery_probability": (
            recovery_probability
        ),
        "expected_recovery_value": (
            expected_recovery_value
        ),
        "recommended_action": (
            decision.action
        ),
        "confidence": (
            decision.confidence
        ),
        "reason": (
            decision.reason
        ),
    }