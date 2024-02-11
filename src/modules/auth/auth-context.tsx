import { createContext } from "react";
import { AuthContextType } from "./type";

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
