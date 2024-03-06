import { PropsWithChildren, useMemo, useState, createContext } from "react";
import { AuthenticationContextValue, User } from "./types";

export const AuthenticationContext = createContext<AuthenticationContextValue>({
  isAuthenticated: false,
  user: undefined,
  signIn() {},
  signOut() {},
});

// TODO: checkAuthentication() -> useEffect
// Simulate an authentication check on component mount
// Replace this with your actual authentication logic
// Check if the user is logged in, fetch user data, etc.

function AuthenticationProvider({ children }: PropsWithChildren) {
  const [user] = useState<User>();

  const signIn = () => {
    // Replace this with your actual login logic
    // e.g., making an API call to authenticate the user
  };

  const signOut = () => {
    // Replace this with your actual logout logic
    // e.g., making an API call to invalidate the user session
  };

  const value = useMemo<AuthenticationContextValue>(
    () => ({
      isAuthenticated: !!user,
      user,
      signIn,
      signOut,
    }),
    [user]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
