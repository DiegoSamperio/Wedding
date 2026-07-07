"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
};

export function CopyButton({ value, label }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyValue() {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  }

  return (
    <button className="text-button" type="button" onClick={copyValue}>
      {isCopied ? "Copiado" : label}
    </button>
  );
}
