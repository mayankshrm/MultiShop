"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const typeOptions = [
  { label: "All", value: "" },
  { label: "Physical", value: "physical" },
  { label: "Digital", value: "digital" },
];

const sortOptions = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "asc price" },
  { label: "Price: High to Low", value: "desc price" },
  { label: "Newest First", value: "asc lastUpdated" },
  { label: "Oldest First", value: "desc lastUpdated" },
];

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [activeType, setActiveType] = useState(searchParams.get("type") || "");
  const [activeSort, setActiveSort] = useState(searchParams.get("sort") || "");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const applyParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(name, value);
    else params.delete(name);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleType = (value: string) => {
    setActiveType(value);
    applyParam("type", value);
  };

  const handleSort = (value: string) => {
    setActiveSort(value);
    setSortOpen(false);
    applyParam("sort", value);
  };

  const clearAll = () => {
    setActiveType("");
    setActiveSort("");
    replace(pathname);
  };

  // Close sort popover on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeCount = (activeType ? 1 : 0) + (activeSort ? 1 : 0);
  const activeSortLabel = sortOptions.find((o) => o.value === activeSort)?.label || "Relevance";
  const typeIndex = typeOptions.findIndex((o) => o.value === activeType);

  // Cycle to next type on each tap
  const cycleType = () => {
    const next = typeOptions[(typeIndex + 1) % typeOptions.length];
    handleType(next.value);
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          DESKTOP TOOLBAR  (md and above)
      ═══════════════════════════════════════ */}
      <div className="hidden md:flex items-center justify-between mt-6 mb-1 gap-4">

        {/* Segmented type control */}
        <div className="flex items-center bg-white rounded-xl border border-surface-muted p-1 gap-0.5 shadow-sm">
          {typeOptions.map((opt) => {
            const isActive = activeType === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleType(opt.value)}
                className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-lama text-white shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Right side: sort dropdown + clear */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <label className="text-[10px] font-bold tracking-widest text-ink-faint uppercase mr-2">
              Sort
            </label>
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none bg-white border border-surface-muted rounded-xl text-xs font-semibold text-ink pl-3 pr-8 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-lama/30 focus:border-lama transition-all shadow-sm"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs font-semibold text-lama hover:text-lama-dark transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE — minimal two-pill bar
      ═══════════════════════════════════════ */}
      <div className="flex md:hidden items-center gap-2 mt-4 mb-1">

        {/* Type pill — tapping cycles All → Physical → Digital → All */}
        <button
          onClick={cycleType}
          className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold border transition-all duration-200 ${
            activeType
              ? "bg-lama text-white border-lama"
              : "bg-white text-ink-muted border-surface-muted"
          }`}
        >
          {/* tag icon */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          {typeOptions.find((o) => o.value === activeType)?.label ?? "All"}
        </button>

        {/* Sort pill — tapping opens a tiny popover */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen((o) => !o)}
            className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-semibold border transition-all duration-200 ${
              activeSort
                ? "bg-lama text-white border-lama"
                : "bg-white text-ink-muted border-surface-muted"
            }`}
          >
            {/* sort icon */}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="9" y2="18" />
            </svg>
            {activeSortLabel === "Relevance" ? "Sort" : activeSortLabel}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Popover */}
          {sortOpen && (
            <div className="absolute top-11 left-0 z-30 bg-white rounded-2xl shadow-modal border border-surface-muted py-1.5 min-w-[180px] animate-slide-down">
              {sortOptions.map((opt) => {
                const isActive = activeSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSort(opt.value)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-lama font-semibold bg-lama-light"
                        : "text-ink-muted hover:text-ink hover:bg-surface-soft"
                    }`}
                  >
                    {opt.label}
                    {isActive && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear — only visible when a filter is active */}
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="ml-auto flex items-center gap-1 h-9 px-3 rounded-full text-xs font-semibold text-ink-muted border border-surface-muted bg-white"
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear
          </button>
        )}

      </div>
    </>
  );
};

export default Filter;
