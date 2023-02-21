import {
  Container,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { BreakoutHeader } from "./components/BreakoutHeader";
import { GameEntry } from "./components/GameEntry";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ pt: "4rem" }}>
        <BreakoutHeader />
        <GameEntry />
      </Container>
    </ThemeProvider>
  );
}

export default App;
