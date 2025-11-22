"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@layerly/ui/sheet";
import { Button } from "@layerly/ui/button";
import {
  Layers,
  Grid2X2,
  Sparkles,
  Coins,
  Wallet,
  MessageCircle,
  User,
  Menu,
  Settings,
} from "lucide-react";
import { cn } from "@layerly/ui/lib/utils";

// Navigation items configuration
const navItems = [
  { label: "My Projects", href: "/dashboard/my-projects", icon: Layers },
  { label: "Templates", href: "/dashboard/templates", icon: Grid2X2 },
  { label: "Editor", href: "/dashboard/editor", icon: Sparkles },
  { label: "Credits", href: "/dashboard/credits", icon: Coins },
  { label: "Billing", href: "/dashboard/billing", icon: Wallet },
  { label: "Feedback Lab", href: "/dashboard/feedback-lab", icon: MessageCircle },
  { label: "Account", href: "/dashboard/account", icon: User },
] as const;

interface DashboardSidebarProps {
  isMobile?: boolean;
}

export function DashboardSidebar({ isMobile = false }: DashboardSidebarProps) {
  const pathname = usePathname();

  const NavLink = ({ item, isActive }: { item: typeof navItems[number]; isActive: boolean }) => {
    const Icon = item.icon;
    const linkContent = (
      <>
        <Icon
          className={cn(
            "h-5 w-5 flex-shrink-0",
            isActive ? "text-black" : "text-neutral-700"
          )}
          aria-hidden="true"
        />
        <span>{item.label}</span>
      </>
    );

    const linkClassName = cn(
      "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold transition-colors",
      "border-2 border-transparent",
      isActive
        ? "bg-[var(--color-yellow)] border-l-4 border-l-black border-r-2 border-r-black border-t-2 border-t-black border-b-2 border-b-black shadow-[2px_2px_0_var(--color-black)]"
        : "bg-white hover:bg-[var(--color-blue)]/10 hover:border-black"
    );

    if (isMobile) {
      return (
        <SheetClose asChild>
          <Link
            href={item.href}
            className={linkClassName}
            aria-current={isActive ? "page" : undefined}
          >
            {linkContent}
          </Link>
        </SheetClose>
      );
    }

    return (
      <Link
        href={item.href}
        className={linkClassName}
        aria-current={isActive ? "page" : undefined}
      >
        {linkContent}
      </Link>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Main navigation">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);

            return (
              <li key={item.href}>
                <NavLink item={item} isActive={isActive} />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t-4 border-black p-4 bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-[var(--color-pink)] flex items-center justify-center heavy-border flex-shrink-0">
            <span className="text-sm font-bold text-white">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-neutral-600">Free Plan</p>
          </div>
        </div>
        {isMobile ? (
          <SheetClose asChild>
            <Link
              href="/dashboard/account"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
            >
              <Settings className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Manage Account</span>
            </Link>
          </SheetClose>
        ) : (
          <Link
            href="/dashboard/account"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
          >
            <Settings className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Manage Account</span>
          </Link>
        )}
      </div>
    </div>
  );
}

// Mobile sidebar wrapper with Sheet
export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="neo-button bg-white hover:bg-[var(--color-yellow)] h-10 w-10"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] p-0 border-4 border-black heavy-shadow bg-white"
      >
        <div className="flex h-full flex-col">
          {/* Branding Header */}
          <div className="border-b-4 border-black px-6 py-5 heavy-shadow bg-[var(--color-yellow)]">
            <SheetClose asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                aria-label="Layerly Home"
              >
                <span className="text-xl font-bold font-display uppercase tracking-wider">
                  LAYERLY
                </span>
              </Link>
            </SheetClose>
          </div>
          <DashboardSidebar isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

