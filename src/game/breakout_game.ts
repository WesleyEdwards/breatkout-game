import { EnterGameProps } from "../components/Types";
import { start_lives } from "../utils/constants";
import { emptyValues } from "../utils/helpers";
import { displayCount } from "../utils/miscFunctions";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

type Values = {
  prevTime: number;
  initial: boolean;
  totalTime: number;
  lives: number;
};

export function enterGamePlay(gameProps: EnterGameProps) {
  const audio = new Audio();
  audio.src = "/sounds/swing-train.mp3";
  audio.loop = true;
  audio.play();

  let gameState: GameState | undefined;

  const context = setUpUI();
  let values: Values = { ...emptyValues, lives: start_lives };

  function update(elapsedTime: number) {
    values.totalTime += elapsedTime;
    if (values.totalTime < 3000) {
      return;
    }
    gameState?.updateAll(elapsedTime, {
      handleLoseLife,
      incrementScore,
      handleWin,
    });
  }

  function render() {
    gameState?.drawAll(context, gameProps.bgImage);
    displayCount(values.totalTime, context);
  }

  function gameLoop(timeStamp: number) {
    if (values.lives === 0) {
      return audio.pause();
    }
    const elapsedTime = values.initial ? 0 : timeStamp - values.prevTime;

    values.initial = false;
    values.prevTime = timeStamp;

    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop);
  }

  function handleWin() {
    audio.pause();
    gameState = undefined;
    gameProps.onWin();
  }

  function handleLoseLife() {
    gameProps.decrementLife();
    values = { ...emptyValues, lives: values.lives - 1 };
  }

  function incrementScore(points: number) {
    gameProps.addScore(points);
  }
  function startGame() {
    values.initial = true;
    gameState = new GameState();
    requestAnimationFrame(gameLoop);
  }

  startGame();
}

export default enterGamePlay;
