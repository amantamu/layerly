import * as React from "react";
import { Button } from "../button";
import { Settings, Coins } from "lucide-react";

export interface HeaderProps {
  title: string;
  credits?: number;
  creditsHref?: string;
  accountHref?: string;
  user?: {
    initials: string;
  };
  LinkComponent?: React.ComponentType<any>;
}

export function Header({
  title,
  credits = 420,
  creditsHref = "/dashboard/credits",
  accountHref = "/dashboard/account",
  user = { initials: "JD" },
  LinkComponent = "a",
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-black heavy-shadow">
      <h1 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight">
        {title}
      </h1>
      
      <div className="flex items-center gap-4">
        {/* Credits Badge */}
        <LinkComponent
          href={creditsHref}
          className="flex items-center gap-2 px-3 py-2 bg-[var(--color-yellow)] rounded-md border-2 border-black hover:shadow-[2px_2px_0_var(--color-black)] transition-shadow cursor-pointer"
        >
          <Coins className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-bold">{credits}</span>
        </LinkComponent>

        {/* User Avatar */}
        <LinkComponent
          href={accountHref}
          className="h-10 w-10 rounded-full bg-[var(--color-pink)] flex items-center justify-center heavy-border cursor-pointer hover:shadow-[2px_2px_0_var(--color-black)] transition-shadow"
        >
          <span className="text-sm font-bold text-white">{user.initials}</span>
        </LinkComponent>

        {/* Settings Icon */}
        <LinkComponent href={accountHref}>
          <Button
            variant="ghost"
            size="icon"
            className="neo-button bg-white hover:bg-[var(--color-blue)]/10 h-10 w-10"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </LinkComponent>
      </div>
    </header>
  );
}

