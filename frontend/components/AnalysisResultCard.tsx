import React from "react";
import { ActionBadge } from "./ActionBadge";
import { SparklesIcon, InformationCircleIcon, ChartBarIcon, CurrencyRupeeIcon, BoltIcon } from "./Icons";

export interface AnalysisResult {
  payment_id: string;
  amount: number;
  recovery_probability: number;
  expected_recovery_value: number;
  recommended_action: string;
  confidence: string;
  reason: string;
}

export interface DecisionContext {
  payment_method: string;
  failure_reason: string;
  customer_lifetime_value: number;
  previous_payment_count: number;
  previous_success_count: number;
  previous_failure_count: number;
  previous_average_amount: number;
  recent_failure_count: number;
}

interface AnalysisResultCardProps {
  result: AnalysisResult;
  context?: DecisionContext;
}

export function AnalysisResultCard({ result, context }: AnalysisResultCardProps) {
  const probabilityPct = Math.round(result.recovery_probability * 1000) / 10;
  const probabilityFormatted = `${probabilityPct.toFixed(1)}%`;

  // Color mapping based on probability & action
  const getProbabilityColor = (prob: number) => {
    if (prob >= 0.8) return "from-emerald-500 to-teal-400";
    if (prob >= 0.6) return "from-blue-500 to-cyan-400";
    if (prob >= 0.4) return "from-amber-500 to-yellow-400";
    return "from-slate-500 to-slate-400";
  };

  const getConfidenceBadge = (confidence: string) => {
    const norm = confidence.toLowerCase();
    if (norm === "high") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 shadow-sm">
          High Confidence
        </span>
      );
    }
    if (norm === "medium") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/70 text-blue-300 border border-blue-800/60 shadow-sm">
          Medium Confidence
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-800/60 shadow-sm">
        Low Confidence
      </span>
    );
  };

  // Calculate historical success rate
  const successRate =
    context && context.previous_payment_count > 0
      ? Math.round((context.previous_success_count / context.previous_payment_count) * 100)
      : null;

  return (
    <div className="mt-8 rounded-2xl border border-blue-900/60 bg-gradient-to-b from-slate-900/95 via-slate-950/90 to-blue-950/20 p-6 sm:p-8 shadow-2xl shadow-blue-950/30 transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <SparklesIcon className="w-4 h-4 text-blue-400" />
            <span>AI ANALYSIS COMPLETE</span>
          </div>
          <h4 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Recovery Recommendation
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Target Payment ID: <span className="font-mono text-slate-200 font-medium">{result.payment_id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {getConfidenceBadge(result.confidence)}
        </div>
      </div>

      {/* 3 Main Result Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        
        {/* Recovery Probability */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ChartBarIcon className="w-4 h-4 text-blue-400" />
              Recovery Probability
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold font-mono text-white">
            {probabilityFormatted}
          </p>
          
          {/* Visual Progress Bar */}
          <div className="mt-3 w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className={`h-full bg-gradient-to-r ${getProbabilityColor(result.recovery_probability)} transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(Math.max(result.recovery_probability * 100, 3), 100)}%` }}
            />
          </div>
        </div>

        {/* Expected Recovery Value */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <CurrencyRupeeIcon className="w-4 h-4 text-emerald-400" />
              Expected Recovery
            </span>
          </div>
          <p className="mt-3 text-3xl font-extrabold font-mono text-emerald-400">
            ₹{result.expected_recovery_value.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="mt-2.5 text-[11px] text-slate-400 font-mono">
            Amount: ₹{result.amount.toLocaleString("en-IN")} × {probabilityFormatted}
          </p>
        </div>

        {/* Recommended Action */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BoltIcon className="w-4 h-4 text-amber-400" />
            Recommended Action
          </span>
          <div className="mt-3">
            <ActionBadge action={result.recommended_action} size="lg" />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Automated Next-Best Step
          </p>
        </div>

      </div>

      {/* Why RecoverAI Recommends This */}
      <div className="mt-6 rounded-xl border border-blue-900/40 bg-blue-950/30 p-5">
        <div className="flex items-center gap-2">
          <InformationCircleIcon className="w-4 h-4 text-blue-400" />
          <h5 className="text-sm font-semibold text-blue-300">
            Why RecoverAI recommends this
          </h5>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-200 font-normal">
          &ldquo;{result.reason}&rdquo;
        </p>
      </div>

      {/* Decision Context Breakdown */}
      {context && (
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Decision Context Summary
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/70">
              <span className="text-slate-400 block mb-0.5">Failure Factor</span>
              <span className="font-medium text-slate-200 capitalize">
                {context.failure_reason.replace(/_/g, " ")}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/70">
              <span className="text-slate-400 block mb-0.5">Customer Success Rate</span>
              <span className="font-medium text-slate-200">
                {successRate !== null ? `${successRate}% (${context.previous_success_count}/${context.previous_payment_count})` : "N/A"}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/70">
              <span className="text-slate-400 block mb-0.5">Customer LTV</span>
              <span className="font-medium text-slate-200 font-mono">
                ₹{Number(context.customer_lifetime_value).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/70">
              <span className="text-slate-400 block mb-0.5">Payment Method</span>
              <span className="font-medium text-slate-200 uppercase">
                {context.payment_method}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
