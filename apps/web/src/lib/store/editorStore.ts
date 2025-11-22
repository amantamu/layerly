import { create } from "zustand";
import type { TextLayer } from "@layerly/types";
import { getProjectById, saveProject as saveProjectToMock } from "../mockData";

interface EditorState {
  // State
  textLayers: TextLayer[];
  selectedLayerId?: string;
  videoUrl: string;
  credits: number;
  currentTime: number;
  duration: number;
  projectId?: string;

  // Actions
  addLayer: (layer: TextLayer) => void;
  updateLayer: (id: string, updates: Partial<TextLayer>) => void;
  removeLayer: (id: string) => void;
  selectLayer: (id?: string) => void;
  saveProject: () => void;
  consumeCredit: (amount: number) => boolean;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  loadProject: (projectId: string) => void;
  updateLayerTiming: (id: string, start: number, end: number) => void;
  updateLayerPosition: (id: string, x: number, y: number) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Initial state
  textLayers: [],
  selectedLayerId: undefined,
  videoUrl: "",
  credits: 420, // Mock credits
  currentTime: 0,
  duration: 0,
  projectId: undefined,

  // Actions
  addLayer: (layer) => {
    set((state) => ({
      textLayers: [...state.textLayers, layer],
    }));
  },

  updateLayer: (id, updates) => {
    set((state) => ({
      textLayers: state.textLayers.map((layer) =>
        layer.id === id ? { ...layer, ...updates } : layer
      ),
    }));
  },

  removeLayer: (id) => {
    set((state) => ({
      textLayers: state.textLayers.filter((layer) => layer.id !== id),
      selectedLayerId:
        state.selectedLayerId === id ? undefined : state.selectedLayerId,
    }));
  },

  selectLayer: (id) => {
    set({ selectedLayerId: id });
  },

  saveProject: () => {
    const state = get();
    if (!state.projectId) {
      console.warn("No project ID set, cannot save");
      return;
    }

    const project = getProjectById(state.projectId);
    if (!project) {
      console.warn("Project not found:", state.projectId);
      return;
    }

    // Update project with current state
    const updatedProject = {
      ...project,
      textLayers: state.textLayers,
      videoUrl: state.videoUrl,
    };

    saveProjectToMock(updatedProject);
    // TODO: Call API endpoint: PUT /api/projects/:id
  },

  consumeCredit: (amount) => {
    const state = get();
    if (state.credits >= amount) {
      set({ credits: state.credits - amount });
      // TODO: Call API endpoint: POST /api/credits/consume
      return true;
    }
    return false;
  },

  setCurrentTime: (time) => {
    set({ currentTime: time });
  },

  setDuration: (duration) => {
    set({ duration });
  },

  loadProject: (projectId) => {
    const project = getProjectById(projectId);
    if (project) {
      set({
        textLayers: project.textLayers,
        videoUrl: project.videoUrl,
        projectId: project.id,
        selectedLayerId: undefined,
      });
    } else {
      // Default to first mock project if ID not found
      const defaultProject = getProjectById("project-1");
      if (defaultProject) {
        set({
          textLayers: defaultProject.textLayers,
          videoUrl: defaultProject.videoUrl,
          projectId: defaultProject.id,
          selectedLayerId: undefined,
        });
      }
    }
  },

  updateLayerTiming: (id, start, end) => {
    set((state) => ({
      textLayers: state.textLayers.map((layer) =>
        layer.id === id ? { ...layer, start, end } : layer
      ),
    }));
  },

  updateLayerPosition: (id, x, y) => {
    set((state) => ({
      textLayers: state.textLayers.map((layer) =>
        layer.id === id ? { ...layer, x, y } : layer
      ),
    }));
  },
}));

