export type ToolCategory = 'Video' | 'Collaboration' | 'VR/AR' | 'Assessment' | 'Learning' | 'Custom'

export interface ExternalTool {
  id: string
  name: string
  url: string
  category: ToolCategory
  icon: string
  isFavorite: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ToolCategoryConfig {
  id: ToolCategory
  name: string
  icon: string
  color: string
  description: string
}
