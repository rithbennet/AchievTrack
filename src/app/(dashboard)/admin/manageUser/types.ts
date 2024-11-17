// types.ts
export interface User {
  id?: number; // Assuming the ID is optional and will be set when the user is created/updated
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string; // Added password field
}
