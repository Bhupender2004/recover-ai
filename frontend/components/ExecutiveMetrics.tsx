import React from "react";
import { CurrencyRupeeIcon, ChartBarIcon, TrendingUpIcon } from "./Icons";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  badge?: string;
  badgeType?: "positive" | "info" | "neutral";
  icon: React.ReactNode;
}

function MetricCard({
  title,
  value,
  description,
  badge,
  badgeType = "positive",
  icon,
}: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 shadow-lg shadow-black/20 hover:border-slate-700/80 transition-all duration-300 group">
      {/* Subtle top accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl bg-slate-800/80 text-blue-400 border border-slate-700/50 shadow-inner">
          {icon}
        </div>
        {badge && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight border ${
              badgeType === "positive"
                ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/50"
                : badgeType === "info"
                ? "bg-blue-950/60 text-blue-400 border-blue-800/50"
                : "bg-slate-800/60 text-slate-300 border-slate-700/50"
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <p className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          {value}
        </p>
        <p className="mt-2 text-xs text-slate-400 font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ExecutiveMetrics() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Benchmark Performance
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Dataset: 10,000 Synthetic Transactions
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Recoverable Revenue"
          value="₹25.39 L"
          description="Potential revenue in test dataset"
          badge="High Impact"
          badgeType="positive"
          icon={<CurrencyRupeeIcon className="w-5 h-5" />}
        />

        <MetricCard
          title="AI Recovery Rate"
          value="67.69%"
          description="Top 50% AI-prioritized payments"
          badge="Top Decile"
          badgeType="info"
          icon={<ChartBarIcon className="w-5 h-5" />}
        />

        <MetricCard
          title="AI Recovery Lift"
          value="+13.68 pp"
          description="vs random prioritization"
          badge="Efficiency Gain"
          badgeType="positive"
          icon={<TrendingUpIcon className="w-5 h-5" />}
        />
      </div>
    </section>
  );
}
