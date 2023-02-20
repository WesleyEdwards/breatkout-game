import { Button, Container, IconButton, Stack } from "@mui/material";
import React, { FC, useState } from "react";
import About from "./About";
import Help from "./Help";
import { HighScores } from "./HighScores";

export type ScreenProps = {
  onBack: () => void;
};

type MenuButton = {
  text: string;
  onClick: () => void;
};

type pages = "menu" | "newGame" | "highScores" | "help" | "about";

export const BreakoutMenu: FC<{ startPlay: () => void }> = ({ startPlay }) => {
  const [selected, setSelected] = useState<pages>("menu");

  const menuButtons: MenuButton[] = [
    { text: "New Game", onClick: startPlay },
    { text: "High Scores", onClick: () => setSelected("highScores") },
    { text: "Help", onClick: () => setSelected("help") },
    { text: "About", onClick: () => setSelected("about") },
  ];

  const backToMenu = () => setSelected("menu");

  if (selected === "menu") {
    return (
      <Stack height="12rem" justifyContent="space-between" alignItems="center">
        {menuButtons.map((menuButton) => (
          <Button
            key={menuButton.text}
            sx={{ width: "12rem" }}
            onClick={menuButton.onClick}
          >
            {menuButton.text}
          </Button>
        ))}
      </Stack>
    );
  }

  return (
    <Container maxWidth="sm">
      {(() => {
        if (selected === "highScores")
          return <HighScores onBack={backToMenu} />;
        if (selected === "help") return <Help onBack={backToMenu} />;
        if (selected === "about") return <About onBack={backToMenu} />;
      })()}
    </Container>
  );
};

export default BreakoutMenu;
