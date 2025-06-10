import { createContext, use } from "react";

export type ThemeType = "none" | "light" | "dark";

// theme context type
export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// theme context
export const ThemeContext = createContext<ThemeContextType>({ theme: "light", setTheme: () => {} });

// theme hook
export function useTheme(): ThemeContextType {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
