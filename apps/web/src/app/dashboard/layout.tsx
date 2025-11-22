"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, Header, MobileSidebar } from "@layerly/ui/dashboard";
import {
  Layers,
  Grid2X2,
  Sparkles,
  Coins,
  Wallet,
  MessageCircle,
  User,
} from "lucide-react";

const navItems = [
  { label: "My Projects", href: "/dashboard/my-projects", icon: Layers },
  { label: "Templates", href: "/dashboard/templates", icon: Grid2X2 },
  { label: "Editor", href: "/dashboard/editor", icon: Sparkles },
  { label: "Credits", href: "/dashboard/credits", icon: Coins },
  { label: "Billing", href: "/dashboard/billing", icon: Wallet },
  { label: "Feedback Lab", href: "/dashboard/feedback-lab", icon: MessageCircle },
  { label: "Account", href: "/dashboard/account", icon: User },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-blue)]/10">
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:w-[280px] md:flex-col md:fixed md:inset-y-0 md:z-40"
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col flex-1 bg-white heavy-border heavy-shadow">
          {/* Branding Header */}
          <div className="border-b-4 border-black px-6 py-5 heavy-shadow bg-[var(--color-yellow)]">
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
              aria-label="Layerly Home"
            >
              <span className="text-xl font-bold font-display uppercase tracking-wider">
                LAYERLY
              </span>
            </Link>
          </div>
          
          {/* Sidebar Content */}
          <Sidebar
            navItems={navItems}
            currentPath={pathname}
            LinkComponent={Link}
          />
        </div>
      </aside>

      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black heavy-shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="text-lg font-bold font-display uppercase">
            LAYERLY
          </Link>
          <MobileSidebar
            navItems={navItems}
            currentPath={pathname}
            LinkComponent={Link}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-[280px]">
        {/* Mobile top spacing */}
        <div className="md:hidden h-[60px]" />
        
        {/* Dashboard Header */}
        <Header title="Dashboard" LinkComponent={Link} />
        
        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
