import React, { useState } from 'react';
import { 
  PlusIcon, 
  StarIcon, 
  EyeIcon, 
  EyeSlashIcon,
  PencilIcon,
  TrashIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useExternalToolsStore } from '../store/externalToolsStore';
import { ExternalTool, ToolCategory } from '../types/external-tools.types';

export const ExternalToolsManager: React.FC = () => {
  const {
    tools,
    categories,
    getToolsByCategory,
    getFavoriteTools,
    getCategoryToolCount,
    toggleFavorite,
    toggleActive,
    deleteTool
  } = useExternalToolsStore();

  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);

  const favoriteTools = getFavoriteTools();
  const totalTools = tools.length;
  const maxTools = 25; // TIER 1 Limit

  const handleToolClick = (tool: ExternalTool) => {
    window.open(tool.url, '_blank');
  };

  const handleDeleteTool = (tool: ExternalTool) => {
    if (confirm(`Tool "${tool.name}" wirklich löschen?`)) {
      deleteTool(tool.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Externe Tools</h1>
          <p className="text-gray-600">
            Verwalte deine externen Coaching-Tools und Links ({totalTools}/{maxTools})
          </p>
        </div>
        <button
          disabled={totalTools >= maxTools}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Neues Tool
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <LinkIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gesamt Tools</p>
              <p className="text-2xl font-bold text-gray-900">{totalTools}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <StarSolidIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Favoriten</p>
              <p className="text-2xl font-bold text-gray-900">{favoriteTools.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktive Tools</p>
              <p className="text-2xl font-bold text-gray-900">
                {tools.filter(t => t.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      {favoriteTools.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <StarSolidIcon className="w-5 h-5 text-yellow-500 mr-2" />
            Favoriten (Quick Access)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {favoriteTools.map((tool) => (
              <ToolButton key={tool.id} tool={tool} onToolClick={handleToolClick} />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.id);
          const toolCount = getCategoryToolCount(category.id);
          
          if (selectedCategory && selectedCategory !== category.id) return null;
          
          return (
            <div key={category.id} className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description} ({toolCount}/{category.maxTools})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {selectedCategory === category.id ? 'Alle anzeigen' : 'Nur diese'}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {categoryTools.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">{category.icon}</span>
                    <p>Noch keine Tools in dieser Kategorie</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                      Erstes Tool hinzufügen
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onToolClick={handleToolClick}
                        onToggleFavorite={() => toggleFavorite(tool.id)}
                        onToggleActive={() => toggleActive(tool.id)}
                        onDelete={() => handleDeleteTool(tool)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Tool Button Component (for favorites)
interface ToolButtonProps {
  tool: ExternalTool;
  onToolClick: (tool: ExternalTool) => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ tool, onToolClick }) => (
  <button
    onClick={() => onToolClick(tool)}
    className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
    style={{ borderTop: `3px solid ${tool.color}` }}
  >
    <span className="text-2xl mb-2">{tool.icon}</span>
    <span className="text-xs font-medium text-gray-700 text-center group-hover:text-gray-900">
      {tool.name}
    </span>
  </button>
);

// Tool Card Component (for category view)
interface ToolCardProps {
  tool: ExternalTool;
  onToolClick: (tool: ExternalTool) => void;
  onToggleFavorite: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onToolClick,
  onToggleFavorite,
  onToggleActive,
  onDelete
}) => (
  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center">
        <span className="text-2xl mr-3">{tool.icon}</span>
        <div>
          <h4 className="font-medium text-gray-900">{tool.name}</h4>
          {tool.description && (
            <p className="text-sm text-gray-600">{tool.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={onToggleFavorite}
          className={`p-1 rounded ${
            tool.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          {tool.isFavorite ? (
            <StarSolidIcon className="w-4 h-4" />
          ) : (
            <StarIcon className="w-4 h-4" />
          )}
        </button>
        
        <button
          onClick={onToggleActive}
          className={`p-1 rounded ${
            tool.isActive ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
          }`}
        >
          {tool.isActive ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <EyeSlashIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <button
        onClick={() => onToolClick(tool)}
        className="flex-1 mr-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
      >
        Tool öffnen
      </button>
      
      <div className="flex space-x-1">
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-600 rounded"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ExternalToolsManager;
