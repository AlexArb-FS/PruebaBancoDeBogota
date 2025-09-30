
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const SettingsPage: React.FC = () => {
  const { user, updateUserName, updateUserPassword } = useAuth();

  // State for changing name
  const [name, setName] = useState(user?.name || '');
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // State for changing password
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameSuccess(null);
    setNameError(null);
  };

  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsNameLoading(true);
    setNameSuccess(null);
    setNameError(null);
    try {
      await updateUserName(name);
      setNameSuccess('¡Nombre actualizado con éxito!');
    } catch (error: any) {
        setNameError(error.message || 'No se pudo actualizar el nombre.');
    } finally {
        setIsNameLoading(false);
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Las nuevas contraseñas no coinciden.');
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPasswordError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setIsPasswordLoading(true);
    try {
      await updateUserPassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswordSuccess('¡Contraseña actualizada con éxito!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
        setPasswordError(error.message || 'No se pudo actualizar la contraseña.');
    } finally {
        setIsPasswordLoading(false);
    }
  };


  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Configuración</h1>
      
      <div className="mt-8 max-w-2xl mx-auto space-y-8">
        {/* Change Name Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Cambiar Nombre</h2>
          <form onSubmit={handleNameSubmit} className="mt-4 space-y-4">
            <Input
              label="Nombre Completo"
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameSuccess && <p className="text-sm text-green-600">{nameSuccess}</p>}
            {nameError && <p className="text-sm text-red-600">{nameError}</p>}
            <div className="flex justify-end">
              <Button type="submit" disabled={isNameLoading || name === user?.name}>
                {isNameLoading ? 'Guardando...' : 'Guardar Nombre'}
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Cambiar Contraseña</h2>
          <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
            <Input
              label="Contraseña Actual"
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
            />
            <Input
              label="Nueva Contraseña"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="Mínimo 8 caracteres"
              required
            />
            <Input
              label="Confirmar Nueva Contraseña"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Repite la nueva contraseña"
              required
            />
            
            {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
            {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}

            <div className="flex justify-end">
              <Button type="submit" disabled={isPasswordLoading}>
                {isPasswordLoading ? 'Guardando...' : 'Guardar Contraseña'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;