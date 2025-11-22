import type { Project, TextLayer } from "@layerly/types";

// Mock project data
export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Sample Video Project",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    textLayers: [
      {
        id: "layer-1",
        text: "Welcome to Layerly",
        start: 0,
        end: 5,
        x: 50,
        y: 20,
        size: 48,
        color: "#f7ff00",
        bold: true,
        italic: false,
        outline: true,
        animation: "fade-in",
      },
      {
        id: "layer-2",
        text: "Create Something Wild",
        start: 3,
        end: 8,
        x: 50,
        y: 50,
        size: 36,
        color: "#00a8ff",
        bold: false,
        italic: true,
        outline: false,
        animation: "slide-up",
      },
      {
        id: "layer-3",
        text: "No Subtlety Allowed",
        start: 6,
        end: 12,
        x: 50,
        y: 80,
        size: 32,
        color: "#ff3b8a",
        bold: true,
        italic: false,
        outline: true,
        animation: "bounce",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get a project by ID (mock function)
export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

// Save project (mock function - TODO: replace with API call)
export function saveProject(project: Project): void {
  const index = mockProjects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    mockProjects[index] = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
  } else {
    mockProjects.push(project);
  }
  // TODO: Call API endpoint: PUT /api/projects/:id
  console.log("Project saved (mock):", project);
}

