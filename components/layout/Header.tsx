import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MenuIcon, LogoutIcon } from '../icons';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <header className="relative z-10 bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-[#0043A9] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0043A9] rounded-md"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <button
            onClick={logout}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-[#0043A9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0043A9] rounded-full p-2"
            aria-label="Cerrar sesión"
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
