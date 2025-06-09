import { createContext, use } from "react";

// Define the context type
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the context
export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
