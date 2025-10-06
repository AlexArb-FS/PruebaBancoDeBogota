import React from 'react';
import { HomeIcon, SettingsIcon, ProfileIcon, AcademicCapIcon } from '../icons';

interface SidebarProps {
  isOpen: boolean;
  activePage: string;
  onNavigate: (pageId: string) => void;
}

const navItems = [
  { id: 'dashboard', name: 'Inicio', icon: HomeIcon },
  { id: 'courses', name: 'Cursos', icon: AcademicCapIcon },
  { id: 'profile', name: 'Mi Perfil', icon: ProfileIcon },
  // { id: 'settings', name: 'Configuración', icon: SettingsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePage, onNavigate }) => {
  return (
    <aside
      className={`relative bg-[#0043A9] text-white flex-shrink-0 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-center h-16 border-b border-white/20">
        <svg className="h-8 w-auto text-[#B0CDF1]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
        </svg>
        {isOpen && <span className="ml-3 text-xl font-bold">Portal</span>}
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="px-4">
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full p-3 my-1 rounded-lg text-left transition-colors duration-200 ${
                  activePage === item.id 
                    ? 'bg-white/20' 
                    : 'hover:bg-white/10'
                }`}
              >
                <item.icon className="h-6 w-6 text-[#B0CDF1]" />
                {isOpen && <span className="ml-4 text-sm font-medium">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;