import { Button, Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import enterGamePlay from "../game/breakout_game";
import { MAX_CANVAS_HEIGHT } from "../utils/constants";
import BreakoutMenu from "./BreakoutMenu";

export const GameEntry: FC = () => {
  const [play, setPlay] = useState(false);
  const [canvasRef, setCanvasRef] = useState(true);

  const enterGame = () => {
    setPlay(true);
    enterGamePlay();
  };

  const exitGame = () => {
    setCanvasRef(false);
    setPlay(false);
  };

  useEffect(() => {
    setCanvasRef(true);
  }, [play]);

  return (
    <Stack justifyItems="center" alignItems="center">
      {canvasRef && <div id="empty"></div>}
      {play ? (
        <Button
          id="pause"
          sx={{ width: "12rem", mt: "2rem" }}
          onClick={exitGame}
        >
          Pause
        </Button>
      ) : (
        <BreakoutMenu startPlay={enterGame} />
      )}
    </Stack>
  );
};
