import React, { ChangeEvent } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value?: string | number;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value = "",
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[#0C364B] font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="text-[#0C364B] w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#0C364B]"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
