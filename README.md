# RecoverAI

**AI-powered payment recovery intelligence that predicts recovery probability, estimates recoverable revenue, and recommends the next best action for failed transactions.**

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.1.0-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-Pipeline-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![XGBoost](https://img.shields.io/badge/XGBoost-Classifier-EB5424)](https://xgboost.readthedocs.io/)
[![Tests](https://img.shields.io/badge/Tests-15%20Passed-brightgreen?logo=pytest&logoColor=white)](https://pytest.org/)

---

## 1. Hero Section

RecoverAI is a payment revenue recovery decision-support system. When digital payments fail due to network timeouts, authentication issues, or insufficient funds, merchants typically rely on blunt, automated retries or blanket notifications. RecoverAI changes this paradigm by applying machine learning to payment and customer behavioral context—evaluating whether a payment is recoverable, calculating its expected recovery value, and prescribing an optimized recovery intervention.

> [!IMPORTANT]
> **Prototype & Safety Notice**: RecoverAI is an AI-driven decision-support system built on synthetic dataset benchmarks. It does **not** process live cardholder funds, store raw payment credentials, or execute live financial settlements.

---

## 2. Live Demo & Links

| Service | Link / URL | Description |
| :--- | :--- | :--- |
| **Live Web Dashboard** | [https://recover-ai-lac.vercel.app](https://recover-ai-lac.vercel.app) | Production Next.js web application on Vercel |
| **Backend API (Local)** | `http://127.0.0.1:8000` | FastAPI service |
| **Interactive API Docs (Swagger)** | `http://127.0.0.1:8000/docs` | OpenAPI / Swagger UI interface |
| **Alternative API Docs (ReDoc)** | `http://127.0.0.1:8000/redoc` | OpenAPI / ReDoc interface |

---

## 3. Project Overview

### What is RecoverAI?
RecoverAI is a specialized revenue recovery intelligence platform designed to eliminate payment revenue leakage. It acts as an analytical decision engine sitting between a merchant's payment failure logs and their customer engagement/retry systems.

### What Problem Does It Solve?
Every year, subscription services, e-commerce platforms, and digital merchants lose significant revenue to payment failure. Traditional payment recovery relies on static retry schedules (e.g., retrying every 24 hours) or generic failure emails. This leads to:
1. **Wasted Gateway Fees & Network Fatigue**: Repeatedly retrying hard-declined transactions.
2. **Customer Churn**: Bombarding reliable customers with aggressive debt notices for simple network drops.
3. **Lost High-Value Revenue**: Treating a ₹50,000 corporate renewal failure with the same urgency as a ₹199 micro-transaction.

### Why is AI Essential Here?
Payment recovery is a non-linear multivariate problem. A failure caused by a `timeout` for a customer with a 95% historical success rate has an entirely different recovery profile than an `insufficient_funds` failure on a first-time purchase. Machine learning models capture these historical interaction patterns, payment amounts, and temporal failure frequencies to estimate calibrated recovery probabilities.

---

## 4. Problem Statement

### The Real-World Challenge: Failed Payment Revenue Leakage
In digital commerce, transactions fail for diverse reasons across different payment rails (UPI, Credit/Debit Cards, Net Banking, Digital Wallets):
- **Technical & Transient**: Network drops, bank gateway timeouts.
- **Customer Action Required**: 3D-Secure authentication drop-offs, expired cards.
- **Financial**: Insufficient account balances, card credit limit breaches.

```
TRADITIONAL APPROACH:
Failed Payment ───> Blind Auto-Retry (Fixed Schedule) ───> Customer Spam / Unnecessary Gateway Costs

RECOVERAI APPROACH:
Failed Payment ───> Behavioral Context ───> ML Inference ───> Expected Value ───> Targeted Action
```

Treating all failures identically leads to poor recovery yields. RecoverAI optimizes merchant intervention by focusing effort where expected recovered revenue is highest.

---

## 5. Solution Architecture & Pipeline

RecoverAI processes failed payment events through a 7-stage analytical pipeline:

```
┌────────────────────────┐
│  Payment Failure Event │  (Amount, Payment Method, Failure Reason, Customer ID)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Customer History State │  (Lifetime Value, Historical Counts, Success Rates, Recent Fails)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│  Feature Engineering   │  (Amount-to-Average Ratios, Relative Success Rates)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│  ML Probability Model  │  (Scikit-Learn / XGBoost Inference Pipeline)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Expected Value Engine  │  (EV = Amount × Recovery Probability)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Policy Decision Engine │  (Action: RETRY | PAYMENT_LINK | REMINDER | ESCALATE | NO_ACTION)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│   Recovery Simulator   │  (Simulates multi-step lifecycle with probability decay)
└────────────────────────┘
```

---

## 6. Key Features

- **Machine Learning Recovery Probability**: Calculates calibrated likelihood ($0.0 \to 1.0$) that a failed payment can be recovered.
- **Expected Recovery Value (EV) Calculation**: Computes $\text{EV} = \text{Amount} \times P(\text{Recovery})$ to guide economic prioritization.
- **Rule-Guided Decision Engine**: Recommends context-aware interventions (`RETRY`, `PAYMENT_LINK`, `REMINDER`, `ESCALATE`, `NO_ACTION`) with confidence ratings and business justifications.
- **Multi-Attempt Recovery Simulator**: A demo execution simulator modeling multi-stage recovery attempts with progressive probability degradation ($0.70\times$ multiplier per failed attempt).
- **Interactive Web Dashboard**: Built with Next.js 16 and Tailwind CSS v4 featuring real-time AI analysis forms, validation warnings, and prioritized recovery queues.
- **Type-Safe API Architecture**: FastAPI backend enforcing input boundaries via Pydantic models.
- **Automated Validation Suite**: 15 comprehensive unit and integration tests across API routes, ML services, decision rules, and simulation logic.

---

## 7. Business Value

RecoverAI transforms payment recovery from an uncontrolled cost center into a strategic, value-maximizing operation:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      RECOVERAI EFFICIENCY BENCHMARK                      │
├──────────────────────────────┬─────────────────────────────┬─────────────┤
│ Strategy                     │ Recovery Rate (Top 50% Vol) │ Lift        │
├──────────────────────────────┼─────────────────────────────┼─────────────┤
│ Random / Generic Attempt     │ 54.00% (± 2.47%)            │ Baseline    │
│ RecoverAI Prioritization     │ 67.69%                      │ +13.68 pp   │
│ Additional Revenue Captured  │ +₹2,33,674.97               │ +18.31%     │
└──────────────────────────────┴─────────────────────────────┴─────────────┘
```

1. **Avoid Wasted Recovery Attempts**: Suppresses low-probability, unrecoverable transactions (`NO_ACTION`), reducing payment gateway retry fees.
2. **Prioritize High-Yield Accounts**: Sorts failed transactions by Expected Value so collections or merchant ops teams resolve high-ticket issues first.
3. **Reduce Customer Friction**: Selects low-friction touchpoints (automated re-triggering for timeouts vs. 1-click payment links for authentication drops).

---

## 8. Real-World Use Case

### Scenario: Premium Subscription Renewal
A loyal customer's annual platform subscription fails at renewal.

```yaml
Input Context:
  Payment ID: "PAY_DEMO_001"
  Amount: ₹5,000.00
  Payment Method: "UPI"
  Failure Reason: "timeout"
  Customer Lifetime Value: ₹100,000.00
  Previous Payments: 10
  Previous Successes: 8
  Previous Failures: 2
  Previous Average Amount: ₹4,500.00
  Recent Failure Count (30d): 1

System Execution:
  1. Feature Builder:
     - Customer Success Rate: 8 / 10 = 0.80 (80%)
     - Amount vs Average: ₹5,000 / ₹4,500 = 1.11x
  2. Model Inference:
     - Predicted Recovery Probability: 0.8534 (85.34%)
  3. Expected Value:
     - ₹5,000.00 × 0.8534 = ₹4,267.00
  4. Decision Engine:
     - Condition Match: Probability >= 0.80 AND failure_reason in ['timeout', 'network_error']
     - Recommended Action: RETRY
     - Confidence: high
     - Reason: "High recovery probability and failure appears temporary."
```

---

## 9. System Architecture

```
                      ┌─────────────────────────────────┐
                      │        Browser / Client         │
                      │  (Next.js 16 + Tailwind CSS v4) │
                      └────────────────┬────────────────┘
                                       │
                              HTTP / JSON Requests
                                       │
                      ┌────────────────▼────────────────┐
                      │         FastAPI Backend         │
                      │        (app/main.py)            │
                      └────────────────┬────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                │                                             │
                ▼                                             ▼
  ┌───────────────────────────┐                 ┌───────────────────────────┐
  │  Pydantic Request Validation│                │       Health / Root       │
  │    (app/api/routes.py)    │                 │        Endpoints          │
  └─────────────┬─────────────┘                 └───────────────────────────┘
                │
    ┌───────────┴───────────────────────────┐
    │                                       │
    ▼                                       ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│   RecoveryModelService    │   │      Decision Engine      │
│ (app/services/            │   │ (app/services/            │
│  model_service.py)        │   │  decision_engine.py)      │
│ - Joblib Pipeline Loader  │   │ - Action Selection Rules  │
│ - Probability Inference   │   │ - Expected Value ($Amount │
└─────────────┬─────────────┘   │   * Prob$)                │
              │                 └───────────┬───────────────┘
              │                             │
              └──────────────┬──────────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │      Recovery Simulator     │
              │ (app/services/              │
              │  recovery_simulator.py)     │
              │ - Multi-step execution      │
              │ - Decay probability (0.7x)  │
              └─────────────────────────────┘
```

---

## 10. Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | 16.3.2 | Web dashboard & UI layout |
| **UI Library** | React | 19.2.8 | Reactive state management & components |
| **Styling** | Tailwind CSS / PostCSS | ^4.0.0 | Design system & responsive dark-mode styling |
| **Language (Frontend)**| TypeScript | ^5.0.0 | Static typing for UI contracts |
| **Backend Framework** | FastAPI | Latest (0.115+) | REST API & routing |
| **ASGI Server** | Uvicorn | Standard | Asynchronous HTTP backend server |
| **Language (Backend)** | Python | 3.11 | Backend and Machine Learning runtime |
| **Data Validation** | Pydantic | Latest (v2) | Strict schema parsing & boundary checks |
| **Data Processing** | Pandas & NumPy | Latest | Feature engineering & dataset manipulation |
| **Machine Learning** | scikit-learn & XGBoost | Latest | ML pipelines, imputation, encoders, classification |
| **Model Persistence** | Joblib | Latest | Pipeline serialization (`.joblib`) |
| **Synthetic Generation**| Faker | Latest | Realistic localized Indian merchant/customer data |
| **Testing** | Pytest & HTTPX | pytest 9.1.0 | Unit tests, service tests, API test client |

---

## 11. Project Structure

```
recover-ai/
├── app/                                # FastAPI application backend
│   ├── __init__.py
│   ├── main.py                         # FastAPI initialization, CORS, root route
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py                   # API routes, Pydantic schemas (/analyze, /decide, etc.)
│   ├── services/
│   │   ├── __init__.py
│   │   ├── decision_engine.py          # Action determination logic & Expected Value formulas
│   │   ├── model_service.py            # Serialized model loader & prediction wrapper
│   │   └── recovery_simulator.py       # Multi-attempt lifecycle simulation logic
│   ├── test_api.py                     # API route tests & schema rejection tests
│   ├── test_decision_engine.py         # Decision rule & edge case tests
│   ├── test_model_service.py           # Model loading & inference output tests
│   └── test_recovery_simulator.py      # Simulation attempt ceiling & status tests
├── data/
│   ├── generate_data.py                # Synthetic customer & payment dataset generator
│   ├── build_features.py               # Feature pipeline builder & chronological transformer
│   ├── raw/                            # Generated raw datasets
│   │   ├── customers.csv               # 1,000 synthetic customer records
│   │   └── payments.csv                # 10,000 synthetic payment event logs
│   └── processed/
│       └── recovery_training_data.csv  # 2,291 processed failed payment records
├── docs/                               # Documentation assets
├── frontend/                           # Next.js frontend web application
│   ├── app/
│   │   ├── globals.css                 # Global CSS & Tailwind imports
│   │   ├── layout.tsx                  # Root layout & font configuration
│   │   └── page.tsx                    # Interactive dashboard, analysis form & priority queue
│   ├── .env.local                      # Local frontend environment config
│   ├── package.json                    # Frontend dependencies & scripts
│   ├── postcss.config.mjs              # PostCSS Tailwind configuration
│   ├── tsconfig.json                   # TypeScript compiler options
│   └── README.md                       # Next.js default guide
├── ml/
│   ├── train_model.py                  # Training pipeline, baseline evaluation & model export
│   ├── evaluate_business.py            # Business lift & revenue prioritization analysis
│   └── models/
│       └── recovery_model.joblib       # Exported scikit-learn pipeline artifact
├── .gitignore                          # Git ignore rules
├── .python-version                     # Pinned Python version (3.11)
├── docker-compose.yml                  # Container orchestration specification
├── requirements.txt                    # Pinned Python dependencies
└── README.md                           # Master project documentation
```

---

## 12. Dataset & Data Generation

### Source & Synthetic Rationale
Payment records contain sensitive Personally Identifiable Information (PII), card numbers, and banking details. RecoverAI uses a realistic synthetic dataset generated via [data/generate_data.py](file:///c:/Users/Bhupender%20Yadav/Documents/recover-ai/data/generate_data.py) using `Faker("en_IN")` and seeded stochastic distributions.

### Dataset Schema & Scale
- **Customers (`data/raw/customers.csv`)**: 1,000 unique customer profiles containing `customer_id`, `customer_name`, `customer_email`, `customer_lifetime_value` (₹5,000 to ₹500,000), and a hidden reliability factor ($0.55 \to 0.98$).
- **Payments (`data/raw/payments.csv`)**: 10,000 chronological payment records spanning 180 days across `upi`, `card`, `netbanking`, and `wallet` rails.
- **Training Set (`data/processed/recovery_training_data.csv`)**: 2,291 failed payment events extracted for recovery prediction modeling.

---

## 13. Machine Learning Pipeline

```
Raw Payments CSV + Customers CSV
              │
              ▼
Chronological Sorting (by customer_id, payment_date)
              │
              ▼
Historical Feature Engineering (Lagged sums, expanding averages, failure lookbacks)
              │
              ▼
Filtering Failed Payments Only (status == "failed")
              │
              ▼
Temporal Train/Test Split (First 80% Train: 1,832 records | Last 20% Test: 459 records)
              │
              ▼
ColumnTransformer Pipeline:
  ├─ Categorical: SimpleImputer(most_frequent) ──> OneHotEncoder(handle_unknown='ignore')
  └─ Numerical:   SimpleImputer(median)
              │
              ▼
Model Fit & Serialization (joblib.dump ──> ml/models/recovery_model.joblib)
```

### Why a Temporal Split Matters
In financial transaction modeling, standard randomized cross-validation causes **data leakage** because future customer behavior bleeds into past predictions. RecoverAI uses an explicit chronological 80/20 train/test split to mirror live production forecasting.

---

## 14. ML Models & Comparison

Three models were evaluated on the temporal test set (459 unseen failed payments):

```
┌─────────────────────┬──────────┬───────────┬────────┬──────────┬─────────┐
│ Model               │ Accuracy │ Precision │ Recall │ F1 Score │ ROC-AUC │
├─────────────────────┼──────────┼───────────┼────────┼──────────┼─────────┤
│ Baseline (Majority) │ 53.81%   │ 53.81%    │ 1.0000 │ 0.6997   │ 0.5000  │
│ Logistic Regression │ 62.31%   │ 69.68%    │ 0.5304 │ 0.6023   │ 0.7023  │
│ XGBoost Classifier  │ 62.53%   │ 63.64%    │ 0.7085 │ 0.6705   │ 0.6678  │
└─────────────────────┴──────────┴───────────┴────────┴──────────┴─────────┘
```

1. **Baseline (`DummyClassifier`)**: Always predicts the majority class (`Recovered`). While recall is 1.0, ROC-AUC is 0.50, demonstrating zero discriminative ranking ability.
2. **Logistic Regression (Serialized Default)**: Employs balanced class weighting and provides well-calibrated probabilities with the highest ROC-AUC (0.7023) and highest Precision (69.68%), ensuring recommendations avoid costly false-positive recovery actions.
3. **XGBoost Classifier**: Configured with 300 estimators, tree depth of 5, learning rate 0.05, and subsampling. Achieves higher recall (70.85%) and strong overall F1 score (0.6705).

---

## 15. Model Features

The model evaluates 11 input features derived before any recovery action is initiated:

| Feature Name | Type | Description | Analytical Importance |
| :--- | :--- | :--- | :--- |
| `amount` | Numerical | Transaction value in INR (₹) | Identifies transaction size and exposure risk |
| `payment_method` | Categorical | `upi`, `card`, `netbanking`, `wallet` | Different payment rails have differing retry success rates |
| `failure_reason` | Categorical | `timeout`, `network_error`, `authentication_failed`, `insufficient_funds`, `expired_card`, `card_declined` | Primary operational indicator of whether failure is temporary or permanent |
| `customer_lifetime_value` | Numerical | Historical cumulative customer value (₹) | Contextualizes relationship value and customer importance |
| `previous_payment_count` | Numerical | Total lifetime payments attempted | Measures customer tenure and account maturity |
| `previous_success_count` | Numerical | Total successful lifetime payments | Establishes positive payment baseline |
| `previous_failure_count` | Numerical | Total historical payment failures | Detects chronic failure patterns |
| `previous_average_amount` | Numerical | Mean value of past transactions (₹) | Normal transaction baseline for this customer |
| `customer_success_rate` | Numerical | Ratio: $\frac{\text{Successes}}{\text{Total Payments}}$ | Core reliability index ($0.0 \to 1.0$) |
| `amount_vs_customer_average`| Numerical | Ratio: $\frac{\text{Current Amount}}{\text{Average Amount}}$ | Spikes ($>2.0\times$) often correlate with balance/limit declines |
| `recent_failure_count` | Numerical | Number of failures in preceding 30 days | Identifies short-term account distress or card expiration |

---

## 16. Model Evaluation

Evaluated on 459 holdout test records:

### Confusion Matrix (Logistic Regression)
```
                  Predicted Not Recovered    Predicted Recovered
Actual Not Recovered         155                     57
Actual Recovered             116                    131
```

### Classification Report (Logistic Regression)
```
               Precision    Recall    F1-Score    Support
Not Recovered     0.57       0.73       0.64        212
    Recovered     0.70       0.53       0.60        247

     Accuracy                           0.62        459
    Macro Avg     0.63       0.63       0.62        459
 Weighted Avg     0.64       0.62       0.62        459
```

---

## 17. Decision Engine

RecoverAI separates **statistical inference** ($P(\text{Recovery})$) from **business policies**. The decision engine ([app/services/decision_engine.py](file:///c:/Users/Bhupender%20Yadav/Documents/recover-ai/app/services/decision_engine.py)) maps model outputs and failure modes to 5 operational actions:

```
┌─────────────────────────┬──────────────────────────────┬──────────────────┬────────────┐
│ Recovery Probability    │ Failure Condition / State    │ Assigned Action  │ Confidence │
├─────────────────────────┼──────────────────────────────┼──────────────────┼────────────┤
│ Any                     │ Previous Attempts >= 3       │ NO_ACTION        │ High       │
│ Probability >= 80%      │ 'timeout' OR 'network_error' │ RETRY            │ High       │
│                         │ (Attempts < 2)               │                  │            │
│ Probability >= 70%      │ 'authentication_failed'      │ PAYMENT_LINK     │ High       │
│ Probability >= 55%      │ Any other failure reason     │ REMINDER         │ Medium     │
│ Probability < 40%       │ Any failure reason           │ NO_ACTION        │ High       │
│ 40% <= Prob < 55%       │ Ambiguous / Unmatched        │ ESCALATE         │ Low        │
└─────────────────────────┴──────────────────────────────┴──────────────────┴────────────┘
```

---

## 18. Expected Recovery Value (EV)

To prevent merchants from prioritizing a ₹200 payment with 90% probability over a ₹50,000 payment with 60% probability, RecoverAI computes:

$$\text{Expected Recovery Value} = \text{Amount} \times P(\text{Recovery})$$

### Prioritization Example
- **Payment A**: Amount = ₹500, $P(\text{Recovery}) = 0.90 \implies \mathbf{EV = ₹450}$
- **Payment B**: Amount = ₹20,000, $P(\text{Recovery}) = 0.65 \implies \mathbf{EV = ₹13,000}$

While Payment A has a higher win rate, Payment B represents nearly **$29\times$ more recoverable revenue**.

---

## 19. Recovery Simulator

The recovery simulator ([app/services/recovery_simulator.py](file:///c:/Users/Bhupender%20Yadav/Documents/recover-ai/app/services/recovery_simulator.py)) provides a demo environment modeling multi-step customer workflows:
- **Maximum Attempts**: Hard cap of 3 attempts.
- **Probability Degradation**: If an attempt fails, the recovery probability for the subsequent attempt decays by a factor of $0.70\times$ ($\text{Prob}_{t+1} = \text{Prob}_t \times 0.70$).
- **Lifecycle Termination**: Terminates immediately upon success (`RECOVERED`), upon reaching `NO_ACTION`, or after 3 unsuccessful attempts (`NOT_RECOVERED`).

---

## 20. API Documentation

### 1. Root Service Info
- **Endpoint**: `GET /`
- **Response `200 OK`**:
```json
{
  "name": "RecoverAI",
  "status": "running",
  "message": "AI-powered payment recovery system"
}
```

### 2. Health Check
- **Endpoint**: `GET /api/health`
- **Response `200 OK`**:
```json
{
  "status": "healthy",
  "service": "RecoverAI"
}
```

### 3. Analyze Failed Payment (AI Prediction + Decision)
- **Endpoint**: `POST /api/analyze`
- **Request Body**:
```json
{
  "payment_id": "PAY_DEMO_001",
  "amount": 5000.0,
  "payment_method": "upi",
  "failure_reason": "timeout",
  "customer_lifetime_value": 100000.0,
  "previous_payment_count": 10,
  "previous_success_count": 8,
  "previous_failure_count": 2,
  "previous_average_amount": 4500.0,
  "recent_failure_count": 1
}
```
- **Response `200 OK`**:
```json
{
  "payment_id": "PAY_DEMO_001",
  "amount": 5000.0,
  "recovery_probability": 0.853363,
  "expected_recovery_value": 4266.82,
  "recommended_action": "RETRY",
  "confidence": "high",
  "reason": "High recovery probability and failure appears temporary."
}
```

### 4. Policy Decision Only
- **Endpoint**: `POST /api/decide`
- **Request Body**:
```json
{
  "payment_id": "PAY_DEMO_001",
  "amount": 5000.0,
  "recovery_probability": 0.85,
  "failure_reason": "timeout",
  "previous_attempts": 0,
  "customer_lifetime_value": 100000.0
}
```
- **Response `200 OK`**:
```json
{
  "payment_id": "PAY_DEMO_001",
  "amount": 5000.0,
  "recovery_probability": 0.85,
  "expected_recovery_value": 4250.0,
  "recommended_action": "RETRY",
  "confidence": "high",
  "reason": "High recovery probability and failure appears temporary."
}
```

### 5. Multi-Step Recovery Simulation
- **Endpoint**: `POST /api/simulate`
- **Request Body**: Same schema as `RecoveryRequest`
- **Response `200 OK`**:
```json
{
  "payment_id": "PAY_DEMO_001",
  "amount": 5000.0,
  "final_status": "RECOVERED",
  "total_recovered": 5000.0,
  "attempts": [
    {
      "attempt_number": 1,
      "action": "RETRY",
      "probability": 0.85,
      "expected_value": 4250.0,
      "successful": true
    }
  ]
}
```

### 6. Unified End-to-End Recovery Flow
- **Endpoint**: `POST /api/recover`
- **Request Body**: Same schema as `AnalyzeRequest`
- **Response `200 OK`**: Combines `ai_analysis`, `decision`, and `simulation` in a single response payload.

---

## 21. End-to-End API Flow

```
1. Client Form Submission (JSON Payload)
   │
2. FastAPI Endpoint Router (/api/analyze)
   │
3. Pydantic Model Validation (AnalyzeRequest: gt=0, ge=0, types)
   │
4. Feature Aggregation (Computes customer_success_rate, amount_vs_customer_average)
   │
5. ML Model Inference (RecoveryModelService.predict_probability)
   │
6. Decision Engine Execution (decide_recovery_action: rules + EV calculation)
   │
7. JSON Response Serialization (probability, EV, action, confidence, reason)
   │
8. Next.js UI Rendering (Updates metrics cards, badge status, reasoning block)
```

---

## 22. Frontend Architecture

The user interface ([frontend/app/page.tsx](file:///c:/Users/Bhupender%20Yadav/Documents/recover-ai/frontend/app/page.tsx)) is built with Next.js 16 (React 19) and Tailwind CSS v4:
- **Hero & Live Indicators**: Real-time operational status badge and platform metrics.
- **Aggregate KPI Strip**: Displays Total Recoverable Revenue (₹25.39 L), AI Recovery Rate (67.69%), and AI Recovery Lift (+13.68 pp).
- **Interactive Analysis Form**: 10 input fields with type-checked state hooks.
- **Analysis Result Display**: Shows Recovery Probability percentage, Expected Recovery Value in INR currency formatting, confidence badge, and explanatory reasoning.
- **Live Prioritization Queue**: Sample tabular view of prioritized payment records.

---

## 23. Input Validation

Validation is enforced on both client and server boundaries:

### Backend (Pydantic)
- `amount`: `Field(gt=0)` — strictly positive payment values.
- `recovery_probability`: `Field(ge=0, le=1)` — bounded probability interval.
- `customer_lifetime_value`: `Field(ge=0)` — non-negative float.
- `previous_payment_count`, `previous_success_count`, `previous_failure_count`, `recent_failure_count`: `Field(ge=0)` — non-negative integers.

### Frontend (Client-Side)
- Checks non-empty Payment IDs.
- Validates logical consistency: `previous_success_count + previous_failure_count <= previous_payment_count`.
- Verifies finite numerical values before network submission.

---

## 24. Error Handling

- **Pydantic Validation Errors (`HTTP 422`)**: The frontend intercepts 422 response arrays and formats them into human-readable field labels.
- **Network / Connectivity Drops**: Handles fetch `TypeError` with friendly retry messages ("Unable to connect to RecoverAI API. Please try again in a few seconds.").
- **Model / Service Missing File**: Throws a descriptive `FileNotFoundError` prompting the operator to run `python ml/train_model.py`.

---

## 25. Testing Strategy

The repository includes 15 automated test cases executed via `pytest`:

```bash
$ pytest
============================= test session starts =============================
collected 15 items

app\test_api.py ....                                                     [ 26%]
app\test_decision_engine.py .....                                        [ 60%]
app\test_model_service.py ..                                             [ 73%]
app\test_recovery_simulator.py ....                                      [100%]

======================== 15 passed in 4.13s ========================
```

- **`test_api.py` (4 tests)**: Validates `GET /api/health`, `POST /api/analyze`, `POST /api/recover`, and rejection of negative amounts (`HTTP 422`).
- **`test_decision_engine.py` (5 tests)**: Verifies `RETRY` for timeouts, `PAYMENT_LINK` for authentication failures, `NO_ACTION` for low probabilities, attempt caps, and Expected Value formulas.
- **`test_model_service.py` (2 tests)**: Validates joblib artifact loading and probability output bounds ($0 \le P \le 1$).
- **`test_recovery_simulator.py` (4 tests)**: Tests high/low probability payment lifecycles, non-empty attempt logs, and attempt ceiling limits ($\le 3$).

---

## 26. Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 20+ & npm

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/Bhupender2004/recover-ai.git
cd recover-ai

# Create and activate Python virtual environment
python -m venv .venv

# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Linux/macOS:
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# (Optional) Regenerate dataset and train ML model
python data/generate_data.py
python data/build_features.py
python ml/train_model.py

# Run test suite
pytest

# Start FastAPI server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
*Backend runs at `http://127.0.0.1:8000` (Swagger UI at `http://127.0.0.1:8000/docs`).*

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start Next.js development server
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 27. Environment Variables

### Frontend Configuration (`frontend/.env.local`)

| Variable | Required | Default / Example (Local) | Example (Production) | Description |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Yes | `http://127.0.0.1:8000` | `https://recover-ai-api.onrender.com` | Base URL of the FastAPI backend service |

---

## 28. Production Deployment

### Frontend (Vercel)
- **Platform**: Vercel
- **Root Directory**: `frontend`
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Environment Variable**: `NEXT_PUBLIC_API_URL` set to the deployed backend URL.

### Backend (Render / Cloud Container)
- **Platform**: Render / Railway / AWS App Runner
- **Build Command**: `pip install -r requirements.txt && python ml/train_model.py`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

## 29. CORS Configuration

Configured in [app/main.py](file:///c:/Users/Bhupender%20Yadav/Documents/recover-ai/app/main.py):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://recover-ai-lac.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 30. Security & Privacy

- **No Live Financial Settlements**: Operates purely as an analytical decision-support layer.
- **No Sensitive Cardholder Data**: Operates on anonymized identifiers, high-level payment methods, and aggregated behavior without storing PANs, CVVs, or bank credentials.
- **Synthetic Benchmark Isolation**: Trained exclusively on synthesized data generated for research and hackathon benchmarking.
- **Environment Isolation**: API endpoints and credentials are fully externalized via environment variables.

---

## 31. Current Limitations

1. **Synthetic Data Benchmark**: Trained on synthetic payments; model weights will need fine-tuning on live merchant logs.
2. **Rule-Based Decision Layer**: The policy engine utilizes predefined deterministic thresholds rather than reinforcement learning.
3. **Stateless Operations**: The current prototype does not connect to a persistent operational database (PostgreSQL/Redis); historical state is passed in API payloads.
4. **Synchronous REST API**: Operates via request-response rather than asynchronous message streaming (Kafka / RabbitMQ).

---

## 32. Future Scope & Roadmap

- [ ] **Direct Payment Gateway Connectors**: Webhook listeners for Stripe, Razorpay, and Adyen.
- [ ] **Multi-Armed Bandit / RL Action Optimization**: Self-optimizing decision thresholds based on real-time recovery yield feedback.
- [ ] **Persistent Database & Event Store**: PostgreSQL with Prisma/SQLAlchemy for historical payment ledgering and auditing.
- [ ] **Multi-Channel Dispatcher**: Automated WhatsApp, SMS, and email payment link triggering via Twilio/SendGrid.
- [ ] **Model Explainability (SHAP Values)**: Visual feature importance breakdowns directly on the dashboard.

---

## 33. Business Impact & Measurable KPIs

| Metric | Prototype Benchmark | Production Target |
| :--- | :--- | :--- |
| **Recovery Rate Lift** | **+13.68 pp** vs Random | +15% to +20% over unguided retries |
| **Additional Captured Revenue** | **₹2.33 L** (on ₹25.39 L test volume) | 10%–18% incremental revenue recovery |
| **Recovery Efficiency** | High-probability focus (top 50%) | >35% reduction in unrecoverable gateway attempts |

---

## 34. Why RecoverAI Fits Track 3: AI Revenue Recovery

1. **Directly Addresses Revenue Leakage**: Solves the core challenge of silent churn and lost gross merchandise value (GMV) from failed payments.
2. **True Predictive Intelligence**: Replaces generic static schedules with ML-driven probability estimates.
3. **Value-Optimized Prioritization**: Introduces Expected Recovery Value ($\text{Amount} \times P$) to maximize financial recovery per operational unit of effort.
4. **End-to-End Functional Prototype**: Combines a trained ML pipeline, decision engine, simulation service, FastAPI backend, and Next.js frontend with 15 passing tests.

---

## 35. 2-Minute Hackathon Demo Flow

1. **Open Dashboard**: Navigate to [https://recover-ai-lac.vercel.app](https://recover-ai-lac.vercel.app).
2. **Review High-Level Metrics**: Highlight ₹25.39 L recoverable revenue and +13.68 pp AI lift benchmark cards.
3. **Scenario A (High-Probability Timeout)**:
   - Enter Amount: `₹5000`, Reason: `timeout`, Method: `UPI`, Successes: `8`, Failures: `2`.
   - Click **Analyze Payment** $\to$ Result: **85.3% Probability**, Expected Value: **₹4,266.82**, Action: **`RETRY`**.
4. **Scenario B (Authentication Failure)**:
   - Change Reason to `authentication_failed`.
   - Click **Analyze Payment** $\to$ Result: Action switches to **`PAYMENT_LINK`** (prescribing a new customer authentication flow).
5. **Scenario C (Low-Probability Decline)**:
   - Change Reason to `insufficient_funds`, Amount: `₹35000`, Successes: `1`, Failures: `6`.
   - Click **Analyze Payment** $\to$ Result: Probability drops $<40\%$, Action switches to **`NO_ACTION`** (preventing wasted merchant retry fees).

---

## 36. Example Scenarios

| Scenario | Input Profile | Recovery Probability | Expected Recovery Value | Action | Strategic Justification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Transient Network Drop** | Amount: ₹5,000, Method: UPI, Reason: `timeout`, Success Rate: 80% | **85.3%** | **₹4,266.82** | `RETRY` | Transient gateway failure; immediate silent retry has highest probability. |
| **2. Auth Drop-off** | Amount: ₹10,000, Method: Card, Reason: `authentication_failed`, Success Rate: 75% | **73.2%** | **₹7,320.00** | `PAYMENT_LINK` | 3DS session expired; customer requires a frictionless direct checkout link. |
| **3. Moderate Risk Drop** | Amount: ₹3,500, Method: Netbanking, Reason: `network_error`, Success Rate: 60% | **58.4%** | **₹2,044.00** | `REMINDER` | Moderate probability; send low-friction notification before re-attempting. |
| **4. Chronic Non-Recoverable**| Amount: ₹25,000, Method: Card, Reason: `insufficient_funds`, Failures: 5/6 | **24.1%** | **₹6,025.00** | `NO_ACTION` | Repeated declines; suppress automatic retries to save fees and avoid spamming. |

---

## 37. Technical Design Decisions

- **Why FastAPI?** Lightweight, high-performance async execution, native OpenAPI documentation generation, and robust Pydantic data validation.
- **Why Next.js & Tailwind CSS v4?** Modern React 19 component architecture, zero-config styling, and fast server rendering.
- **Why Logistic Regression for Default Deployment?** Offers calibrated, smooth probability outputs and balanced precision (69.68%) with high interpretability and minimal cold-start latency.
- **Why Separate the Decision Engine from the ML Model?** Keeps machine learning focused on objective probability estimation while allowing merchants to adjust business policy rules, compliance thresholds, and attempt caps independently.

---

## 38. Development Milestones

- `f8ddaa0` / `910425e`: Initial project setup and architecture scaffolding.
- `e398ac2` / `051392d`: Implementation and refinement of chronological synthetic payment generator (`data/generate_data.py`).
- `1d18545`: Implementation of API test suite and unit tests (`app/test_*.py`).
- `2923323`: Repository hygiene and virtual environment isolation.
- `4211067`: Unified end-to-end recovery pipeline route (`/api/recover`).
- `af2b20b`: Next.js frontend integration with FastAPI backend.
- `5c1e152` / `186555d` / `509193e`: Production deployment preparation, Vercel configuration, and CORS origin setup.
- `2620562`: Frontend form validation rules and API error handling transformations.

---

## 39. Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/recovery-enhancement`).
3. Ensure all tests pass (`pytest`).
4. Commit your changes (`git commit -m "Add recovery enhancement"`).
5. Push to the branch (`git push origin feature/recovery-enhancement`).
6. Open a Pull Request.

---

## 40. License

This project is currently distributed as an open-source development prototype. Please refer to repository settings for specific licensing terms.

---

## 41. Disclaimer

RecoverAI is a hackathon prototype and decision-support simulation system. It does not execute live financial transactions or interface directly with banking settlement networks. It should not be used in production financial environments without independent verification, security review, regulatory compliance evaluation, and live payment gateway testing.
