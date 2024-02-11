import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContextType, User } from "./type";
import { AuthContext } from "./auth-context";

function checkAuthentication() {
  // Simulate an authentication check on component mount
  // Replace this with your actual authentication logic
  // Check if the user is logged in, fetch user data, etc.
  return true;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = (userData: User) => {
    // Replace this with your actual login logic
    // e.g., making an API call to authenticate the user
    setUser(userData);
  };

  const logout = () => {
    // Replace this with your actual logout logic
    // e.g., making an API call to invalidate the user session
    setUser(undefined);
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
