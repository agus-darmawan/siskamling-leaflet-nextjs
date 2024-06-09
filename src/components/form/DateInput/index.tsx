import React, { ChangeEvent } from "react";

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[#0C364B] font-bold mb-2">
        {label}
      </label>
      <input
        type="date"
        id={id}
        className="text-[#0C364B] w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#0C364B]"
        value={value}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateInput;
