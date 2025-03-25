export interface User {
  id: number;
  email: string;
  name?: string;
  // ...other user properties
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}