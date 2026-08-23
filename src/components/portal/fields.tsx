import type { ReactNode } from "react";
import { inputClass } from "@/lib/portal/form-utils";

export function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function PolicySelect({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field label={label} htmlFor={`policy-${label}`}>
      <select
        id={`policy-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={inputClass}
      >
        <option value="not_specified">Not specified</option>
        <option value="allowed">Allowed</option>
        <option value="not_allowed">Not allowed</option>
        <option value="upon_request">Upon request</option>
      </select>
    </Field>
  );
}

export function PanelTitle({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}




