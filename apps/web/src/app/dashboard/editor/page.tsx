"use client";

import * as React from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import {
  Canvas,
  Timeline,
  LayerItem,
  StyleControls,
  ExportModal,
  Toast,
  Button,
} from "@layerly/ui";
import { Play, Pause, Save, Download } from "lucide-react";

export default function Editor() {
  const {
    textLayers,
    selectedLayerId,
    videoUrl,
    credits,
    currentTime,
    duration,
    selectLayer,
    updateLayer,
    removeLayer,
    updateLayerPosition,
    updateLayerTiming,
    saveProject,
    consumeCredit,
    setCurrentTime,
    setDuration,
    loadProject,
  } = useEditorStore();

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showExportModal, setShowExportModal] = React.useState(false);
  const [toast, setToast] = React.useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Load project on mount
  React.useEffect(() => {
    // TODO: Get project ID from URL params or context
    loadProject("project-1");
  }, [loadProject]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleDurationChange = (duration: number) => {
    setDuration(duration);
  };

  const handleSave = () => {
    saveProject();
    setToast({
      message: "Project saved successfully!",
      type: "success",
      isVisible: true,
    });
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleConfirmExport = () => {
    const creditCost = 10; // Mock cost
    if (consumeCredit(creditCost)) {
      // TODO: Call backend API to start rendering
      console.log("Export started (mock)");
    }
  };

  const selectedLayer = selectedLayerId
    ? textLayers.find((l) => l.id === selectedLayerId)
    : null;

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Editor</h2>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handlePlayPause}
            className="neo-button bg-[var(--color-blue)] text-white hover:brightness-95"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="neo-button bg-[var(--color-yellow)] hover:brightness-95"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button
            type="button"
            onClick={handleExport}
            className="neo-button bg-[var(--color-pink)] text-white hover:brightness-95"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main editor layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4">
        {/* Left: Video + Canvas + Timeline */}
        <div className="space-y-4">
          {/* Video Canvas */}
          <div className="neo-card bg-white p-4">
            <Canvas
              videoUrl={videoUrl}
              textLayers={textLayers}
              currentTime={currentTime}
              onSelectLayer={selectLayer}
              onUpdatePosition={updateLayerPosition}
              onTimeUpdate={handleTimeUpdate}
              onDurationChange={handleDurationChange}
              videoRef={videoRef}
            />
          </div>

          {/* Timeline */}
          <Timeline
            duration={duration}
            textLayers={textLayers}
            currentTime={currentTime}
            selectedLayerId={selectedLayerId}
            onUpdateTiming={updateLayerTiming}
            onSelectLayer={selectLayer}
            onSeek={handleSeek}
          />
        </div>

        {/* Right: Layer controls */}
        <div className="space-y-4">
          {selectedLayer ? (
            <>
              <LayerItem
                layer={selectedLayer}
                onUpdate={(updates) => updateLayer(selectedLayer.id, updates)}
                onDelete={() => {
                  removeLayer(selectedLayer.id);
                  selectLayer(undefined);
                }}
              />
              <StyleControls
                onPositionChange={(x, y) =>
                  updateLayerPosition(selectedLayer.id, x, y)
                }
                onAnimationChange={(animation) =>
                  updateLayer(selectedLayer.id, { animation })
                }
                currentAnimation={selectedLayer.animation}
              />
            </>
          ) : (
            <div className="neo-card bg-white p-8 text-center">
              <p className="text-sm text-neutral-600">
                Select a text layer on the canvas to edit its properties
              </p>
            </div>
          )}

          {/* Credits display */}
          <div className="neo-card bg-[var(--color-blue)]/10 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide mb-2">
              Credits
            </div>
            <div className="text-2xl font-bold">{credits}</div>
            <div className="text-xs text-neutral-600 mt-1">
              Available for exports
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={handleConfirmExport}
        creditCost={10}
        currentCredits={credits}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
