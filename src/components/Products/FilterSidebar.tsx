"use client";

import { CustomCheckbox } from "@/helpers/ui/CustomCheckbox";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "react-feather";

// Interfaces
export interface FilterItem {
  serial: number;
  id: string;
  name: string;
  count: number;
  checked: boolean;
}

export interface FilterCategory extends FilterItem {
  subCategories?: FilterItem[];
}

export interface SidebarItems {
  options: FilterCategory[]; // Accepts FilterCategory items
  label?: string;
  customClasses?: string;
  selectedValue?: string;
  callback?: (option: string) => void;
}

// Component
const FilterSidebar: FC<SidebarItems> = ({
  options,
  label = "Filters",
  customClasses,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterCategory[]>(options);
  const [selectedCategories, setSelectedCategories] = useState(null);
  console.log("🚀 ~ selectedCategories:", selectedCategories);

  const toggleCategory = (id: string) => {
    setFilters((prev) =>
      prev.map((category) => {
        if (category.id === id) {
          const newChecked = !category.checked;
          const updatedSub = category.subCategories?.map((sub) => ({
            ...sub,
            checked: newChecked,
          }));
          return {
            ...category,
            checked: newChecked,
            subCategories: updatedSub,
          };
        } else if (category.subCategories) {
          return {
            ...category,
            subCategories: category.subCategories.map((sub) =>
              sub.id === id ? { ...sub, checked: !sub.checked } : sub
            ),
          };
        }
        return category;
      })
    );
  };

  const handleLabelClick = (id: string, hasSubCategories: boolean) => {
    console.log("🚀 ~ handleLabelClick ~ id:", id, hasSubCategories);
    setSelectedCategories((prev) => ({ ...prev, id }));
    if (hasSubCategories) {
      setExpandedCategories((prev) =>
        prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
      );
    }
    toggleCategory(id);
  };

  const isExpanded = (id: string) => expandedCategories.includes(id);

  return (
    <div
      className={`border border-gray-200 rounded-md p-4 bg-white ${customClasses}`}
    >
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full font-semibold text-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isOpen && (
          <div className="mt-3 space-y-3">
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {filters.map((category) => (
                <div key={category.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      handleLabelClick(category.id, !!category.subCategories)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <CustomCheckbox
                        id={category.id}
                        checked={category?.id === selectedCategories?.id}
                        // onCheckedChange={() => {}}
                        onCheckedChange={() =>
                          handleLabelClick(
                            category.id,
                            !!category.subCategories
                          )
                        }
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({category.count})
                    </span>
                  </div>

                  {isExpanded(category.id) && category.subCategories && (
                    <div className="pl-6 mt-1 space-y-1">
                      {category.subCategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => handleLabelClick(sub.id, false)}
                        >
                          <div className="flex items-center gap-2">
                            <CustomCheckbox
                              id={sub.id}
                              checked={sub.checked}
                              onCheckedChange={() => {}}
                            />
                            <label htmlFor={sub.id} className="text-sm">
                              {sub.name}
                            </label>
                          </div>
                          <span className="text-xs text-gray-500">
                            ({sub.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
