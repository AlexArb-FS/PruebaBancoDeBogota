// CoursesPage.tsx (modificado)
import React from 'react';
import Card from '../components/TrainingCard';
import { Training } from '../types';
import { EyeIcon, PlusIcon } from '../components/icons';

interface CoursesPageProps {
  trainings: Training[];
  onSelectTraining: (training: Training) => void;
  onEnroll: (training: Training) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ trainings, onSelectTraining, onEnroll }) => {
  // Los cursos disponibles son aquellos donde enrollmentId es undefined (no inscrito)
  const availableCourses = trainings.filter(t => t.enrollmentId === undefined);
  // Los cursos completados son aquellos con progreso del 100%
  const completedCourses = trainings.filter(t => t.progress === 100);

  // Card variant for available courses (view and enroll actions)
  const renderAvailableCourseCard = (training: Training) => (
    <Card
      key={training.id}
      title={training.title}
      actions={
        <div className="flex items-center space-x-2">
           <button
              onClick={() => onSelectTraining(training)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0043A9]"
              aria-label={`Ver detalles del curso ${training.title}`}
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
              onClick={() => {
                console.log('Attempting to enroll in training:', training.id); // Depuración agregada
                onEnroll(training);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#B0CDF1]/50 text-[#0043A9] hover:bg-[#B0CDF1] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0043A9]"
              aria-label={`Inscribirse al curso ${training.title}`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      }
    >
      <p className="h-12">{training.description}</p>
    </Card>
  );

  // Card variant for completed courses (with progress bar, eye icon)
  const renderCompletedCourseCard = (training: Training) => (
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
            className="bg-[#0043A9] h-2.5 rounded-full"
            style={{ width: `${training.progress}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Catálogo de Cursos</h1>

      {/* Cursos Disponibles */}
      <section>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b-2 border-[#0043A9] pb-2 mb-6">
          Cursos Disponibles
        </h2>
        {availableCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map(renderAvailableCourseCard)}
          </div>
        ) : (
          <p className="text-gray-500">¡Felicidades! Ya estás inscrito en todos nuestros cursos disponibles.</p>
        )}
      </section>

      {/* Cursos finalizados */}
      <section>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-6">
          Cursos Finalizados
        </h2>
        {completedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map(renderCompletedCourseCard)}
          </div>
         ) : (
            <p className="text-gray-500">Aún no has finalizado ningún curso. ¡Sigue aprendiendo!</p>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;