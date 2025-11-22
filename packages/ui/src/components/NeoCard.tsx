import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "../lib/utils";

export interface NeoCardProps
  extends React.ComponentPropsWithoutRef<typeof Card> {}

export function NeoCard({ className, ...props }: NeoCardProps) {
  return (
    <Card
      className={cn(
        "neo-card border-4 border-black bg-[var(--color-white)]",
        className
      )}
      {...props}
    />
  );
}

export {
  CardHeader as NeoCardHeader,
  CardTitle as NeoCardTitle,
  CardDescription as NeoCardDescription,
  CardContent as NeoCardContent,
  CardFooter as NeoCardFooter,
};


