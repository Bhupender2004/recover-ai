import React from "react";
import { SparklesIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/20">
                <SparklesIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Recover<span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              AI-powered payment recovery intelligence and decision engine.
            </p>
          </div>

          {/* Links & Attribution */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a
              href="https://github.com/Bhupender2004/recover-ai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="/recoverai-business-value.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              Business Value (PDF)
            </a>
            <a
              href="https://recover-ai-api-dfat.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              API Documentation (Swagger)
            </a>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
              Built for Hackathon Demo
            </span>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} RecoverAI. All rights reserved. Intelligent Payment Recovery Decision Infrastructure.
        </div>
      </div>
    </footer>
  );
}
