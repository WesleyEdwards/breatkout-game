import { EnterGameProps } from "../components/Types";
import { points_for_new_ball, start_lives } from "../utils/constants";
import { emptyValues } from "../utils/helpers";
import { displayCount } from "../utils/miscFunctions";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

type Values = {
  prevTime: number;
  initial: boolean;
  totalTime: number;
  lives: number;
  totalScore: number;
  pointsToNewBall: number;
  newBall?: boolean;
};

export function enterGamePlay(gameProps: EnterGameProps) {
  const audio = new Audio();
  audio.src = "/sounds/swing-train.mp3";
  audio.loop = true;
  // audio.play();

  let gameState: GameState | undefined;

  const context = setUpUI();
  let values: Values = { ...emptyValues, lives: start_lives };

  function update(elapsedTime: number) {
    values.totalTime += elapsedTime;
    if (values.totalTime < 3000) {
      return;
    }
    if (values.pointsToNewBall >= points_for_new_ball) {
      values.pointsToNewBall = 0;
      values.newBall = true;
    }
    gameState?.updateAll(
      elapsedTime,
      {
        handleLoseLife,
        incrementScore,
        handleWin,
      },
      values.newBall
    );
    values.newBall = false;
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
    values.totalScore += points;
    values.pointsToNewBall += points;

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
