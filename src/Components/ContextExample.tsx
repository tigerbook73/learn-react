import { ThemeContext } from "./ThemeContext";
import { useState } from "react";

export default function ContextExample() {
  // Theme control
  const [theme, setTheme] = useState("light");
  const updateTheme = (newTheme: string = "undefined") => {
    if (newTheme === "undefined") {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
        <h1>Current Theme: {theme}</h1>
        <button onClick={() => updateTheme()}>Toggle Theme</button>
      </div>
    </ThemeContext.Provider>
  );
}
