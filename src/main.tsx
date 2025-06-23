import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const mainTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const actions = [
  { icon: <DarkModeIcon />, name: "Dark Mode" },
  { icon: <LightModeIcon />, name: "Light Mode" },
  { icon: <SettingsSuggestIcon />, name: "System" },
];

export function ToggleColorMode() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  const handleActionClick = (actionName: string) => {
    switch (actionName) {
      case "Dark Mode":
        setMode("dark");
        break;
      case "Light Mode":
        setMode("light");
        break;
      case "System":
        setMode("system");
        break;
      default:
        break;
    }
  };
  return (
    <SpeedDial ariaLabel="Color Mode Toggle" sx={{ position: "fixed", bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
          onClick={() => handleActionClick(action.name)}
        />
      ))}
    </SpeedDial>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <ToggleColorMode />
      <App />
    </ThemeProvider>
  </StrictMode>
);
