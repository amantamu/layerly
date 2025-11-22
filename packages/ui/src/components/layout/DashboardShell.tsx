"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { Topbar } from "./Topbar";

export interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  items?: SidebarItem[];
  className?: string;
}

export function DashboardShell({
  children,
  title,
  items = [],
  className,
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen bg-[var(--color-blue)]/10",
        "text-black",
        className
      )}
    >
      <Sidebar items={items} />
      <div className="flex min-h-screen flex-1 flex-col md:pl-0">
        <div className="px-4 pt-14 md:px-8 md:pt-6">
          {/* TODO: add auth guard + user context before rendering shell */}
          <Topbar title={title} />
        </div>
        <main className="page-root">
          <div className="page-container pb-12">{children}</div>
        </main>
      </div>
    </div>
  );
}


