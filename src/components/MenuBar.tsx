import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { GameInfo } from "./Types";

interface MenuBarProps {
  exitGame: () => void;
  gameInfo: GameInfo;
}
export const MenuBar: FC<MenuBarProps> = (props) => {
  const { gameInfo, exitGame } = props;

  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        variant="h5"
        style={{
          width: "12rem",
          display: "flex",
        }}
      >
        lives: {gameInfo.lives}
      </Typography>
      <Button sx={{ width: "12rem", mt: "2rem" }} onClick={exitGame}>
        Main Menu
      </Button>
      <Typography
        variant="h5"
        style={{
          width: "12rem",
          display: "flex",
          justifyContent: "end",
        }}
      >
        score: {gameInfo.score}
      </Typography>
    </Stack>
  );
};
