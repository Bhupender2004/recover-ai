import React from "react";
import { SparklesIcon, CheckCircleIcon, ArrowRightIcon } from "./Icons";

export function WhoBenefits() {
  return (
    <section id="who-benefits" className="mt-16 pt-10 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>STAKEHOLDER VALUE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Who Benefits From RecoverAI?
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          RecoverAI is primarily built for businesses that process payments at scale, while customers benefit indirectly through a smarter and less frustrating payment recovery experience.
        </p>
      </div>

      {/* 2 Beneficiary Cards */}
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* CARD 1 — PRIMARY BENEFICIARY: FOR BUSINESSES */}
        <div className="relative rounded-3xl border border-blue-900/60 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-blue-950/20 p-7 sm:p-9 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-950/80 text-blue-400 border border-blue-800/60 uppercase tracking-wider shadow-sm">
                Primary Beneficiary
              </span>
              <span className="text-xs font-mono text-slate-400">B2B Decision Engine</span>
            </div>

            <h4 className="text-2xl font-extrabold text-white">
              For Businesses
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Built specifically for <b>payment operations teams</b>, <b>fintech companies</b>, <b>e-commerce platforms</b>, <b>SaaS/subscription providers</b>, <b>marketplaces</b>, and digital merchants processing large payment volumes.
            </p>

            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-blue-950 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">1. Recover More Revenue</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Identify failed payments with higher recovery potential and capture previously leaked revenue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-blue-950 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">2. Prioritize Recovery Efforts</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Rank failed payments based on recovery probability and expected recovery value (EV).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-blue-950 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">3. Make Better Decisions</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Recommend whether the business should retry, send a payment link, remind, escalate, or take no action.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-blue-950 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">4. Reduce Wasted Effort</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Avoid repeatedly pursuing payments that have very low recovery probability, saving gateway fees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-blue-950 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">5. Scale Recovery Operations</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Use an API-driven decision engine instead of manually triaging thousands of failed payment logs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 — SECONDARY BENEFICIARY: FOR CUSTOMERS */}
        <div className="relative rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-emerald-950/15 p-7 sm:p-9 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase tracking-wider shadow-sm">
                Indirect Benefit
              </span>
              <span className="text-xs font-mono text-slate-400">End-User Experience</span>
            </div>

            <h4 className="text-2xl font-extrabold text-white">
              For Customers
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Customers are <b>not the direct users</b> of RecoverAI. Instead, they experience a smoother recovery process orchestrated by the merchant&apos;s intelligent intervention.
            </p>

            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-emerald-950 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">1. Fewer Unnecessary Retries</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Customers are less likely to experience repetitive surprise bank debit attempts or frozen card limits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-emerald-950 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">2. More Relevant Recovery Actions</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    Different failure situations trigger tailored recovery paths rather than blunt generic dunning emails.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-emerald-950 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">3. Easier Payment Recovery</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    For 3DS drops or expired cards, customers receive convenient 1-click update payment links.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-1 rounded-md bg-emerald-950 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">4. Better Payment Experience</h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    The overall recovery process becomes targeted, respectful, and significantly less frustrating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Representation Diagram */}
      <div className="mt-12 rounded-2xl border border-slate-800/90 bg-slate-950/80 p-6 sm:p-8 shadow-inner">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
          RecoverAI Value Flow Diagram
        </p>

        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Top Node */}
          <div className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-blue-200" />
            <span>RECOVERAI DECISION ENGINE</span>
          </div>

          {/* Fork Lines */}
          <div className="w-full max-w-lg flex items-center justify-between relative my-3">
            <div className="h-6 w-0.5 bg-slate-700 mx-auto absolute inset-x-0 -top-3" />
            <div className="w-full border-t-2 border-slate-700 mt-3" />
          </div>

          {/* 2 Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-2">
            {/* Left Branch */}
            <div className="rounded-xl border border-blue-800/60 bg-blue-950/40 p-4 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-blue-400 block mb-1">
                Primary User
              </span>
              <p className="text-base font-extrabold text-white">BUSINESS</p>
              <div className="mt-3 pt-3 border-t border-blue-900/60 text-xs text-slate-300 space-y-1.5 text-left">
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">&bull;</span> Better prioritization
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">&bull;</span> Higher recovery potential
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">&bull;</span> Less wasted effort & fees
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span> Revenue recovery
                </p>
              </div>
            </div>

            {/* Right Branch */}
            <div className="rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-4 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 block mb-1">
                Indirect Benefit
              </span>
              <p className="text-base font-extrabold text-white">CUSTOMER</p>
              <div className="mt-3 pt-3 border-t border-emerald-900/60 text-xs text-slate-300 space-y-1.5 text-left">
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span> Better payment experience
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span> Relevant recovery actions
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">&bull;</span> Fewer unnecessary retries
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-blue-400 font-bold">&bull;</span> Easier recovery flow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Explanation PDF CTA */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <a
          href="/recoverai-business-value.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-blue-500/60 font-semibold text-sm shadow-md transition-all group"
        >
          <svg className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span>How RecoverAI Creates Value (PDF Document)</span>
          <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

    </section>
  );
}
