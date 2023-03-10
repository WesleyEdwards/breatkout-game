import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import enterGamePlay from "../game/breakout_game";
import { MAX_CANVAS_WIDTH, menu_music_src } from "../utils/constants";
import { fetchImage } from "../utils/miscFunctions";
import BreakoutMenu from "./BreakoutMenu";
import { GameButton } from "./GameButton";
import { MenuBar } from "./MenuBar";
import { GameInfo, initGameInfo, Page } from "./Types";

export const GameEntry: FC = () => {
  const [play, setPlay] = useState(false);
  const [canvasRef, setCanvasRef] = useState(true);
  const [gameInfo, setGameInfo] = useState<GameInfo>({ ...initGameInfo });
  const [initialPage, setInitialPage] = useState<Page>("menu");

  const [modal, setModal] = useState(false);

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
          toggleModal: () => setModal((prev) => !prev),
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
    <>
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
            <>
              <audio id="player" autoPlay loop>
                <source src={menu_music_src} type="audio/mp3" />
              </audio>
              <BreakoutMenu
                startPlay={enterGame}
                initialPage={initialPage}
                score={gameInfo.score}
              />
            </>
          )}
        </div>
      </div>
      <Dialog
        open={modal}
        onClose={() => {
          return;
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>Pause</DialogTitle>
        <DialogContent>
          <Stack alignItems="center" gap="2rem">
            <Typography>
              To continue playing, press "Escape" or "Space"
            </Typography>
            <GameButton
              fullWidth
              onClick={() => location.reload()}
              text="Main Menu"
            />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
