import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { life_image } from "../utils/colors";
import { GameButton } from "./GameButton";
import { GameInfo, Page } from "./Types";

interface MenuBarProps {
  exitGame: () => void;
  gameInfo: GameInfo;
}
export const MenuBar: FC<MenuBarProps> = (props) => {
  const { gameInfo } = props;
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
      <Typography>Pause: Esc or Space</Typography>
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
