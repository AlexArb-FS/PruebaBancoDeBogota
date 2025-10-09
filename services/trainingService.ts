import { createClient } from '@supabase/supabase-js';
import { Training, Module } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loadTrainings = async (userId: string): Promise<Training[]> => {
  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .select('id, titulo, descripcion');
  if (coursesError) {
    console.error("Error fetching courses:", coursesError);
    throw coursesError;
  }

  const { data: modulesData, error: modulesError } = await supabase
    .from('modules')
    .select('id, id_curso, titulo, descripcion');
  if (modulesError) {
    console.error("Error fetching modules:", modulesError);
    throw modulesError;
  }

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
      modules: mappedModules,
      enrollmentId: enrollmentId,
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

  const { error: insertCourseProgressError } = await supabase
    .from('user_course_progress')
    .insert({ user_id: userId, course_id: courseId, completed: false });
  if (insertCourseProgressError) {
    console.error('Error inserting user_course_progress:', insertCourseProgressError);
    throw insertCourseProgressError;
  }
  console.log(`User ${userId} enrolled in course ${courseId}.`);


  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id')
    .eq('id_curso', courseId);

  if (modulesError) {
    console.error('Error querying modules for enrollment:', modulesError);
    throw modulesError;
  }

  if (!modules || modules.length === 0) {
    console.warn(`No modules found for course ${courseId}, no module progress entries created.`);
    return;
  }

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

export const updateModuleProgress = async (userId: string, courseId: string, moduleId: string, completed: boolean) => {
  console.log(`[updateModuleProgress] User: ${userId}, Course: ${courseId}, Module: ${moduleId}, Completed: ${completed}`); // DEBUG

  const { error: updateModuleError } = await supabase.from('user_module_progress')
    .update({ completed: completed })
    .eq('user_id', userId)
    .eq('module_id', moduleId);

  if (updateModuleError) {
    console.error('[updateModuleProgress] Error updating module progress in DB:', updateModuleError); // DEBUG
    throw updateModuleError;
  }
  console.log(`[updateModuleProgress] Module ${moduleId} progress updated in DB.`); // DEBUG

  const { data: courseModules, error: courseModulesError } = await supabase
    .from('modules')
    .select('id')
    .eq('id_curso', courseId);

  if (courseModulesError) {
    console.error('[updateModuleProgress] Error fetching course modules for progress check:', courseModulesError); // DEBUG
    throw courseModulesError;
  }

  const totalModulesInCourse = courseModules?.length || 0;
  console.log(`[updateModuleProgress] Total modules in course ${courseId}: ${totalModulesInCourse}`); // DEBUG

  if (totalModulesInCourse === 0) {
    console.warn(`[updateModuleProgress] Course ${courseId} has no modules. Cannot determine course completion based on modules.`); // DEBUG
    return;
  }

  const { data: userProgressForCourse, error: userProgressForCourseError } = await supabase
    .from('user_module_progress')
    .select('module_id, completed')
    .eq('user_id', userId)
    .in('module_id', courseModules.map(m => m.id));

  if (userProgressForCourseError) {
    console.error('[updateModuleProgress] Error fetching user progress for course modules:', userProgressForCourseError); // DEBUG
    throw userProgressForCourseError;
  }
  console.log(`[updateModuleProgress] User progress for course ${courseId}:`, userProgressForCourse); // DEBUG

  const completedModulesInCourse = userProgressForCourse?.filter(p => p.completed).length || 0;
  const isCourseCompleted = (completedModulesInCourse === totalModulesInCourse) && (totalModulesInCourse > 0);
  console.log(`[updateModuleProgress] Completed modules in course: ${completedModulesInCourse}, Is course completed: ${isCourseCompleted}`); // DEBUG

  const { error: updateCourseProgressError } = await supabase.from('user_course_progress')
    .update({ completed: isCourseCompleted })
    .eq('user_id', userId)
    .eq('course_id', courseId);

  if (updateCourseProgressError) {
    console.error('[updateModuleProgress] Error updating course progress status in DB:', updateCourseProgressError); // DEBUG
    throw updateCourseProgressError;
  }
  console.log(`[updateModuleProgress] Course ${courseId} completion status updated to ${isCourseCompleted} in DB.`); // DEBUG
};