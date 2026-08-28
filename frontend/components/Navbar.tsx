"use client";

import React from "react";
import { SparklesIcon } from "./Icons";

export function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20 ring-1 ring-white/20">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Recover<span className="text-blue-400">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60 uppercase tracking-wider">
                v1.0 Engine
              </span>
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo("overview")}
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => scrollTo("analyzer")}
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            Recovery Intelligence
          </button>
          <button
            onClick={() => scrollTo("prioritized")}
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            Payments Queue
          </button>
          <button
            onClick={() => scrollTo("who-benefits")}
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            Who Benefits
          </button>
          <button
            onClick={() => scrollTo("business-value")}
            className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            Analytics & Value
          </button>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-200">System Operational</span>
          </div>

          <a
            href="https://github.com/Bhupender2004/recover-ai"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>

      </div>
    </header>
  );
}
