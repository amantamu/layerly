"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";

export interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const renderItems = (mode: "desktop" | "mobile") => (
    <nav
      className={cn(
        "flex flex-col gap-2",
        mode === "desktop" ? "pt-4" : "pt-2",
        "text-sm"
      )}
      aria-label="Primary"
    >
      {items.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname?.startsWith(item.href);

        const baseClasses =
          "group flex items-center justify-start gap-3 rounded-md px-3 py-2 transition-transform";

        const activeClasses =
          "bg-[var(--color-yellow)] border-2 border-black shadow-[2px_2px_0px_var(--color-black)]";

        const inactiveClasses =
          "border border-black bg-white hover:bg-[var(--color-blue)] hover:text-white hover:scale-[1.02]";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              baseClasses,
              isActive ? activeClasses : inactiveClasses,
              "heavy-border",
              isCollapsed && mode === "desktop"
                ? "justify-center px-0"
                : "justify-start"
            )}
          >
            {item.icon && (
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-white text-base">
                {item.icon}
              </span>
            )}
            {(!isCollapsed || mode === "mobile") && (
              <span className="font-semibold">{item.label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside
        className={cn(
          "heavy-border heavy-shadow hidden h-full flex-col bg-[var(--color-yellow)] p-4 md:flex",
          isCollapsed ? "w-20" : "w-72",
          className
        )}
        aria-label="Sidebar navigation"
      >
        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              "text-sm font-bold uppercase tracking-[0.2em]",
              isCollapsed && "sr-only"
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Layerly
          </span>
          <button
            type="button"
            className="neo-button flex h-8 w-8 items-center justify-center bg-white text-xs"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? "»" : "«"}
          </button>
        </div>
        {renderItems("desktop")}
        <div className="mt-auto pt-4 text-[10px] leading-tight text-neutral-800">
          {/* TODO: wire workspace switcher / plan badge */}
          <p className="font-semibold">Workspace</p>
          <p>Layerly Studio</p>
        </div>
      </aside>

      {/* Mobile toggle button (used by DashboardShell) */}
      <DialogPrimitive.Root open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <DialogPrimitive.Trigger asChild>
          <button
            type="button"
            className="neo-button fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center bg-[var(--color-yellow)] text-base md:hidden"
            aria-label="Open navigation menu"
          >
            ☰
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex w-72 max-w-full flex-col bg-[var(--color-yellow)] p-4",
              "heavy-border heavy-shadow"
            )}
            aria-label="Mobile sidebar navigation"
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Layerly
              </span>
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="neo-button flex h-8 w-8 items-center justify-center bg-white text-xs"
                  aria-label="Close navigation menu"
                >
                  ✕
                </button>
              </DialogPrimitive.Close>
            </div>
            {renderItems("mobile")}
            <div className="mt-auto pt-4 text-[10px] leading-tight text-neutral-800">
              <p className="font-semibold">Hint</p>
              <p>Press ESC to close. TODO: add keyboard shortcut hint.</p>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}


