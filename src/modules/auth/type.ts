export interface User {
  id: number;
  username: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | undefined;
  login: (userData: User) => void;
  logout: () => void;
}
