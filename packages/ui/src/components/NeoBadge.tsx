import * as React from "react";

import { Badge, type BadgeProps } from "./ui/badge";
import { cn } from "../lib/utils";

export interface NeoBadgeProps extends BadgeProps {}

export function NeoBadge({ className, ...props }: NeoBadgeProps) {
  return (
    <Badge
      className={cn(
        "neo-card inline-flex items-center bg-[var(--color-yellow)] px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        className
      )}
      {...props}
    />
  );
}


