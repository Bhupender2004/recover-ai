"use client";

import React, { useState } from "react";
import { InputField, SelectField } from "./FormControls";
import { AnalysisResultCard, AnalysisResult, DecisionContext } from "./AnalysisResultCard";
import { SparklesIcon, ExclamationTriangleIcon, BoltIcon, CheckCircleIcon } from "./Icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface FormData {
  payment_id: string;
  amount: string;
  payment_method: string;
  failure_reason: string;
  customer_lifetime_value: string;
  previous_payment_count: string;
  previous_success_count: string;
  previous_failure_count: string;
  previous_average_amount: string;
  recent_failure_count: string;
}

const DEFAULT_FORM: FormData = {
  payment_id: "PAY_DEMO_001",
  amount: "5000",
  payment_method: "upi",
  failure_reason: "timeout",
  customer_lifetime_value: "100000",
  previous_payment_count: "10",
  previous_success_count: "8",
  previous_failure_count: "2",
  previous_average_amount: "4500",
  recent_failure_count: "1",
};

interface PresetScenario {
  name: string;
  tag: string;
  data: FormData;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    name: "Temporary Timeout",
    tag: "Likely RETRY",
    data: {
      payment_id: "PAY_UPI_8821",
      amount: "4200",
      payment_method: "upi",
      failure_reason: "timeout",
      customer_lifetime_value: "125000",
      previous_payment_count: "15",
      previous_success_count: "14",
      previous_failure_count: "1",
      previous_average_amount: "4000",
      recent_failure_count: "1",
    },
  },
  {
    name: "Auth Drop-off",
    tag: "Likely PAYMENT LINK",
    data: {
      payment_id: "PAY_CARD_4019",
      amount: "8500",
      payment_method: "card",
      failure_reason: "authentication_failed",
      customer_lifetime_value: "95000",
      previous_payment_count: "8",
      previous_success_count: "7",
      previous_failure_count: "1",
      previous_average_amount: "8000",
      recent_failure_count: "1",
    },
  },
  {
    name: "Balance Drop",
    tag: "Likely REMINDER",
    data: {
      payment_id: "PAY_WAL_6104",
      amount: "1999",
      payment_method: "wallet",
      failure_reason: "insufficient_funds",
      customer_lifetime_value: "35000",
      previous_payment_count: "6",
      previous_success_count: "4",
      previous_failure_count: "2",
      previous_average_amount: "1800",
      recent_failure_count: "1",
    },
  },
  {
    name: "Uncertain Risk",
    tag: "Likely ESCALATE",
    data: {
      payment_id: "PAY_NET_9022",
      amount: "28500",
      payment_method: "netbanking",
      failure_reason: "card_declined",
      customer_lifetime_value: "40000",
      previous_payment_count: "4",
      previous_success_count: "2",
      previous_failure_count: "2",
      previous_average_amount: "12000",
      recent_failure_count: "2",
    },
  },
];

function isAnalysisResult(data: unknown): data is AnalysisResult {
  if (typeof data !== "object" || data === null) return false;
  const val = data as Record<string, unknown>;
  return (
    typeof val.payment_id === "string" &&
    typeof val.amount === "number" &&
    typeof val.recovery_probability === "number" &&
    typeof val.expected_recovery_value === "number" &&
    typeof val.recommended_action === "string" &&
    typeof val.confidence === "string" &&
    typeof val.reason === "string"
  );
}

export function PaymentAnalyzer({
  onAnalyzeSuccess,
}: {
  onAnalyzeSuccess?: (res: AnalysisResult) => void;
}) {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [submittedContext, setSubmittedContext] = useState<DecisionContext | null>(null);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error upon typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const loadPreset = (preset: PresetScenario) => {
    setForm(preset.data);
    setFieldErrors({});
    setGeneralError("");
  };

  // Comprehensive client validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.payment_id.trim()) {
      errors.payment_id = "Payment ID is required.";
    }

    const amount = Number(form.amount);
    if (isNaN(amount) || amount <= 0) {
      errors.amount = "Payment amount must be greater than ₹0.";
    }

    const ltv = Number(form.customer_lifetime_value);
    if (isNaN(ltv) || ltv < 0) {
      errors.customer_lifetime_value = "Lifetime value cannot be negative.";
    }

    const prevCount = Number(form.previous_payment_count);
    if (isNaN(prevCount) || !Number.isInteger(prevCount) || prevCount < 0) {
      errors.previous_payment_count = "Must be a non-negative whole number.";
    }

    const successCount = Number(form.previous_success_count);
    if (isNaN(successCount) || !Number.isInteger(successCount) || successCount < 0) {
      errors.previous_success_count = "Must be a non-negative whole number.";
    }

    const failCount = Number(form.previous_failure_count);
    if (isNaN(failCount) || !Number.isInteger(failCount) || failCount < 0) {
      errors.previous_failure_count = "Must be a non-negative whole number.";
    }

    const avgAmount = Number(form.previous_average_amount);
    if (isNaN(avgAmount) || avgAmount < 0) {
      errors.previous_average_amount = "Average amount cannot be negative.";
    }

    const recentFails = Number(form.recent_failure_count);
    if (isNaN(recentFails) || !Number.isInteger(recentFails) || recentFails < 0) {
      errors.recent_failure_count = "Must be a non-negative whole number.";
    }

    // Relational consistency validations
    if (!isNaN(prevCount) && !isNaN(successCount) && successCount > prevCount) {
      errors.previous_success_count = "Cannot exceed total previous payments.";
    }

    if (!isNaN(prevCount) && !isNaN(failCount) && failCount > prevCount) {
      errors.previous_failure_count = "Cannot exceed total previous payments.";
    }

    if (
      !isNaN(prevCount) &&
      !isNaN(successCount) &&
      !isNaN(failCount) &&
      successCount + failCount > prevCount
    ) {
      errors.previous_failure_count = "Successful + failed count exceeds total previous payments.";
    }

    if (!isNaN(prevCount) && !isNaN(recentFails) && recentFails > prevCount) {
      errors.recent_failure_count = "Recent failures cannot exceed total previous payments.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getApiErrorMessage = (data: unknown) => {
    if (typeof data === "object" && data !== null && "detail" in data && Array.isArray(data.detail)) {
      const fieldLabels: Record<string, string> = {
        payment_id: "Payment ID",
        amount: "Payment Amount",
        payment_method: "Payment Method",
        failure_reason: "Failure Reason",
        customer_lifetime_value: "Customer Lifetime Value",
        previous_payment_count: "Previous Payments",
        previous_success_count: "Previous Successful Payments",
        previous_failure_count: "Previous Failed Payments",
        previous_average_amount: "Previous Average Amount",
        recent_failure_count: "Recent Failure Count",
      };

      return data.detail
        .map((item: unknown) => {
          const it = typeof item === "object" && item !== null ? (item as Record<string, unknown>) : null;
          const loc = it && Array.isArray(it.loc) ? (it.loc as string[]) : [];
          const field = loc[1] || "";
          const label = fieldLabels[field] || "Field";
          const msg = it && typeof it.msg === "string" ? it.msg : "contains an invalid value.";
          return `${label}: ${msg}`;
        })
        .join(". ");
    }

    if (typeof data === "object" && data !== null && "detail" in data && typeof data.detail === "string") {
      return data.detail;
    }

    if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
      return data.message;
    }

    return "Unable to analyze this payment. Please verify input fields.";
  };

  const analyzePayment = async () => {
    setGeneralError("");
    setResult(null);

    const isValid = validateForm();
    if (!isValid) {
      setGeneralError("Please resolve the highlighted validation errors above.");
      return;
    }

    setLoading(true);

    const payload = {
      payment_id: form.payment_id.trim(),
      amount: Number(form.amount),
      payment_method: form.payment_method,
      failure_reason: form.failure_reason,
      customer_lifetime_value: Number(form.customer_lifetime_value),
      previous_payment_count: Number(form.previous_payment_count),
      previous_success_count: Number(form.previous_success_count),
      previous_failure_count: Number(form.previous_failure_count),
      previous_average_amount: Number(form.previous_average_amount),
      recent_failure_count: Number(form.recent_failure_count),
    };

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data));
      }

      if (!isAnalysisResult(data)) {
        throw new Error("The API returned an unexpected analysis response format.");
      }

      setResult(data);
      setSubmittedContext(payload);
      if (onAnalyzeSuccess) {
        onAnalyzeSuccess(data);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      if (err instanceof TypeError) {
        setGeneralError("Unable to connect to RecoverAI API. Please ensure the backend service is reachable.");
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("Something went wrong while analyzing the payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="analyzer"
      className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950/95 p-6 sm:p-9 shadow-2xl shadow-black/40"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-7 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>AI DECISION ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Analyze a Failed Payment
          </h2>
          <p className="mt-1.5 text-sm text-slate-400 max-w-2xl">
            Provide payment and customer context. RecoverAI will predict recovery probability and recommend the next action.
          </p>
        </div>

        {/* Quick Scenario Buttons for Fast Demo Testing */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Quick Test Scenarios:</span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-[11px] font-medium text-slate-200 border border-slate-700/70 transition-colors shadow-sm"
                title={`Load ${preset.name} (${preset.tag})`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Grid */}
      <div className="mt-8 space-y-8">
        
        {/* GROUP 1 — PAYMENT CONTEXT */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900/60 border border-blue-700/50 text-xs font-bold text-blue-300">
              1
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Payment Context
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InputField
              label="Payment ID"
              value={form.payment_id}
              onChange={(val) => updateField("payment_id", val)}
              placeholder="e.g. PAY_001"
              tooltip="Unique identifier for the failed payment transaction."
              error={fieldErrors.payment_id}
              required
            />

            <InputField
              label="Payment Amount (₹)"
              type="number"
              min="0.01"
              step="0.01"
              prefix="₹"
              value={form.amount}
              onChange={(val) => updateField("amount", val)}
              placeholder="5000"
              tooltip="Total transaction amount of the failed payment."
              error={fieldErrors.amount}
              required
            />

            <SelectField
              label="Payment Method"
              value={form.payment_method}
              onChange={(val) => updateField("payment_method", val)}
              options={[
                { value: "upi", label: "UPI (Unified Payments)" },
                { value: "card", label: "Credit / Debit Card" },
                { value: "netbanking", label: "Net Banking" },
                { value: "wallet", label: "Digital Wallet" },
              ]}
              tooltip="The payment rail or gateway channel used."
              error={fieldErrors.payment_method}
              required
            />

            <SelectField
              label="Failure Reason"
              value={form.failure_reason}
              onChange={(val) => updateField("failure_reason", val)}
              options={[
                { value: "timeout", label: "Timeout (Gateway / Bank)" },
                { value: "authentication_failed", label: "Authentication Failed (3DS)" },
                { value: "insufficient_funds", label: "Insufficient Funds" },
                { value: "network_error", label: "Network Error" },
                { value: "expired_card", label: "Expired Card" },
                { value: "card_declined", label: "Card Declined / Issuer Block" },
              ]}
              tooltip="The decline or failure code provided by the payment gateway."
              error={fieldErrors.failure_reason}
              required
            />
          </div>
        </div>

        {/* GROUP 2 — CUSTOMER HISTORY */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900/60 border border-blue-700/50 text-xs font-bold text-blue-300">
              2
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Customer History & Behavior
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InputField
              label="Customer Lifetime Value (₹)"
              type="number"
              min="0"
              step="0.01"
              prefix="₹"
              value={form.customer_lifetime_value}
              onChange={(val) => updateField("customer_lifetime_value", val)}
              placeholder="100000"
              tooltip="Total historical value generated by this customer."
              error={fieldErrors.customer_lifetime_value}
            />

            <InputField
              label="Previous Payments"
              type="number"
              min="0"
              step="1"
              value={form.previous_payment_count}
              onChange={(val) => updateField("previous_payment_count", val)}
              placeholder="10"
              tooltip="Number of payments previously attempted by this customer."
              error={fieldErrors.previous_payment_count}
            />

            <InputField
              label="Previous Successful Payments"
              type="number"
              min="0"
              step="1"
              value={form.previous_success_count}
              onChange={(val) => updateField("previous_success_count", val)}
              placeholder="8"
              tooltip="Previously completed successful transactions."
              error={fieldErrors.previous_success_count}
            />

            <InputField
              label="Previous Failed Payments"
              type="number"
              min="0"
              step="1"
              value={form.previous_failure_count}
              onChange={(val) => updateField("previous_failure_count", val)}
              placeholder="2"
              tooltip="Previously failed transactions."
              error={fieldErrors.previous_failure_count}
            />

            <InputField
              label="Previous Average Amount (₹)"
              type="number"
              min="0"
              step="0.01"
              prefix="₹"
              value={form.previous_average_amount}
              onChange={(val) => updateField("previous_average_amount", val)}
              placeholder="4500"
              tooltip="Average value of the customer's previous payments."
              error={fieldErrors.previous_average_amount}
            />

            <InputField
              label="Recent Failure Count"
              type="number"
              min="0"
              step="1"
              value={form.recent_failure_count}
              onChange={(val) => updateField("recent_failure_count", val)}
              placeholder="1"
              tooltip="Recent payment failures indicating possible payment friction."
              error={fieldErrors.recent_failure_count}
            />
          </div>
        </div>

      </div>

      {/* Action Bar */}
      <div className="mt-9 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={analyzePayment}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <BoltIcon className="w-4 h-4 text-white" />
                <span>Analyze Payment</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(DEFAULT_FORM);
              setFieldErrors({});
              setGeneralError("");
              setResult(null);
            }}
            disabled={loading}
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            Reset Form
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Real-time ML Model Evaluation & Rule Engine</span>
        </div>
      </div>

      {/* General Error Banner */}
      {generalError && (
        <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/40 p-4.5 flex items-start gap-3 text-red-300">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-200">Analysis Failed</p>
            <p className="mt-0.5 text-xs text-red-300/90 leading-relaxed">{generalError}</p>
          </div>
        </div>
      )}

      {/* AI Result Card */}
      {result && (
        <AnalysisResultCard result={result} context={submittedContext || undefined} />
      )}

      {/* Empty / Ready State when no result yet and not loading */}
      {!result && !loading && !generalError && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/40 p-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 mb-3">
            <SparklesIcon className="w-5 h-5 text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Ready to analyze</h4>
          <p className="mt-1 text-xs text-slate-400 max-w-md mx-auto">
            Enter payment and customer information above or pick a quick test scenario to generate a calibrated recovery recommendation.
          </p>
        </div>
      )}
    </section>
  );
}
