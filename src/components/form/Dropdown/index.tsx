import React, { ChangeEvent } from "react";

interface Option {
  value: string;
  text: string;
}

interface DropdownProps {
  id: string;
  label: string;
  options: Option[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  options,
  onChange,
}) => {
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[#0C364B] font-bold mb-2">
        {label}
      </label>
      <select
        id={id}
        className="text-[#0C364B] w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#0C364B]"
        onChange={handleDropdownChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
