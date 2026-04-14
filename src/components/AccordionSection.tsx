"use client";

import { useState } from "react";

const AccordionSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-surface-muted last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex justify-between items-center py-4 text-left cursor-pointer"
      >
        <span className="text-sm font-semibold text-ink capitalize">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-ink-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          className="pb-4 text-sm text-ink-muted leading-relaxed animate-slide-down"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
};

export default AccordionSection;
