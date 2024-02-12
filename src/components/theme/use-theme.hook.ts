import { useContext } from "react";
import { ThemeContext } from "./theme.context";

const errorMessage = "useTheme must be used within a ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error(errorMessage);

  return context;
}
