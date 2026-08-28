"use client";

import React from "react";
import { ArrowRightIcon, BoltIcon, SparklesIcon } from "./Icons";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="overview" className="relative pt-6 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm shadow-blue-900/30">
          <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>PAYMENT RECOVERY INTELLIGENCE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Recover more revenue <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            with AI.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          RecoverAI predicts which failed payments are most likely to recover and recommends the best recovery action.
        </p>

        {/* CTA & Decision Engine Pill */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollTo("analyzer")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <span>Analyze a Failed Payment</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo("prioritized")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-medium transition-colors"
          >
            <span>View Prioritized Queue</span>
          </button>
        </div>

        {/* Engine Pipeline Mini Badge */}
        <div className="mt-9 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs text-slate-400 shadow-inner">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <BoltIcon className="w-3.5 h-3.5 text-blue-400" />
            AI Decision Engine
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>Predict</span>
            <span className="text-blue-400 font-bold">→</span>
            <span>Prioritize</span>
            <span className="text-blue-400 font-bold">→</span>
            <span className="text-emerald-400 font-semibold">Recover</span>
          </span>
        </div>

      </div>
    </section>
  );
}
