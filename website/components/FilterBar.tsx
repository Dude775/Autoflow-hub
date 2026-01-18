'use client';

import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function FilterBar({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-bold text-gray-900">Filter</h3>
        </div>

        {selectedCategory && (
          <button
            onClick={() => onCategoryChange(null)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={clsx(
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            selectedCategory === null
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={clsx(
              'px-4 py-2 rounded-lg font-medium transition-all duration-200',
              selectedCategory === category
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}