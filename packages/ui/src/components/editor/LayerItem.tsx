"use client";

import * as React from "react";
import type { TextLayer } from "@layerly/types";
import { Input } from "../input";
import { Button } from "../button";
import { cn } from "../../lib/utils";

interface LayerItemProps {
  layer: TextLayer;
  onUpdate: (updates: Partial<TextLayer>) => void;
  onDelete: () => void;
}

export function LayerItem({ layer, onUpdate, onDelete }: LayerItemProps) {
  return (
    <div className="neo-card bg-white p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Layer: {layer.id.slice(0, 8)}
        </h3>
        <Button
          type="button"
          size="sm"
          onClick={onDelete}
          className="neo-button bg-[var(--color-pink)] text-white text-xs px-2 py-1"
        >
          Delete
        </Button>
      </div>

      {/* Text input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide">
          Text
        </label>
        <Input
          value={layer.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="neo-button border-2 border-black"
          placeholder="Enter text..."
        />
      </div>

      {/* Color picker */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide">
          Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={layer.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="h-10 w-20 cursor-pointer border-2 border-black rounded"
          />
          <Input
            value={layer.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="neo-button border-2 border-black flex-1"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Font size slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide">
            Font Size
          </label>
          <span className="text-xs font-semibold">{layer.size}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="120"
          value={layer.size}
          onChange={(e) => onUpdate({ size: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-blue)]"
        />
      </div>

      {/* Style toggles */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide">
          Style
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => onUpdate({ bold: !layer.bold })}
            className={cn(
              "neo-button flex-1 text-xs",
              layer.bold
                ? "bg-[var(--color-yellow)]"
                : "bg-white hover:bg-neutral-100"
            )}
          >
            <strong>Bold</strong>
          </Button>
          <Button
            type="button"
            onClick={() => onUpdate({ italic: !layer.italic })}
            className={cn(
              "neo-button flex-1 text-xs italic",
              layer.italic
                ? "bg-[var(--color-yellow)]"
                : "bg-white hover:bg-neutral-100"
            )}
          >
            Italic
          </Button>
          <Button
            type="button"
            onClick={() => onUpdate({ outline: !layer.outline })}
            className={cn(
              "neo-button flex-1 text-xs",
              layer.outline
                ? "bg-[var(--color-yellow)]"
                : "bg-white hover:bg-neutral-100"
            )}
          >
            Outline
          </Button>
        </div>
      </div>

      {/* Timing display */}
      <div className="space-y-2 pt-2 border-t-2 border-black">
        <label className="text-xs font-semibold uppercase tracking-wide">
          Timing
        </label>
        <div className="text-xs space-y-1">
          <div>
            Start: {Math.floor(layer.start)}s - End: {Math.floor(layer.end)}s
          </div>
          <div>
            Duration: {Math.floor(layer.end - layer.start)}s
          </div>
        </div>
      </div>
    </div>
  );
}

