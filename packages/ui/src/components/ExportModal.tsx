"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import { cn } from "../lib/utils";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  creditCost: number;
  currentCredits: number;
}

export function ExportModal({
  isOpen,
  onClose,
  onConfirm,
  creditCost,
  currentCredits,
}: ExportModalProps) {
  const [isExporting, setIsExporting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isExporting) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsExporting(false);
              setProgress(0);
              onConfirm();
              onClose();
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isExporting, onConfirm, onClose]);

  const canAfford = currentCredits >= creditCost;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neo-card bg-white border-4 border-black max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Export Video
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-600">
            {isExporting
              ? "Exporting your video..."
              : "Ready to export your video with all layers?"}
          </DialogDescription>
        </DialogHeader>

        {!isExporting ? (
          <>
            <div className="space-y-3 py-4">
              <div className="neo-card bg-[var(--color-blue)]/10 p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Credit Cost:</span>
                  <span className="font-bold text-lg">{creditCost} credits</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Your Credits:</span>
                  <span
                    className={cn(
                      "font-bold",
                      canAfford ? "text-green-600" : "text-[var(--color-pink)]"
                    )}
                  >
                    {currentCredits} credits
                  </span>
                </div>
                {!canAfford && (
                  <div className="text-xs text-[var(--color-pink)] font-semibold mt-2">
                    ⚠️ Insufficient credits. Please purchase more credits.
                  </div>
                )}
              </div>

              <div className="text-xs text-neutral-600 space-y-1">
                <p>• Export will include all text layers</p>
                <p>• Estimated processing time: 2-5 minutes</p>
                <p>• TODO: Connect to backend rendering service</p>
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                onClick={onClose}
                className="neo-button bg-white hover:bg-neutral-100"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => setIsExporting(true)}
                disabled={!canAfford}
                className="neo-button bg-[var(--color-yellow)] hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Export
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Progress:</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden border-2 border-black">
                <div
                  className="h-full bg-[var(--color-blue)] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-neutral-600 text-center">
              Please wait while we process your video...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

