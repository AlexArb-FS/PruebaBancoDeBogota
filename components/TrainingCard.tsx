import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, actions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-bold text-[#0043A9] truncate">{title}</h2>
        <div className="mt-2 text-gray-600 text-sm">
          {children}
        </div>
      </div>
      {actions && (
        <div className="mt-6 flex justify-end">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;
