"use client";

import { useState } from "react";

export default function CopyPageButton({
  label = "Copy link",
}: {
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const target = window.location.href;

    try {
      await navigator.clipboard.writeText(target);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy page link", target);
    }
  };

  return (
    <button type="button" className="emcydocs-button" onClick={copy}>
      {copied ? "Copied" : label}
    </button>
  );
}
