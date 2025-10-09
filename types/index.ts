export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string; // UUID
  name: string;
  email: string;
}

export interface UpdatePasswordCredentials {
  currentPassword: string;
  newPassword: string;
}

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
  modules?: Module[];
  enrollmentId?: string;
  completedModuleIds?: string[];
}