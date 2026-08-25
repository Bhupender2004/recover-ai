"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

type AnalysisResult = {
  payment_id: string;
  amount: number;
  recovery_probability: number;
  expected_recovery_value: number;
  recommended_action: string;
  confidence: string;
  reason: string;
};

export default function Home() {
  const [form, setForm] = useState({
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
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: string,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function analyzePayment() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${API_URL}/api/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_id: form.payment_id,
            amount: Number(form.amount),
            payment_method: form.payment_method,
            failure_reason: form.failure_reason,
            customer_lifetime_value:
              Number(form.customer_lifetime_value),
            previous_payment_count:
              Number(form.previous_payment_count),
            previous_success_count:
              Number(form.previous_success_count),
            previous_failure_count:
              Number(form.previous_failure_count),
            previous_average_amount:
              Number(form.previous_average_amount),
            recent_failure_count:
              Number(form.recent_failure_count),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.detail
            ? JSON.stringify(errorData.detail)
            : "Unable to analyze payment."
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while connecting to RecoverAI."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              RecoverAI
            </h1>

            <p className="text-sm text-slate-400">
              AI-powered payment recovery intelligence
            </p>
          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

            <span className="text-sm text-slate-300">
              System Operational
            </span>

          </div>

        </div>

      </header>


      {/* MAIN */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* HERO */}
        <section className="mb-10">

          <p className="mb-2 text-sm font-medium text-blue-400">
            PAYMENT RECOVERY INTELLIGENCE
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            Recover more revenue with AI.
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            RecoverAI predicts which failed payments are most
            likely to recover and recommends the best recovery
            action.
          </p>

        </section>


        {/* BUSINESS METRICS */}
        <section className="grid gap-5 md:grid-cols-3">

          <MetricCard
            title="Recoverable Revenue"
            value="₹25.39 L"
            description="Potential revenue in test dataset"
          />

          <MetricCard
            title="AI Recovery Rate"
            value="67.69%"
            description="Top 50% AI-prioritized payments"
          />

          <MetricCard
            title="AI Recovery Lift"
            value="+13.68 pp"
            description="vs random prioritization"
          />

        </section>


        {/* ANALYSIS FORM */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-7">

            <p className="text-sm font-medium text-blue-400">
              AI DECISION ENGINE
            </p>

            <h3 className="mt-1 text-2xl font-semibold">
              Analyze a Failed Payment
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Provide payment and customer context. RecoverAI
              will predict recovery probability and recommend
              the next action.
            </p>

          </div>


          {/* ROW 1 */}
          <div className="grid gap-5 md:grid-cols-3">

            <InputField
              label="Payment ID"
              value={form.payment_id}
              onChange={(value) =>
                updateField("payment_id", value)
              }
            />

            <InputField
              label="Payment Amount (₹)"
              type="number"
              value={form.amount}
              onChange={(value) =>
                updateField("amount", value)
              }
            />

            <SelectField
              label="Payment Method"
              value={form.payment_method}
              onChange={(value) =>
                updateField("payment_method", value)
              }
              options={[
                ["upi", "UPI"],
                ["card", "Card"],
                ["netbanking", "Net Banking"],
                ["wallet", "Wallet"],
              ]}
            />

          </div>


          {/* ROW 2 */}
          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <SelectField
              label="Failure Reason"
              value={form.failure_reason}
              onChange={(value) =>
                updateField("failure_reason", value)
              }
              options={[
                ["timeout", "Timeout"],
                [
                  "authentication_failed",
                  "Authentication Failed",
                ],
                [
                  "insufficient_funds",
                  "Insufficient Funds",
                ],
                ["network_error", "Network Error"],
                ["expired_card", "Expired Card"],
                ["card_declined", "Card Declined"],
              ]}
            />

            <InputField
              label="Customer Lifetime Value (₹)"
              type="number"
              value={form.customer_lifetime_value}
              onChange={(value) =>
                updateField(
                  "customer_lifetime_value",
                  value
                )
              }
            />

            <InputField
              label="Previous Payments"
              type="number"
              value={form.previous_payment_count}
              onChange={(value) =>
                updateField(
                  "previous_payment_count",
                  value
                )
              }
            />

          </div>


          {/* ROW 3 */}
          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <InputField
              label="Previous Successful Payments"
              type="number"
              value={form.previous_success_count}
              onChange={(value) =>
                updateField(
                  "previous_success_count",
                  value
                )
              }
            />

            <InputField
              label="Previous Failed Payments"
              type="number"
              value={form.previous_failure_count}
              onChange={(value) =>
                updateField(
                  "previous_failure_count",
                  value
                )
              }
            />

            <InputField
              label="Previous Average Amount (₹)"
              type="number"
              value={form.previous_average_amount}
              onChange={(value) =>
                updateField(
                  "previous_average_amount",
                  value
                )
              }
            />

          </div>


          {/* ROW 4 */}
          <div className="mt-5 max-w-md">

            <InputField
              label="Recent Failure Count"
              type="number"
              value={form.recent_failure_count}
              onChange={(value) =>
                updateField(
                  "recent_failure_count",
                  value
                )
              }
            />

          </div>


          {/* BUTTON */}
          <button
            onClick={analyzePayment}
            disabled={loading}
            className="mt-7 rounded-lg bg-blue-600 px-7 py-3 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Analyzing with AI..."
              : "Analyze Payment"}
          </button>


          {/* ERROR */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4">

              <p className="text-sm font-medium text-red-400">
                Analysis Failed
              </p>

              <p className="mt-1 text-sm text-red-300">
                {error}
              </p>

            </div>
          )}


          {/* AI RESULT */}
          {result && (
            <AnalysisResultCard result={result} />
          )}

        </section>


        {/* PRIORITIZED PAYMENTS */}
        <section className="mt-10">

          <div className="mb-5">

            <p className="text-sm font-medium text-blue-400">
              RECOVERY PRIORITIZATION
            </p>

            <h3 className="mt-1 text-2xl font-semibold">
              AI-Prioritized Payments
            </h3>

            <p className="text-sm text-slate-400">
              Payments ranked by estimated recovery probability.
            </p>

          </div>


          <div className="overflow-hidden rounded-xl border border-slate-800">

            <table className="w-full text-left">

              <thead className="bg-slate-900 text-sm text-slate-400">

                <tr>

                  <th className="px-5 py-4">
                    Payment
                  </th>

                  <th className="px-5 py-4">
                    Amount
                  </th>

                  <th className="px-5 py-4">
                    Probability
                  </th>

                  <th className="px-5 py-4">
                    Recommended Action
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-800">

                <PaymentRow
                  id="PAY008158"
                  amount="₹5,061"
                  probability="85.3%"
                  action="RETRY"
                />

                <PaymentRow
                  id="PAY008916"
                  amount="₹6,247"
                  probability="84.1%"
                  action="RETRY"
                />

                <PaymentRow
                  id="PAY008608"
                  amount="₹8,910"
                  probability="84.1%"
                  action="RETRY"
                />

                <PaymentRow
                  id="PAY008601"
                  amount="₹11,756"
                  probability="82.9%"
                  action="PAYMENT LINK"
                />

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </main>
  );
}


/* ========================================================= */
/* COMPONENTS */
/* ========================================================= */

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />

    </div>
  );
}


function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[][];
}) {
  return (
    <div>

      <label className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
      >

        {options.map(([optionValue, label]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {label}
          </option>
        ))}

      </select>

    </div>
  );
}


function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

    </div>
  );
}


function PaymentRow({
  id,
  amount,
  probability,
  action,
}: {
  id: string;
  amount: string;
  probability: string;
  action: string;
}) {
  return (
    <tr className="bg-slate-950">

      <td className="px-5 py-4 font-medium">
        {id}
      </td>

      <td className="px-5 py-4 text-slate-300">
        {amount}
      </td>

      <td className="px-5 py-4">

        <span className="rounded-full bg-green-950 px-3 py-1 text-sm text-green-400">
          {probability}
        </span>

      </td>

      <td className="px-5 py-4 text-blue-400">
        {action}
      </td>

    </tr>
  );
}


function AnalysisResultCard({
  result,
}: {
  result: AnalysisResult;
}) {
  const probability =
    result.recovery_probability * 100;

  return (
    <div className="mt-8 rounded-2xl border border-blue-900 bg-blue-950/20 p-6">

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <p className="text-sm font-medium text-blue-400">
            AI ANALYSIS COMPLETE
          </p>

          <h4 className="mt-1 text-2xl font-bold">
            Recovery Recommendation
          </h4>

        </div>


        <span className="w-fit rounded-full bg-blue-900/60 px-4 py-2 text-sm font-medium text-blue-300">
          {result.confidence} confidence
        </span>

      </div>


      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <ResultMetric
          label="Recovery Probability"
          value={`${probability.toFixed(2)}%`}
        />

        <ResultMetric
          label="Expected Recovery"
          value={`₹${result.expected_recovery_value.toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2,
            }
          )}`}
        />

        <ResultMetric
          label="Recommended Action"
          value={result.recommended_action}
        />

      </div>


      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">

        <p className="text-sm font-medium text-slate-300">
          Why RecoverAI recommends this
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {result.reason}
        </p>

      </div>

    </div>
  );
}


function ResultMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}