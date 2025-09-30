// trainingService.ts (corregido y actualizado para nueva DB)
import { createClient } from '@supabase/supabase-js';
import { Training, Module } from '../types'; // Importar Module

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loadTrainings = async (userId: string): Promise<Training[]> => {
  // 1. Obtener todos los cursos
  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .select('id, titulo, descripcion');
  if (coursesError) {
    console.error("Error fetching courses:", coursesError);
    throw coursesError;
  }

  // 2. Obtener todos los módulos
  const { data: modulesData, error: modulesError } = await supabase
    .from('modules')
    .select('id, id_curso, titulo, descripcion');
  if (modulesError) {
    console.error("Error fetching modules:", modulesError);
    throw modulesError;
  }

  // 3. Obtener el progreso del usuario para todos los módulos
  const { data: userModuleProgressData, error: userModuleProgressError } = await supabase
    .from('user_module_progress')
    .select('module_id, completed')
    .eq('user_id', userId);
  if (userModuleProgressError) {
    console.error("Error fetching user module progress:", userModuleProgressError);
    throw userModuleProgressError;
  }
  const userCompletedModules = new Set(
    userModuleProgressData?.filter(p => p.completed).map(p => p.module_id)
  );

  // 4. Obtener el progreso del usuario para todos los cursos (solo para saber si está inscrito)
  const { data: userCourseProgressData, error: userCourseProgressError } = await supabase
    .from('user_course_progress')
    .select('course_id, completed')
    .eq('user_id', userId);
  if (userCourseProgressError) {
    console.error("Error fetching user course progress:", userCourseProgressError);
    throw userCourseProgressError;
  }
  const userEnrolledCourses = new Set(userCourseProgressData?.map(p => p.course_id));
  const userCompletedCourseStatus = new Map(userCourseProgressData?.map(p => [p.course_id, p.completed]));


  // Mapear cursos a Trainings, calculando progreso y adjuntando módulos
  const trainings: Training[] = coursesData.map(course => {
    const courseModules = modulesData.filter(module => module.id_curso === course.id);

    let completedModulesCount = 0;
    if (userEnrolledCourses.has(course.id)) { // Solo cuenta progreso si está inscrito
      courseModules.forEach(module => {
        if (userCompletedModules.has(module.id)) {
          completedModulesCount++;
        }
      });
    }

    const totalModules = courseModules.length;
    const progressPercent = totalModules > 0 ? (completedModulesCount / totalModules) * 100 : 0;

    // Determinar si el curso está "inscrito" basado en si hay alguna entrada en user_course_progress
    const enrollmentId = userEnrolledCourses.has(course.id) ? course.id : undefined;

    // Mapear los módulos para el detalle de la capacitación
    const mappedModules: Module[] = courseModules.map(m => ({
      id: m.id,
      title: m.titulo,
      description: m.descripcion
    }));

    return {
      id: course.id,
      title: course.titulo,
      description: course.descripcion,
      progress: progressPercent,
      modules: mappedModules, // Asignar los módulos al training
      enrollmentId: enrollmentId,
      // completedModuleIds solo si está inscrito
      completedModuleIds: enrollmentId ? mappedModules.filter(m => userCompletedModules.has(m.id)).map(m => m.id) : [],
    };
  });

  return trainings;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  // Validar UUIDs
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(userId) || !uuidRegex.test(courseId)) {
    throw new Error('Invalid userId or courseId format');
  }

  // Verificar sesión autenticada
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session || session.user.id !== userId) {
    console.error('Session error or unauthorized:', sessionError);
    throw new Error('No authenticated session or unauthorized access');
  }
  console.log('Authenticated user:', session.user.id);

  // Comprobar si el usuario ya está inscrito en el curso
  const { data: existingEnrollment, error: existingEnrollmentError } = await supabase
    .from('user_course_progress')
    .select('course_id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (existingEnrollmentError) throw existingEnrollmentError;
  if (existingEnrollment) {
    console.log(`User ${userId} is already enrolled in course ${courseId}.`);
    return; // No hacer nada si ya está inscrito
  }

  // 1. Insertar entrada en user_course_progress para marcar la inscripción
  const { error: insertCourseProgressError } = await supabase
    .from('user_course_progress')
    .insert({ user_id: userId, course_id: courseId, completed: false });
  if (insertCourseProgressError) {
    console.error('Error inserting user_course_progress:', insertCourseProgressError);
    throw insertCourseProgressError;
  }
  console.log(`User ${userId} enrolled in course ${courseId}.`);


  // 2. Obtener todos los módulos del curso
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id')
    .eq('id_curso', courseId); // Usar id_curso

  if (modulesError) {
    console.error('Error querying modules for enrollment:', modulesError);
    throw modulesError;
  }

  if (!modules || modules.length === 0) {
    console.warn(`No modules found for course ${courseId}, no module progress entries created.`);
    return; // Si no hay módulos, no hay progreso a insertar
  }

  // 3. Crear entradas de progreso para cada módulo
  const moduleProgressEntries = modules.map(module => ({
    user_id: userId,
    module_id: module.id,
    completed: false,
  }));

  console.log('Inserting initial module progress entries:', moduleProgressEntries);

  const { error: insertModuleProgressError } = await supabase
    .from('user_module_progress')
    .insert(moduleProgressEntries);

  if (insertModuleProgressError) {
    console.error('Error inserting initial module progress entries:', insertModuleProgressError);
    throw insertModuleProgressError;
  }
  console.log(`Initial module progress entries created for course ${courseId} and user ${userId}.`);
};

// Renombrado de updateConceptProgress a updateModuleProgress
export const updateModuleProgress = async (userId: string, courseId: string, moduleId: string, completed: boolean) => {
  // 1. Actualizar el estado del módulo específico
  const { error: updateModuleError } = await supabase.from('user_module_progress')
    .update({ completed: completed })
    .eq('user_id', userId)
    .eq('module_id', moduleId);

  if (updateModuleError) {
    console.error('Error updating module progress:', updateModuleError);
    throw updateModuleError;
  }

  console.log(`Module ${moduleId} progress updated to ${completed} for user ${userId}.`);

  // 2. Verificar el progreso general del curso para actualizar user_course_progress
  const { data: courseModules, error: courseModulesError } = await supabase
    .from('modules')
    .select('id')
    .eq('id_curso', courseId);

  if (courseModulesError) {
    console.error('Error fetching course modules for progress check:', courseModulesError);
    throw courseModulesError;
  }

  const totalModulesInCourse = courseModules?.length || 0;

  if (totalModulesInCourse === 0) {
    // Si no hay módulos en el curso, el curso no puede ser completado por módulos.
    console.warn(`Course ${courseId} has no modules. Cannot determine course completion based on modules.`);
    return;
  }

  // Obtener el progreso de todos los módulos del curso para el usuario
  const { data: userProgressForCourse, error: userProgressForCourseError } = await supabase
    .from('user_module_progress')
    .select('module_id, completed')
    .eq('user_id', userId)
    .in('module_id', courseModules.map(m => m.id));

  if (userProgressForCourseError) {
    console.error('Error fetching user progress for course modules:', userProgressForCourseError);
    throw userProgressForCourseError;
  }

  const completedModulesInCourse = userProgressForCourse?.filter(p => p.completed).length || 0;

  const isCourseCompleted = (completedModulesInCourse === totalModulesInCourse) && (totalModulesInCourse > 0);

  // 3. Actualizar el estado de finalización del curso en user_course_progress
  const { error: updateCourseProgressError } = await supabase.from('user_course_progress')
    .update({ completed: isCourseCompleted })
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (updateCourseProgressError) {
    console.error('Error updating course progress status:', updateCourseProgressError);
    throw updateCourseProgressError;
  }
  console.log(`Course ${courseId} completion status updated to ${isCourseCompleted} for user ${userId}.`);
};