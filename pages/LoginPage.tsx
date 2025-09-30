import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCredentials } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginIllustration: React.FC = () => (
  <svg
    className="w-full h-auto"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0043A9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#B0CDF1', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0043A9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#B0CDF1', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M200 380C300 380 380 300 380 200C380 100 300 20 200 20C100 20 20 100 20 200C20 300 100 380 200 380Z"
      fill="url(#grad1)"
      fillOpacity="0.1"
    />
    <path
      d="M265.75 258.4C265.75 291.56 235.11 318 200 318C164.89 318 134.25 291.56 134.25 258.4C134.25 225.24 164.89 198.8 200 198.8C235.11 198.8 265.75 225.24 265.75 258.4Z"
      stroke="url(#grad2)"
      strokeWidth="12"
    />
    <path
      d="M200 178.5C223.49 178.5 242.5 159.49 242.5 136C242.5 112.51 223.49 93.5 200 93.5C176.51 93.5 157.5 112.51 157.5 136C157.5 159.49 176.51 178.5 200 178.5Z"
      stroke="url(#grad2)"
      strokeWidth="12"
    />
  </svg>
);

const LoginPage: React.FC = () => {
  const { login, isLoading, error: authError } = useAuth();
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
    setLocalError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!credentials.email || !credentials.password) {
      setLocalError('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setLocalError('Por favor, ingresa un formato de correo electrónico válido.');
      return;
    }

    try {
      await login(credentials);
    } catch (err: any) {
      setLocalError(err.message || 'Ocurrió un error inesperado al iniciar sesión.');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-16 items-center bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="hidden md:flex items-center justify-center p-12 bg-[#B0CDF1]/30">
          <div className="w-full max-w-sm">
            <LoginIllustration />
          </div>
        </div>
        <div className="p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#0043A9] sm:text-4xl">Iniciar Sesión</h2>
            <p className="mt-2 text-lg text-gray-600">Portal de Capacitaciones Banco de Bogotá</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="ejemplo@bancobogota.com"
              fullWidth
              required
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              fullWidth
              required
            />

            {displayError && <p className="text-sm text-red-600 text-center">{displayError}</p>}

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Iniciando Sesión...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
