// index.ts (modificado)
export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string; // Cambiado a string (UUID de Supabase Auth)
  name: string;
  email: string;
}

export interface UpdatePasswordCredentials {
  currentPassword: string;
  newPassword: string;
}

// Renombrada de Concept a Module para mayor claridad
export interface Module {
  id: string;
  title: string;
  description: string;
}

export interface Training {
  id: string; // UUID
  title: string;
  description: string;
  progress: number;
  modules?: Module[]; // Cambiado de 'concepts' a 'modules'
  enrollmentId?: string; // UUID - indica que el usuario está inscrito
  completedModuleIds?: string[]; // Cambiado de 'completedConceptIds' a 'completedModuleIds'
}