import React, { useState } from "react";
import { InformationCircleIcon, ExclamationTriangleIcon } from "./Icons";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  step?: string;
  placeholder?: string;
  tooltip?: string;
  error?: string | null;
  required?: boolean;
  prefix?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = "text",
  min,
  step,
  placeholder,
  tooltip,
  error,
  required,
  prefix,
}: InputFieldProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-blue-400">*</span>}
        </label>
        {tooltip && (
          <div className="relative flex items-center">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-0.5"
              aria-label={`Info about ${label}`}
            >
              <InformationCircleIcon className="w-3.5 h-3.5" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 bottom-full mb-1.5 w-56 rounded-lg bg-slate-900 border border-slate-700 p-2.5 text-[11px] leading-snug text-slate-200 shadow-xl z-20 pointer-events-none">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative rounded-lg shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-mono text-sm">
            {prefix}
          </div>
        )}
        <input
          type={type}
          min={min}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-slate-950/90 py-2.5 text-sm text-white placeholder-slate-500 font-mono transition-all outline-none focus:ring-2 ${
            prefix ? "pl-7 pr-3.5" : "px-3.5"
          } ${
            error
              ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20 bg-red-950/10"
              : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-700"
          }`}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-medium">
          <ExclamationTriangleIcon className="w-3 h-3 text-red-400 shrink-0" />
          <span>{error}</span>
        </p>
      ) : tooltip ? (
        <p className="mt-1 text-[11px] text-slate-400 truncate">{tooltip}</p>
      ) : null}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  tooltip?: string;
  error?: string | null;
  required?: boolean;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  tooltip,
  error,
  required,
}: SelectFieldProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-blue-400">*</span>}
        </label>
        {tooltip && (
          <div className="relative flex items-center">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-0.5"
              aria-label={`Info about ${label}`}
            >
              <InformationCircleIcon className="w-3.5 h-3.5" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 bottom-full mb-1.5 w-56 rounded-lg bg-slate-900 border border-slate-700 p-2.5 text-[11px] leading-snug text-slate-200 shadow-xl z-20 pointer-events-none">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative rounded-lg shadow-sm">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-slate-950/90 px-3.5 py-2.5 text-sm text-white transition-all outline-none focus:ring-2 appearance-none cursor-pointer ${
            error
              ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20 bg-red-950/10"
              : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-700"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error ? (
        <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1 font-medium">
          <ExclamationTriangleIcon className="w-3 h-3 text-red-400 shrink-0" />
          <span>{error}</span>
        </p>
      ) : tooltip ? (
        <p className="mt-1 text-[11px] text-slate-400 truncate">{tooltip}</p>
      ) : null}
    </div>
  );
}
