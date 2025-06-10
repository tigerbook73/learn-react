import { useState } from "react";
import { ThemeContext, type ThemeType } from "./ThemeContext";

// Theme Provider
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light");
  const updateTheme = (newTheme: ThemeType = "none") => {
    if (newTheme === "none") {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    } else {
      setTheme(newTheme);
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>;
}
