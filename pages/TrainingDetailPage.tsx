import React from 'react';
import { Training } from '../types';
import { updateModuleProgress } from '../services/trainingService';
import { useAuth } from '../contexts/AuthContext';

interface TrainingDetailPageProps {
  training: Training;
  onBack: () => void;
  onUpdateTraining: (updatedTrainingId: string) => void;
}

const TrainingDetailPage: React.FC<TrainingDetailPageProps> = ({ training, onBack, onUpdateTraining }) => {
  const { user } = useAuth();
  console.log('TrainingDetailPage: Current User:', user); // DEBUG
  console.log('TrainingDetailPage: Current Training:', training); // DEBUG

  const handleModuleToggle = async (moduleId: string, completed: boolean) => {
    console.log(`handleModuleToggle: Toggling module ${moduleId} to ${completed}`); // DEBUG
    if (!user || !training.id) {
      console.warn('handleModuleToggle: User not available or training ID missing. Cannot update module progress.'); // DEBUG
      return;
    }

    try {
      await updateModuleProgress(user.id, training.id, moduleId, completed);
      console.log('handleModuleToggle: updateModuleProgress successful, calling onUpdateTraining.'); // DEBUG
      onUpdateTraining(training.id);
    } catch (err) {
      console.error('handleModuleToggle: Error updating module progress:', err); // DEBUG
    }
  };
  
  const isEnrolled = training.enrollmentId !== undefined; // Verifica si está inscrito

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-[#0043A9] hover:underline mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0043A9]">{training.title}</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">{training.description}</p>

        {isEnrolled && training.progress !== undefined && ( // Solo muestra progreso si está inscrito
             <div className="mt-6">
                <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-600">Progreso General</span>
                <span className="text-sm font-bold text-[#0043A9]">{Math.round(training.progress)}%</span> {/* Redondear el progreso */}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-valuenow={training.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso de ${training.title}`}>
                <div
                    className="bg-[#0043A9] h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${training.progress}%` }}
                ></div>
                </div>
            </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">Módulos del Curso</h2> {/* Cambiado de Conceptos a Módulos */}
        <div className="space-y-4">
          {training.modules && training.modules.length > 0 ? ( // Cambiado de concepts a modules
            training.modules.map(module => ( // Mapear módulos
              <div key={module.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-start space-x-4">
                <input
                  type="checkbox"
                  id={`module-${module.id}`}
                  className="..."
                  checked={training.completedModuleIds?.includes(module.id) || false} // ESTO ES CLAVE
                  onChange={(e) => handleModuleToggle(module.id, e.target.checked)} // ESTO ES CLAVE
                  disabled={!isEnrolled}
                />
                <label htmlFor={`module-${module.id}`} className="flex-1 cursor-pointer">
                  <h3 className="font-semibold text-gray-800">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay módulos definidos para este curso.</p>
          )}
        </div>
        {!isEnrolled && ( // Mensaje si no está inscrito
            <div className="mt-6 p-4 text-center bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
                Inscríbete en este curso desde la página de 'Cursos' para poder marcar tu progreso.
            </div>
        )}
      </div>
    </div>
  );
};

export default TrainingDetailPage;