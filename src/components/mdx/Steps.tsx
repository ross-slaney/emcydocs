import type { ReactNode } from "react";

interface StepsProps {
  children: ReactNode;
}

export default function Steps({ children }: StepsProps) {
  return <div className="emcydocs-steps">{children}</div>;
}

interface StepProps {
  title: string;
  children: ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="emcydocs-step">
      <div className="emcydocs-step-indicator">
        <div className="emcydocs-step-dot" />
        <div className="emcydocs-step-line" />
      </div>
      <div className="emcydocs-step-content">
        <h4 className="emcydocs-step-title">{title}</h4>
        <div className="emcydocs-step-body">{children}</div>
      </div>
    </div>
  );
}
