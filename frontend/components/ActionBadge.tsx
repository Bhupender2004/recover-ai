import React from "react";
import { ArrowPathIcon, LinkIcon, BellAlertIcon, ExclamationTriangleIcon, NoSymbolIcon } from "./Icons";

export type RecoveryAction = "RETRY" | "PAYMENT_LINK" | "REMINDER" | "ESCALATE" | "NO_ACTION" | string;

export function ActionBadge({
  action,
  size = "md",
}: {
  action: RecoveryAction;
  size?: "sm" | "md" | "lg";
}) {
  const normalized = action.toUpperCase().replace(/\s+/g, "_");

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-semibold gap-1",
    md: "px-3 py-1.5 text-xs font-bold gap-1.5",
    lg: "px-4 py-2 text-sm font-bold gap-2 tracking-wide",
  }[size];

  switch (normalized) {
    case "RETRY":
      return (
        <span
          className={`inline-flex items-center rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 shadow-sm shadow-emerald-950/50 ${sizeClasses}`}
        >
          <ArrowPathIcon className={size === "lg" ? "w-4 h-4 text-emerald-400" : "w-3.5 h-3.5 text-emerald-400"} />
          <span>RETRY</span>
        </span>
      );

    case "PAYMENT_LINK":
      return (
        <span
          className={`inline-flex items-center rounded-lg bg-blue-950/80 text-blue-300 border border-blue-700/60 shadow-sm shadow-blue-950/50 ${sizeClasses}`}
        >
          <LinkIcon className={size === "lg" ? "w-4 h-4 text-blue-400" : "w-3.5 h-3.5 text-blue-400"} />
          <span>PAYMENT LINK</span>
        </span>
      );

    case "REMINDER":
      return (
        <span
          className={`inline-flex items-center rounded-lg bg-sky-950/80 text-sky-300 border border-sky-700/60 shadow-sm shadow-sky-950/50 ${sizeClasses}`}
        >
          <BellAlertIcon className={size === "lg" ? "w-4 h-4 text-sky-400" : "w-3.5 h-3.5 text-sky-400"} />
          <span>REMINDER</span>
        </span>
      );

    case "ESCALATE":
      return (
        <span
          className={`inline-flex items-center rounded-lg bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-sm shadow-amber-950/50 ${sizeClasses}`}
        >
          <ExclamationTriangleIcon className={size === "lg" ? "w-4 h-4 text-amber-400" : "w-3.5 h-3.5 text-amber-400"} />
          <span>ESCALATE</span>
        </span>
      );

    case "NO_ACTION":
    default:
      return (
        <span
          className={`inline-flex items-center rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 shadow-sm shadow-slate-900/50 ${sizeClasses}`}
        >
          <NoSymbolIcon className={size === "lg" ? "w-4 h-4 text-slate-400" : "w-3.5 h-3.5 text-slate-400"} />
          <span>NO ACTION</span>
        </span>
      );
  }
}
