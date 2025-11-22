"use client";

import * as React from "react";
import type { TextLayer } from "@layerly/types";
import { cn } from "../../lib/utils";

interface TimelineProps {
  duration: number;
  textLayers: TextLayer[];
  currentTime: number;
  selectedLayerId?: string;
  onUpdateTiming: (layerId: string, start: number, end: number) => void;
  onSelectLayer: (layerId: string) => void;
  onSeek: (time: number) => void;
}

export function Timeline({
  duration,
  textLayers,
  currentTime,
  selectedLayerId,
  onUpdateTiming,
  onSelectLayer,
  onSeek,
}: TimelineProps) {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const [draggingHandle, setDraggingHandle] = React.useState<{
    layerId: string;
    type: "start" | "end";
  } | null>(null);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || draggingHandle) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = Math.max(0, Math.min(duration, percentage * duration));
    onSeek(time);
  };

  const handleHandleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    layerId: string,
    type: "start" | "end"
  ) => {
    e.stopPropagation();
    setDraggingHandle({ layerId, type });
  };

  React.useEffect(() => {
    if (!draggingHandle) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const time = percentage * duration;

      const layer = textLayers.find((l) => l.id === draggingHandle.layerId);
      if (!layer) return;

      if (draggingHandle.type === "start") {
        const newStart = Math.max(0, Math.min(time, layer.end - 0.5));
        onUpdateTiming(draggingHandle.layerId, newStart, layer.end);
      } else {
        const newEnd = Math.max(layer.start + 0.5, Math.min(time, duration));
        onUpdateTiming(draggingHandle.layerId, layer.start, newEnd);
      }
    };

    const handleMouseUp = () => {
      setDraggingHandle(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingHandle, duration, textLayers, onUpdateTiming]);

  const getLayerPosition = (layer: TextLayer) => {
    const left = (layer.start / duration) * 100;
    const width = ((layer.end - layer.start) / duration) * 100;
    return { left, width };
  };

  const getTimeLabel = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="neo-card bg-white p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide">
        Timeline
      </div>
      <div
        ref={timelineRef}
        className="relative h-24 cursor-pointer bg-neutral-100 rounded border-2 border-black"
        onClick={handleTimelineClick}
      >
        {/* Time markers */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-l border-neutral-300 relative"
            >
              <div className="absolute left-0 top-0 text-[8px] text-neutral-500 px-1">
                {getTimeLabel(i)}
              </div>
            </div>
          ))}
        </div>

        {/* Current time indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-pink)] z-10"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--color-pink)] border-2 border-black rounded-full" />
        </div>

        {/* Layer blocks */}
        {textLayers.map((layer, index) => {
          const { left, width } = getLayerPosition(layer);
          const isSelected = layer.id === selectedLayerId;
          const colors = [
            "var(--color-yellow)",
            "var(--color-blue)",
            "var(--color-pink)",
          ];
          const color = colors[index % colors.length];

          return (
            <div
              key={layer.id}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-12 rounded border-2 border-black cursor-pointer",
                isSelected && "ring-2 ring-[var(--color-yellow)] ring-offset-1"
              )}
              style={{
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: color,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectLayer(layer.id);
              }}
            >
              {/* Start handle */}
              <div
                className="absolute left-0 top-0 bottom-0 w-2 bg-black cursor-ew-resize hover:bg-[var(--color-pink)]"
                onMouseDown={(e) => handleHandleMouseDown(e, layer.id, "start")}
              />
              {/* End handle */}
              <div
                className="absolute right-0 top-0 bottom-0 w-2 bg-black cursor-ew-resize hover:bg-[var(--color-pink)]"
                onMouseDown={(e) => handleHandleMouseDown(e, layer.id, "end")}
              />
              {/* Layer label */}
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold px-2 truncate">
                {layer.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

