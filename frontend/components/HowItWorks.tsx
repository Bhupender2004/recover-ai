import React from "react";
import { CreditCardIcon, CpuChipIcon, BoltIcon, ArrowPathIcon } from "./Icons";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Context Ingestion",
      subtitle: "Payment + Customer Context",
      description:
        "Ingests transaction metadata (rail, decline code, amount) combined with historical customer telemetry (LTV, past successes, recent failure frequency).",
      icon: <CreditCardIcon className="w-5 h-5 text-blue-400" />,
    },
    {
      num: "02",
      title: "Machine Learning Inference",
      subtitle: "ML Recovery Prediction",
      description:
        "Extracts engineered features (success ratios, amount vs avg) and feeds a calibrated classification model to predict exact probability of recovery.",
      icon: <CpuChipIcon className="w-5 h-5 text-indigo-400" />,
    },
    {
      num: "03",
      title: "Expected Value Optimization",
      subtitle: "Decision Engine",
      description:
        "Computes Expected Recovery Value (Amount × Probability) and runs rule-guided safety constraints to determine the highest yield intervention.",
      icon: <BoltIcon className="w-5 h-5 text-amber-400" />,
    },
    {
      num: "04",
      title: "Targeted Intervention",
      subtitle: "Recovery Action",
      description:
        "Dispatches prescribed recovery strategy: automated Retry, interactive Payment Link, customer Reminder, human Escalate, or No Action.",
      icon: <ArrowPathIcon className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="mt-16 pt-10 border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          SYSTEM ARCHITECTURE
        </p>
        <h3 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          How RecoverAI Operates
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          End-to-end intelligent payment decision pipeline from failure detection to resolution.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
        {steps.map((step) => (
          <div
            key={step.num}
            className="relative rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                  {step.icon}
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">
                  {step.num}
                </span>
              </div>

              <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-400">
                {step.subtitle}
              </h4>
              <h5 className="text-base font-bold text-white mt-1">
                {step.title}
              </h5>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
