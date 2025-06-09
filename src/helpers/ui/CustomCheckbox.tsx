"use client";

import { useState } from "react";
import { Check } from "react-feather";

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function CustomCheckbox({
  checked = false,
  onCheckedChange,
  disabled = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    if (disabled) return;

    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <div
      className={`h-4 w-4 rounded border flex items-center justify-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${
        isChecked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
      }`}
      onClick={handleChange}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleChange();
        }
      }}
    >
      {isChecked && <Check className="h-3 w-3 text-white" />}
    </div>
  );
}
