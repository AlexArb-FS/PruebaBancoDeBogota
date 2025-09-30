import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ label, fullWidth, id, ...props }) => {
  const inputId = id || props.name;
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={inputId}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0043A9] focus:border-[#0043A9] transition duration-200"
        {...props}
      />
    </div>
  );
};

export default Input;