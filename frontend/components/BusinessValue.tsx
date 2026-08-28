import React from "react";
import { TrendingUpIcon, BoltIcon, ShieldCheckIcon } from "./Icons";

export function BusinessValue() {
  const steps = [
    { label: "Failed Payment", desc: "Network or bank decline" },
    { label: "AI Prediction", desc: "Behavioral feature modeling" },
    { label: "Recovery Probability", desc: "Calibrated likelihood %" },
    { label: "Expected Recovery", desc: "Amount × Probability (EV)" },
    { label: "Recommended Action", desc: "Retry / Link / Reminder" },
    { label: "Revenue Recovery", desc: "Maximized bottom line", highlight: true },
  ];

  return (
    <section id="business-value" className="mt-16 pt-10 border-t border-slate-800/80">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          REVENUE IMPACT & VALUE
        </p>
        <h3 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          From Failed Payments to Recovery Opportunities
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          Traditional payment systems treat all declines identically. RecoverAI turns transactional loss into an optimized recovery workflow.
        </p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="mt-10 overflow-x-auto pb-4">
        <div className="min-w-[700px] flex items-center justify-between gap-2 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div
                className={`flex-1 text-center p-3 rounded-xl border transition-all ${
                  step.highlight
                    ? "bg-emerald-950/70 border-emerald-700/60 shadow-lg shadow-emerald-950/40"
                    : "bg-slate-950/80 border-slate-800"
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                  0{idx + 1}
                </span>
                <p
                  className={`text-xs font-bold ${
                    step.highlight ? "text-emerald-300" : "text-white"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <span className="text-blue-500 font-bold text-sm shrink-0 px-0.5">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3 Core Value Propositions */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        
        {/* Value 1 */}
        <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 mb-4">
            <TrendingUpIcon className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">1. Prioritize</h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Focus recovery efforts on the payments with the highest expected value. Rank order transaction queues so operational teams capture maximal revenue per hour.
          </p>
        </div>

        {/* Value 2 */}
        <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 mb-4">
            <BoltIcon className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">2. Personalize</h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Choose recovery actions based on payment and customer context. A temporary timeout triggers a silent retry; an authentication drop gets a frictionless payment link.
          </p>
        </div>

        {/* Value 3 */}
        <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 mb-4">
            <ShieldCheckIcon className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">3. Reduce Waste</h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Avoid repeatedly pursuing payments that have a very low recovery likelihood. Reduce gateway decline fees, preserve customer goodwill, and protect merchant reputation.
          </p>
        </div>

      </div>

    </section>
  );
}
