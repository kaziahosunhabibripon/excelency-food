"use client";
import { useEffect, useState, FC, memo } from "react";
import { ChevronDown } from "react-feather";

interface DropdownOption {
  id: string | number;
  label: string;
  value: number | string;
}

interface AppDropdownProps {
  options: DropdownOption[];
  label?: string;
  customClasses?: string;
  selectedValue?: DropdownOption;
  callback?: (option: string) => void;
}

const AppDropdown: FC<AppDropdownProps> = ({
  options,
  label,
  customClasses = "w-48",
  selectedValue = "",
  callback = () => {},
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue || null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    callback(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [selectedValue]);

  return (
    <div className="relative inline-block text-left w-full">
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex justify-between cursor-pointer px-4 py-2.5 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-md focus:outline-none ${customClasses}`}
      >
        {(typeof selectedOption === "object" && selectedOption?.label) ||
          label ||
          "Select an option"}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute z-40 mt-2 bg-white border border-gray-200 rounded-md shadow-lg ${customClasses}`}
        >
          <ul className="py-1 text-sm text-gray-700">
            {options.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item?.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(AppDropdown);
