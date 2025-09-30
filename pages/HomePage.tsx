// HomePage.tsx (modificado)
import React, { useState, useEffect, useCallback } from 'react'; // Agregado useCallback
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import DashboardPage from './DashboardPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import CoursesPage from './CoursesPage';
import TrainingDetailPage from './TrainingDetailPage';
import { Training } from '../types/index';
import { useAuth } from '../contexts/AuthContext';
import { loadTrainings, enrollInCourse } from '../services/trainingService';

type ActivePage = 'dashboard' | 'courses' | 'profile' | 'settings';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar/recargar capacitaciones
  const fetchTrainings = useCallback(async () => {
    if (!user) {
      setIsLoading(false); // No hay usuario, no hay capacitaciones que cargar
      return;
    }
    setIsLoading(true);
    try {
      const loadedTrainings = await loadTrainings(user.id);
      setTrainings(loadedTrainings);
    } catch (err) {
      console.error('Error loading trainings:', err);
      // Podrías añadir un estado para mostrar el error al usuario
    } finally {
      setIsLoading(false);
    }
  }, [user]); // Dependencia del usuario para recargar si cambia

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]); // Ejecutar al montar o cuando fetchTrainings cambie

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    setSelectedTraining(null);
  };

  const handleSelectTraining = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleBack = () => {
    setSelectedTraining(null);
  };

  const handleEnroll = async (trainingToEnroll: Training) => {
    if (!user || !trainingToEnroll.id) return;
    console.log('Enrolling user:', user.id, 'in course:', trainingToEnroll.id);
    try {
      await enrollInCourse(user.id, trainingToEnroll.id);
      await fetchTrainings(); // Recargar todos los entrenamientos para reflejar la inscripción
      setActivePage('dashboard'); // O a 'courses' si prefieres que siga viendo el catálogo
    } catch (err) {
      console.error('Error enrolling:', err);
      // Manejo de errores para el usuario
    }
  };

  const handleUpdateTraining = async (updatedTrainingId: string) => { // Cambiado para recibir solo el ID
    if (!user) return;
    try {
      // Recargar todas las capacitaciones para obtener la información más reciente
      await fetchTrainings();

      // Si el entrenamiento seleccionado es el que se actualizó, actualízalo en el estado
      if (selectedTraining && selectedTraining.id === updatedTrainingId) {
        const newSelectedTraining = trainings.find(t => t.id === updatedTrainingId) || null;
        setSelectedTraining(newSelectedTraining);
      }
    } catch (err) {
      console.error('Error updating training after concept toggle:', err);
    }
  };

  const renderActivePage = () => {
    if (isLoading) {
      return <div className="text-center p-10">Cargando capacitaciones...</div>;
    }
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage trainings={trainings} onSelectTraining={handleSelectTraining} />;
      case 'courses':
        return <CoursesPage trainings={trainings} onSelectTraining={handleSelectTraining} onEnroll={handleEnroll} />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage trainings={trainings} onSelectTraining={handleSelectTraining} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        activePage={activePage}
        onNavigate={(page) => handleNavigate(page as ActivePage)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 md:p-8">
          {selectedTraining ? (
            <TrainingDetailPage
              training={selectedTraining}
              onBack={handleBack}
              onUpdateTraining={handleUpdateTraining}
            />
          ) : (
            renderActivePage()
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;