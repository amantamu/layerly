import type { ReactNode } from "react";

import { DashboardShell, type SidebarItem } from "@layerly/ui";
import { DASHBOARD_NAV } from "../../config/nav";
import {
  Home,
  Layers,
  Grid2X2,
  Sparkles,
  Coins,
  Wallet,
  MessageCircle,
  User,
} from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  home: <Home className="h-4 w-4" />,
  layers: <Layers className="h-4 w-4" />,
  grid: <Grid2X2 className="h-4 w-4" />,
  edit: <Sparkles className="h-4 w-4" />,
  "credit-card": <Coins className="h-4 w-4" />,
  wallet: <Wallet className="h-4 w-4" />,
  message: <MessageCircle className="h-4 w-4" />,
  user: <User className="h-4 w-4" />,
};

const sidebarItems: SidebarItem[] = DASHBOARD_NAV.map((item) => ({
  label: item.label,
  href: item.href,
  icon: iconMap[item.icon] ?? null,
}));

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // TODO: add auth guard and redirect unauthenticated users
  return (
    <DashboardShell title="Dashboard" items={sidebarItems}>
      {children}
    </DashboardShell>
  );
}

