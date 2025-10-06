import React from 'react';
import Card from '../components/TrainingCard';
import { Training } from '../types';
import { EyeIcon } from '../components/icons';

interface DashboardPageProps {
  trainings: Training[];
  onSelectTraining: (training: Training) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ trainings, onSelectTraining }) => {
  // Entrenamientos en progreso: Inscritos (enrollmentId existe) y no completados (progreso entre 0 y 100)
  // MODIFICACIÓN AQUÍ: Incluir cursos con progreso del 0% si están inscritos
  const inProgressTrainings = trainings.filter(t => t.enrollmentId !== undefined && t.progress < 100);
  // Eliminado `t.progress > 0` para incluir cursos recién inscritos con 0% de progreso.
  // La condición `t.progress < 100` ya excluye los cursos completados.

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Mis Capacitaciones</h1>
      <p className="mt-2 text-gray-600">Continúa con tu ruta de aprendizaje y desarrolla nuevas habilidades.</p>

      <div className="mt-8">
        {inProgressTrainings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressTrainings.map((training) => (
              <Card
                key={training.id}
                title={training.title}
                actions={
                  <button
                      onClick={() => onSelectTraining(training)}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B0CDF1]/50 text-[#0043A9] hover:bg-[#B0CDF1] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0043A9]"
                      aria-label={`Ver capacitación ${training.title}`}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                }
              >
                <p className="h-12">{training.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Progreso</span>
                    <span className="text-xs font-bold text-[#0043A9]">{Math.round(training.progress)}%</span> {/* Redondear el progreso */}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-valuenow={training.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso de ${training.title}`}>
                    <div
                      className="bg-[#0043A9] h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${training.progress}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-medium text-gray-700">¡Todo en orden!</h2>
            <p className="mt-2 text-gray-500">No tienes capacitaciones en progreso. ¡Ve a la sección de Cursos para empezar una nueva!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;