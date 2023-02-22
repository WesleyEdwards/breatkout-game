import { Card, CardContent, Container, Stack } from "@mui/material";
import React, { FC, useState } from "react";
import { GameButton } from "./GameButton";
import About from "./menuPages/About";
import Help from "./menuPages/Help";
import { HighScores } from "./menuPages/HighScores";
import LoseScreen from "./menuPages/LoseScreen";
import { MenuButton, Page } from "./Types";

type BreakoutMenuProps = {
  startPlay: () => void;
  initialPage?: Page;
};
export const BreakoutMenu: FC<BreakoutMenuProps> = (props) => {
  const { startPlay, initialPage = "menu" } = props;

  const [selected, setSelected] = useState<Page>(initialPage);

  const menuButtons: MenuButton[] = [
    { text: "New Game", onClick: startPlay },
    { text: "High Scores", onClick: () => setSelected("highScores") },
    { text: "Help", onClick: () => setSelected("help") },
    { text: "About", onClick: () => setSelected("about") },
    { text: "PREVIEW LOSE", onClick: () => setSelected("lose") },
  ];

  const backToMenu = () => setSelected("menu");

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          {(() => {
            if (selected === "menu") {
              return (
                <Stack
                  height="16rem"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  {menuButtons.map((menuButton) => (
                    <GameButton
                      key={menuButton.text}
                      onClick={menuButton.onClick}
                      text={menuButton.text}
                    />
                  ))}
                </Stack>
              );
            }

            if (selected === "highScores")
              return <HighScores onBack={backToMenu} />;
            if (selected === "help") return <Help onBack={backToMenu} />;
            if (selected === "about") return <About onBack={backToMenu} />;
            if (selected === "lose") return <LoseScreen onBack={backToMenu} />;
          })()}
        </CardContent>
      </Card>
    </Container>
  );
};

export default BreakoutMenu;
