import { FC, useEffect, useState } from "react";
import enterGamePlay from "../game/breakout_game";
import { MAX_CANVAS_WIDTH } from "../utils/constants";
import { fetchImage } from "../utils/miscFunctions";
import BreakoutMenu from "./BreakoutMenu";
import { MenuBar } from "./MenuBar";
import { GameInfo, initGameInfo, Page } from "./Types";

export const GameEntry: FC = () => {
  const [play, setPlay] = useState(false);
  const [canvasRef, setCanvasRef] = useState(true);
  const [gameInfo, setGameInfo] = useState<GameInfo>({ ...initGameInfo });
  const [initialPage, setInitialPage] = useState<Page>("menu");

  const decrementLife = () => {
    setGameInfo((prev) => ({
      ...prev,
      lives: prev.lives - 1,
    }));
  };

  const addScore = (score: number) =>
    setGameInfo((prev) => ({ ...prev, score: prev.score + score }));

  const enterGame = () => {
    setGameInfo({ ...initGameInfo });
    setPlay(true);
  };

  const exitGame = (state: Page) => {
    setPlay(false);
    setCanvasRef(false);
    setInitialPage(state);
  };

  const onLose = () => exitGame("lose");
  const onWin = () => exitGame("win");

  useEffect(() => {
    // Canvas is recreated, so the game is removed. This is tacky.
    setCanvasRef(true);
  }, [play]);

  useEffect(() => {
    if (canvasRef && play) {
      fetchImage().then((image) => {
        enterGamePlay({
          decrementLife,
          addScore,
          onWin,
          bgImage: image,
        });
      });
    }
  }, [canvasRef, play]);

  useEffect(() => {
    if (gameInfo.lives === 0) {
      onLose();
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
          <MenuBar exitGame={() => exitGame("menu")} gameInfo={gameInfo} />
        ) : (
          <BreakoutMenu
            startPlay={enterGame}
            initialPage={initialPage}
            score={gameInfo.score}
          />
        )}
      </div>
    </div>
  );
};
