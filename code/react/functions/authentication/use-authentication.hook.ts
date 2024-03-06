import { useContext } from "react";
import { AuthenticationContext } from "./authentication.context";

const errorMessage =
  "useAuthentication must be used within an AuthenticationProvider";

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) throw new Error(errorMessage);

  return context;
}
