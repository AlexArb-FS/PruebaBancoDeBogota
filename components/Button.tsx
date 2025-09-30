import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth, disabled, className, ...props }) => {
  const baseClasses =
    'font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-transform transform active:scale-95 duration-200 ease-in-out';
  const widthClass = fullWidth ? 'w-full' : '';
  const stateClasses = disabled
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
    : 'bg-[#0043A9] text-white hover:bg-[#003687] focus:ring-[#0043A9]';

  return (
    <button
      className={`${baseClasses} ${widthClass} ${stateClasses} ${className || ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;