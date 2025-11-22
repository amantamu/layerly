"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, Header } from "@layerly/ui/dashboard";
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
    <div className="flex min-h-screen">
      <Sidebar
        navItems={navItems}
        currentPath={pathname}
        LinkComponent={Link as any}
      />

      <main className="flex-1">
        <Header title="Dashboard" LinkComponent={Link as any} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
