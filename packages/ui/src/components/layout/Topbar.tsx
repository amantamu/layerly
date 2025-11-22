// Visual reference for aesthetic: /mnt/data/1e6e48cd-2c6f-43d0-9ab2-13eb77b155e5.png

"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TopbarProps {
  title?: string;
  className?: string;
}

export function Topbar({ title, className }: TopbarProps) {
  return (
    <header
      className={cn(
        "heavy-border heavy-shadow flex items-center justify-between bg-white px-4 py-3 md:px-6",
        "rounded-b-[var(--radius-sm)]",
        className
      )}
      role="banner"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          {/* TODO: wire real breadcrumbs when routing is finalized */}
          Dashboard
        </span>
        <span className="text-lg font-semibold font-display">{title ?? "Layerly"}</span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          aria-label="Search"
          className="neo-button flex h-9 w-9 items-center justify-center bg-[var(--color-yellow)] hover:brightness-95 transition"
        >
          <span className="text-sm">⌕</span>
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="neo-button relative flex h-9 w-9 items-center justify-center bg-[var(--color-blue)] hover:brightness-95 transition"
        >
          <span className="text-sm">!</span>
          {/* TODO: notification count from server */}
          <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-pink)] text-[10px] font-bold text-white heavy-border">
            3
          </span>
        </button>
        <button
          type="button"
          aria-label="Account menu"
          className="neo-button flex h-9 w-20 items-center justify-center bg-white hover:bg-[var(--color-yellow)] transition"
        >
          <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-pink)] text-xs text-white">
            {/* TODO: replace with user initials */}
            LC
          </span>
          <span className="hidden text-xs font-medium md:inline">You</span>
        </button>
      </div>
    </header>
  );
}


