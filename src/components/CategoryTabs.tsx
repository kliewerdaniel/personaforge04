import React from 'react';

interface CategoryTab {
  key: string;
  label: string;
}

interface CategoryTabsProps {
  categories: CategoryTab[];
  activeCategory: string;
  onSelectCategory: (categoryKey: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex space-x-sm mb-lg">
      {categories.map((category) => (
        <button
          key={category.key}
          className={`py-sm px-md rounded-full font-semibold transition-all duration-300 ease-in-out
            ${activeCategory === category.key
              ? 'bg-primary text-white shadow-md'
              : 'bg-neutral-300 text-neutral-500 hover:bg-neutral-400'
            }`}
          onClick={() => onSelectCategory(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
