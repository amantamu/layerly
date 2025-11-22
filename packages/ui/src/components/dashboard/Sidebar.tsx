import * as React from "react";
import { Button } from "../button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../sheet";
import { Settings, Menu } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface SidebarProps {
  navItems: NavItem[];
  currentPath?: string;
  user?: {
    name: string;
    initials: string;
    plan?: string;
  };
  accountHref?: string;
  brandingHref?: string;
  brandingLabel?: string;
  LinkComponent?: React.ElementType<{ href: string; className?: string; children?: React.ReactNode; [key: string]: any }>;
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({
  navItems,
  currentPath,
  user = { name: "John Doe", initials: "JD", plan: "Free Plan" },
  accountHref = "/dashboard/account",
  brandingHref = "/dashboard",
  brandingLabel = "LAYERLY",
  LinkComponent = "a",
  isMobile = false,
  onNavigate,
}: SidebarProps) {
  const NavLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
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

    const linkProps = {
      href: item.href,
      className: linkClassName,
      "aria-current": isActive ? ("page" as const) : undefined,
      onClick: onNavigate,
    };

    if (isMobile) {
      return (
        <SheetClose asChild>
          <LinkComponent {...linkProps}>{linkContent}</LinkComponent>
        </SheetClose>
      );
    }

    return <LinkComponent {...linkProps}>{linkContent}</LinkComponent>;
  };

  const AccountLink = ({ children, ...props }: React.PropsWithChildren<{ href: string; className?: string }>) => {
    if (isMobile) {
      return (
        <SheetClose asChild>
          <LinkComponent {...props}>{children}</LinkComponent>
        </SheetClose>
      );
    }
    return <LinkComponent {...props}>{children}</LinkComponent>;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Main navigation">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath?.startsWith(item.href) ?? false;

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
            <span className="text-sm font-bold text-white">{user.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">
              {user.name}
            </p>
            {user.plan && (
              <p className="text-xs text-neutral-600">{user.plan}</p>
            )}
          </div>
        </div>
        <AccountLink
          href={accountHref}
          className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
        >
          <Settings className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Manage Account</span>
        </AccountLink>
      </div>
    </div>
  );
}

export interface MobileSidebarProps extends SidebarProps {
  trigger?: React.ReactNode;
}

export function MobileSidebar({
  navItems,
  currentPath,
  user,
  accountHref,
  brandingHref,
  brandingLabel,
  LinkComponent,
  trigger,
}: MobileSidebarProps) {
  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="neo-button bg-white hover:bg-[var(--color-yellow)] h-10 w-10"
      aria-label="Open navigation menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger || defaultTrigger}</SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] p-0 border-4 border-black heavy-shadow bg-white"
      >
        <div className="flex h-full flex-col">
          {/* Branding Header */}
          <div className="border-b-4 border-black px-6 py-5 heavy-shadow bg-[var(--color-yellow)]">
            <SheetClose asChild>
              <LinkComponent
                href={brandingHref}
                className="flex items-center gap-2"
                aria-label="Layerly Home"
              >
                <span className="text-xl font-bold font-display uppercase tracking-wider">
                  {brandingLabel}
                </span>
              </LinkComponent>
            </SheetClose>
          </div>
          <Sidebar
            navItems={navItems}
            currentPath={currentPath}
            user={user}
            accountHref={accountHref}
            LinkComponent={LinkComponent}
            isMobile={true}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

