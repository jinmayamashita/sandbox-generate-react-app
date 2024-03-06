type UserId = string;

export type User = {
  id: UserId;
  name: string;
};

export type AuthenticationContextValue = {
  isAuthenticated: boolean;
  user: User | undefined;
  signIn: (userData?: User) => void;
  signOut: () => void;
};
