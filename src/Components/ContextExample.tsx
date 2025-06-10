import { useTheme } from "./ThemeContext";
import ThemeProvider from "./ThemeProvider";

function ContextConsumer() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
      <div>Current Theme: {theme}</div>
      <button className="border-1 rounded text-black bg-blue-100 hover:bg-blue-400" onClick={() => setTheme("none")}>
        Toggle Theme
      </button>
    </div>
  );
}

export default function ContextExample() {
  return (
    <ThemeProvider>
      <ContextConsumer />
    </ThemeProvider>
  );
}
