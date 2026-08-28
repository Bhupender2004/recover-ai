"use client";

import React, { useState } from "react";
import { ActionBadge } from "./ActionBadge";
import { SparklesIcon } from "./Icons";

interface PrioritizedPayment {
  id: string;
  amount: number;
  amountFormatted: string;
  probability: number;
  probabilityFormatted: string;
  action: string;
  expectedRecovery: string;
  confidence: "High" | "Medium" | "Low";
  method: string;
  reason: string;
}

const PRIORITIZED_DATA: PrioritizedPayment[] = [
  {
    id: "PAY008158",
    amount: 5061,
    amountFormatted: "₹5,061",
    probability: 0.853,
    probabilityFormatted: "85.3%",
    action: "RETRY",
    expectedRecovery: "₹4,317.03",
    confidence: "High",
    method: "UPI",
    reason: "Timeout failure on high-success customer.",
  },
  {
    id: "PAY008916",
    amount: 6247,
    amountFormatted: "₹6,247",
    probability: 0.841,
    probabilityFormatted: "84.1%",
    action: "RETRY",
    expectedRecovery: "₹5,253.73",
    confidence: "High",
    method: "UPI",
    reason: "Temporary network interruption.",
  },
  {
    id: "PAY008608",
    amount: 8910,
    amountFormatted: "₹8,910",
    probability: 0.841,
    probabilityFormatted: "84.1%",
    action: "RETRY",
    expectedRecovery: "₹7,493.31",
    confidence: "High",
    method: "Card",
    reason: "Bank server timeout on repeat buyer.",
  },
  {
    id: "PAY008601",
    amount: 11756,
    amountFormatted: "₹11,756",
    probability: 0.829,
    probabilityFormatted: "82.9%",
    action: "PAYMENT_LINK",
    expectedRecovery: "₹9,745.72",
    confidence: "High",
    method: "Card",
    reason: "3DS step drop-off; fresh flow requested.",
  },
  {
    id: "PAY007942",
    amount: 14200,
    amountFormatted: "₹14,200",
    probability: 0.684,
    probabilityFormatted: "68.4%",
    action: "REMINDER",
    expectedRecovery: "₹9,712.80",
    confidence: "Medium",
    method: "UPI",
    reason: "Insufficient funds on established subscriber.",
  },
  {
    id: "PAY007520",
    amount: 32500,
    amountFormatted: "₹32,500",
    probability: 0.462,
    probabilityFormatted: "46.2%",
    action: "ESCALATE",
    expectedRecovery: "₹15,015.00",
    confidence: "Low",
    method: "Net Banking",
    reason: "High ticket size with repeated recent drops.",
  },
];

export function PrioritizedPaymentsTable() {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredRows = PRIORITIZED_DATA.filter((row) => {
    if (filter === "ALL") return true;
    if (filter === "HIGH") return row.probability >= 0.8;
    if (filter === "ACTION_RETRY") return row.action === "RETRY";
    if (filter === "ACTION_LINK") return row.action === "PAYMENT_LINK";
    return true;
  });

  return (
    <section id="prioritized" className="mt-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>RECOVERY PRIORITIZATION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            AI-Prioritized Payments
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Payments ranked by estimated recovery probability and expected recovery value.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-start sm:self-auto">
          {[
            { key: "ALL", label: "All Queue" },
            { key: "HIGH", label: "High Prob (>80%)" },
            { key: "ACTION_RETRY", label: "Retries" },
            { key: "ACTION_LINK", label: "Payment Links" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === tab.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/90 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Probability</th>
                <th className="px-6 py-4">Recommended Action</th>
                <th className="px-6 py-4 text-right">Expected Recovery</th>
                <th className="px-6 py-4">Confidence</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredRows.map((row) => {
                const isHigh = row.probability >= 0.8;
                return (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-900/50 transition-colors group"
                  >
                    <td className="px-6 py-4.5 font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{row.id}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                          {row.method}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4.5 text-right font-mono font-medium text-slate-200">
                      {row.amountFormatted}
                    </td>

                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                            isHigh
                              ? "bg-emerald-950/70 text-emerald-400 border-emerald-800/50"
                              : "bg-blue-950/70 text-blue-400 border-blue-800/50"
                          }`}
                        >
                          {row.probabilityFormatted}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4.5">
                      <ActionBadge action={row.action} size="sm" />
                    </td>

                    <td className="px-6 py-4.5 text-right font-mono font-semibold text-emerald-400">
                      {row.expectedRecovery}
                    </td>

                    <td className="px-6 py-4.5">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          row.confidence === "High"
                            ? "text-emerald-400 bg-emerald-950/40"
                            : row.confidence === "Medium"
                            ? "text-blue-400 bg-blue-950/40"
                            : "text-amber-400 bg-amber-950/40"
                        }`}
                      >
                        {row.confidence}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
