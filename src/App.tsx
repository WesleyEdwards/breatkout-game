import {
  Container,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { BreakoutHeader } from "./components/BreakoutHeader";
import { BreakoutMenu } from "./components/BreakoutMenu";
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
