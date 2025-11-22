"use client";

import * as React from "react";
import type { TextLayer } from "@layerly/types";
import { cn } from "../../lib/utils";

interface CanvasProps {
  videoUrl: string;
  textLayers: TextLayer[];
  currentTime: number;
  onSelectLayer: (layerId: string) => void;
  onUpdatePosition: (layerId: string, x: number, y: number) => void;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export function Canvas({
  videoUrl,
  textLayers,
  currentTime,
  onSelectLayer,
  onUpdatePosition,
  onTimeUpdate,
  onDurationChange,
  videoRef: externalVideoRef,
}: CanvasProps) {
  const internalVideoRef = React.useRef<HTMLVideoElement>(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const [isDragging, setIsDragging] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Sync video currentTime with store
  React.useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoRef]);

  // Handle video time updates
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !onTimeUpdate) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (onDurationChange) {
        onDurationChange(video.duration);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef, onTimeUpdate, onDurationChange]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    layerId: string,
    layerX: number,
    layerY: number
  ) => {
    e.stopPropagation();
    setIsDragging(layerId);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left - (layerX / 100) * rect.width,
        y: e.clientY - rect.top - (layerY / 100) * rect.height,
      });
    }
    onSelectLayer(layerId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragStart.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragStart.y) / rect.height) * 100;

    // Clamp to 0-100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    onUpdatePosition(isDragging, clampedX, clampedY);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setDragStart(null);
  };

  // Filter visible layers based on current time
  const visibleLayers = textLayers.filter(
    (layer) => currentTime >= layer.start && currentTime <= layer.end
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden"
      style={{ aspectRatio: "16/9" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        muted
        playsInline
      />

      {/* Text overlays */}
      {visibleLayers.map((layer) => {
        const isSelected = isDragging === layer.id;
        return (
          <div
            key={layer.id}
            className={cn(
              "absolute cursor-move select-none",
              isSelected && "ring-2 ring-[var(--color-yellow)] ring-offset-2"
            )}
            style={{
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: "translate(-50%, -50%)",
              fontSize: `${layer.size}px`,
              color: layer.color,
              fontWeight: layer.bold ? "bold" : "normal",
              fontStyle: layer.italic ? "italic" : "normal",
              WebkitTextStroke: layer.outline ? "2px black" : "none",
              textShadow: layer.outline
                ? "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black"
                : "none",
              whiteSpace: "nowrap",
            }}
            onMouseDown={(e) => handleMouseDown(e, layer.id, layer.x, layer.y)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLayer(layer.id);
            }}
          >
            {layer.text}
          </div>
        );
      })}
    </div>
  );
}

