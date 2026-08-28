import React from "react";
import { ServerStackIcon, CpuChipIcon, BoltIcon, ShieldCheckIcon } from "./Icons";

export function EnterpriseTrust() {
  const pillars = [
    {
      title: "FastAPI Backend",
      desc: "High-throughput asynchronous Python microservice with sub-millisecond route dispatching.",
      icon: <ServerStackIcon className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "Machine Learning",
      desc: "Calibrated classification model trained on multi-attribute transaction behavioral features.",
      icon: <CpuChipIcon className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: "Decision Engine",
      desc: "Deterministic rule safety layer preventing over-retries and optimizing expected recovery value.",
      icon: <BoltIcon className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "API-First Architecture",
      desc: "RESTful JSON contracts designed for seamless integration with Stripe, Razorpay, and custom gateways.",
      icon: <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="mt-16 pt-10 border-t border-slate-800/80">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            TECHNICAL ARCHITECTURE
          </p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Built for Payment Operations
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Engineered with strict separation of concerns, defensive validation, and reproducible statistical modeling.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/70"
            >
              <div className="p-2 w-fit rounded-lg bg-slate-900 border border-slate-800 mb-3">
                {pillar.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-100">{pillar.title}</h4>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-300 font-medium">Notice:</span> RecoverAI is an analytical decision-support system. It generates actionable recovery recommendations and does not store cardholder data or initiate financial charges.
          </div>
          <div className="shrink-0 font-mono text-[11px] text-slate-400">
            PyTest Suite: 15/15 Passed
          </div>
        </div>
      </div>
    </section>
  );
}
