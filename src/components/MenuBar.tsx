import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { life_image } from "../utils/colors";
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
      <div
        style={{
          width: "12rem",
          display: "flex",
        }}
      >
        {new Array(gameInfo.lives).fill(null).map((_, i) => (
          <img
            src={life_image}
            style={{
              objectFit: "contain",
            }}
            alt="heart"
            width="50px"
            height="50px"
            key={i}
          />
        ))}
      </div>
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
