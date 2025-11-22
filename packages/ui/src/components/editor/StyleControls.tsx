"use client";

import * as React from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../dropdown-menu";
import { cn } from "../../lib/utils";

interface StyleControlsProps {
  onPositionChange: (x: number, y: number) => void;
  onAnimationChange: (animation: string) => void;
  currentAnimation?: string;
}

const positionPresets = [
  { label: "Top", x: 50, y: 10 },
  { label: "Top Center", x: 50, y: 20 },
  { label: "Middle", x: 50, y: 50 },
  { label: "Bottom Center", x: 50, y: 80 },
  { label: "Bottom", x: 50, y: 90 },
  { label: "Top Left", x: 10, y: 10 },
  { label: "Top Right", x: 90, y: 10 },
  { label: "Bottom Left", x: 10, y: 90 },
  { label: "Bottom Right", x: 90, y: 90 },
];

const animationPresets = [
  { value: "none", label: "None" },
  { value: "fade-in", label: "Fade In" },
  { value: "slide-up", label: "Slide Up" },
  { value: "slide-down", label: "Slide Down" },
  { value: "bounce", label: "Bounce" },
  { value: "zoom-in", label: "Zoom In" },
];

export function StyleControls({
  onPositionChange,
  onAnimationChange,
  currentAnimation,
}: StyleControlsProps) {
  return (
    <div className="neo-card bg-white p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Quick Controls
      </h3>

      {/* Position presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide">
          Position Presets
        </label>
        <div className="grid grid-cols-3 gap-2">
          {positionPresets.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              onClick={() => onPositionChange(preset.x, preset.y)}
              className="neo-button bg-white hover:bg-[var(--color-yellow)] text-xs py-2"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Animation presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide">
          Animation
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              className="neo-button w-full bg-white hover:bg-[var(--color-blue)] text-white justify-between"
            >
              <span>
                {animationPresets.find((a) => a.value === currentAnimation)
                  ?.label || "Select Animation"}
              </span>
              <span>▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="neo-card bg-white border-2 border-black">
            {animationPresets.map((preset) => (
              <DropdownMenuItem
                key={preset.value}
                onClick={() => onAnimationChange(preset.value)}
                className={cn(
                  "cursor-pointer px-3 py-2 hover:bg-[var(--color-yellow)]",
                  currentAnimation === preset.value && "bg-[var(--color-yellow)]"
                )}
              >
                {preset.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

