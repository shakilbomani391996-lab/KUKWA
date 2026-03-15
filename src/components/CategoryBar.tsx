import React from 'react';
import { cn } from '../lib/utils';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Zote', icon: '🌟' },
  { id: 'clothing', name: 'Mavazi', icon: '👕' },
  { id: 'music', name: 'Muziki', icon: '🎵' },
  { id: 'art', name: 'Sanaa', icon: '🎨' },
  { id: 'food', name: 'Chakula', icon: '🍲' },
  { id: 'services', name: 'Huduma', icon: '🛠️' },
];

export const CategoryBar = ({ 
  activeCategory, 
  onSelect 
}: { 
  activeCategory: string; 
  onSelect: (id: string) => void 
}) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-2 px-4 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
            activeCategory === cat.id
              ? "bg-orange-600 text-white shadow-md scale-105"
              : "bg-white text-stone-600 border border-stone-100 hover:bg-stone-50"
          )}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};
