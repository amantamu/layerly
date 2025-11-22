"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-[var(--color-yellow)] border-[var(--color-black)]",
    error: "bg-[var(--color-pink)] border-[var(--color-black)]",
    info: "bg-[var(--color-blue)] border-[var(--color-black)]",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 neo-button px-4 py-3 text-sm font-semibold",
        typeStyles[type],
        "animate-in slide-in-from-bottom-5"
      )}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 hover:opacity-70"
          aria-label="Close toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

