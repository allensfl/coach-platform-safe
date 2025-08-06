import { create } from 'zustand';
import { ExternalTool, ToolCategory, ToolCategoryConfig } from '../types/external-tools.types';

interface ExternalToolsState {
  tools: ExternalTool[];
  categories: ToolCategoryConfig[];
  isLoading: boolean;
  
  // Actions
  addTool: (tool: Omit<ExternalTool, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTool: (id: string, updates: Partial<ExternalTool>) => void;
  deleteTool: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleActive: (id: string) => void;
  
  // Getters
  getToolsByCategory: (category: ToolCategory) => ExternalTool[];
  getFavoriteTools: () => ExternalTool[];
  getActiveTools: () => ExternalTool[];
  getToolsCount: () => number;
  getCategoryToolCount: (category: ToolCategory) => number;
}

const TOOL_CATEGORIES: ToolCategoryConfig[] = [
  {
    id: 'video-conferencing',
    name: 'Video Conferencing',
    icon: '📹',
    description: 'Zoom, Teams, Google Meet, etc.',
    maxTools: 8,
    color: '#3B82F6'
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    icon: '🎯',
    description: 'Miro, Delightex, Figma, etc.',
    maxTools: 10,
    color: '#10B981'
  },
  {
    id: 'vr-ar-platforms',
    name: 'VR/AR Platforms',
    icon: '🥽',
    description: 'CoSpaces, Spatial, etc.',
    maxTools: 6,
    color: '#8B5CF6'
  },
  {
    id: 'assessment-tools',
    name: 'Assessment Tools',
    icon: '📊',
    description: 'Typeform, SurveyMonkey, etc.',
    maxTools: 8,
    color: '#F59E0B'
  },
  {
    id: 'learning-platforms',
    name: 'Learning Platforms',
    icon: '📚',
    description: 'LMS, Course Platforms, etc.',
    maxTools: 6,
    color: '#EF4444'
  },
  {
    id: 'custom-other',
    name: 'Custom/Other',
    icon: '🛠️',
    description: 'Any other specialized tools',
    maxTools: 12,
    color: '#6B7280'
  }
];

// Mock Data for Demo
const DEMO_TOOLS: ExternalTool[] = [
  {
    id: '1',
    name: 'Delightex Workshop',
    url: 'https://www.delightex.com',
    category: 'collaboration',
    icon: '🎨',
    color: '#10B981',
    description: 'Immersive coaching sessions',
    isActive: true,
    isFavorite: true,
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-05'),
    remoteIntegration: {
      canShareScreen: true,
      needsNewWindow: true,
      missionControlVisible: true,
      quickAccessPosition: 'top'
    },
    aiMetadata: {
      recommendedPhases: ['exploration', 'intervention'],
      clientTypes: ['creative', 'leadership'],
      efficacyScore: 0.85
    }
  },
  {
    id: '2',
    name: 'Zoom Coaching Room',
    url: 'https://zoom.us/j/123456789',
    category: 'video-conferencing',
    icon: '🎥',
    color: '#3B82F6',
    description: 'Dedicated coaching room',
    isActive: true,
    isFavorite: true,
    createdAt: new Date('2025-08-02'),
    updatedAt: new Date('2025-08-05'),
    remoteIntegration: {
      canShareScreen: false,
      needsNewWindow: false,
      missionControlVisible: true,
      quickAccessPosition: 'side'
    },
    aiMetadata: {
      recommendedPhases: ['rapport', 'closing'],
      clientTypes: ['all'],
      efficacyScore: 0.95
    }
  },
  {
    id: '3',
    name: 'Miro Coaching Board',
    url: 'https://miro.com/app/board/abc123',
    category: 'collaboration',
    icon: '📋',
    color: '#F59E0B',
    description: 'Visual coaching workspace',
    isActive: true,
    isFavorite: false,
    createdAt: new Date('2025-08-03'),
    updatedAt: new Date('2025-08-05'),
    remoteIntegration: {
      canShareScreen: true,
      needsNewWindow: true,
      missionControlVisible: true,
      quickAccessPosition: 'top'
    },
    aiMetadata: {
      recommendedPhases: ['exploration', 'planning'],
      clientTypes: ['visual', 'strategic'],
      efficacyScore: 0.78
    }
  }
];

export const useExternalToolsStore = create<ExternalToolsState>((set, get) => ({
  tools: DEMO_TOOLS,
  categories: TOOL_CATEGORIES,
  isLoading: false,

  addTool: (toolData) => {
    const newTool: ExternalTool = {
      ...toolData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      tools: [...state.tools, newTool]
    }));
  },

  updateTool: (id, updates) => {
    set((state) => ({
      tools: state.tools.map(tool => 
        tool.id === id 
          ? { ...tool, ...updates, updatedAt: new Date() }
          : tool
      )
    }));
  },

  deleteTool: (id) => {
    set((state) => ({
      tools: state.tools.filter(tool => tool.id !== id)
    }));
  },

  toggleFavorite: (id) => {
    const { updateTool } = get();
    const tool = get().tools.find(t => t.id === id);
    if (tool) {
      updateTool(id, { isFavorite: !tool.isFavorite });
    }
  },

  toggleActive: (id) => {
    const { updateTool } = get();
    const tool = get().tools.find(t => t.id === id);
    if (tool) {
      updateTool(id, { isActive: !tool.isActive });
    }
  },

  getToolsByCategory: (category) => {
    return get().tools.filter(tool => tool.category === category);
  },

  getFavoriteTools: () => {
    return get().tools.filter(tool => tool.isFavorite && tool.isActive);
  },

  getActiveTools: () => {
    return get().tools.filter(tool => tool.isActive);
  },

  getToolsCount: () => {
    return get().tools.length;
  },

  getCategoryToolCount: (category) => {
    return get().tools.filter(tool => tool.category === category).length;
  },
}));
