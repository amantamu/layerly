// Shared TypeScript types

export interface TextLayer {
  id: string;
  text: string;
  start: number; // Start time in seconds
  end: number; // End time in seconds
  x: number; // X position (0-100 as percentage)
  y: number; // Y position (0-100 as percentage)
  size: number; // Font size in pixels
  color: string; // Hex color
  bold: boolean;
  italic: boolean;
  outline: boolean;
  animation?: string; // Animation preset name
}

export interface Project {
  id: string;
  name: string;
  videoUrl: string;
  textLayers: TextLayer[];
  createdAt: string;
  updatedAt: string;
}
