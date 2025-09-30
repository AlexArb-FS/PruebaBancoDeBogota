import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const getInitials = (name: string = ''): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Mi Perfil</h1>
      
      <div className="mt-8 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[#0043A9] flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">{getInitials(user?.name)}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-md text-gray-500 mt-1">{user?.email}</p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-700">Detalles de la Cuenta</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Nombre Completo</span>
              <span className="text-sm text-gray-800">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Correo Electrónico</span>
              <span className="text-sm text-gray-800">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Rol</span>
              <span className="text-sm text-gray-800">Usuario Estándar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;