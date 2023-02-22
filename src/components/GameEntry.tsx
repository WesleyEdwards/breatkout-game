import { FC, useEffect, useState } from "react";
import enterGamePlay from "../game/breakout_game";
import { MAX_CANVAS_WIDTH } from "../utils/constants";
import BreakoutMenu from "./BreakoutMenu";
import { MenuBar } from "./MenuBar";
import { GameInfo, initGameInfo, Page } from "./Types";

export const GameEntry: FC = () => {
  const [play, setPlay] = useState(false);
  const [canvasRef, setCanvasRef] = useState(true);
  const [gameInfo, setGameInfo] = useState<GameInfo>(initGameInfo);
  const [initialPage, setInitialPage] = useState<Page>();

  const decrementLife = () =>
    setGameInfo((prev) => ({
      ...prev,
      lives: prev.lives - 1,
    }));

  const addScore = (score: number) =>
    setGameInfo((prev) => ({ ...prev, score: prev.score + score }));

  const enterGame = () => {
    setPlay(true);
    enterGamePlay({
      decrementLife,
      addScore,
    });
  };

  const exitGame = () => {
    setCanvasRef(false);
    setPlay(false);
    setInitialPage("lose");
  };

  useEffect(() => {
    setCanvasRef(true);
  }, [play]);

  useEffect(() => {
    if (gameInfo.lives === 0) {
      exitGame();
    }
  }, [gameInfo.lives]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: `${MAX_CANVAS_WIDTH}px` }}>
        {canvasRef && <div id="empty"></div>}
        {play ? (
          <MenuBar exitGame={exitGame} gameInfo={gameInfo} />
        ) : (
          <BreakoutMenu startPlay={enterGame} initialPage={initialPage} />
        )}
      </div>
    </div>
  );
};
