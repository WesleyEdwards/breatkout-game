import { Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import enterGamePlay from "../game/breakout_game";
import { MAX_CANVAS_WIDTH } from "../utils/constants";
import BreakoutMenu from "./BreakoutMenu";
import { MenuBar } from "./MenuBar";
import { GameInfo, initGameInfo } from "./Types";

export const GameEntry: FC = () => {
  const [play, setPlay] = useState(false);
  const [canvasRef, setCanvasRef] = useState(true);
  const [gameInfo, setGameInfo] = useState<GameInfo>(initGameInfo);

  const enterGame = () => {
    setPlay(true);
    enterGamePlay({ setGameInfo });
  };

  const exitGame = () => {
    setCanvasRef(false);
    setPlay(false);
  };

  useEffect(() => {
    setCanvasRef(true);
  }, [play]);

  return (
    <Stack
      justifyItems="center"
      alignItems="center"
      width={`${MAX_CANVAS_WIDTH}px`}
    >
      {canvasRef && <div id="empty"></div>}
      {play ? (
        <MenuBar exitGame={exitGame} gameInfo={gameInfo} />
      ) : (
        <BreakoutMenu startPlay={enterGame} />
      )}
    </Stack>
  );
};
