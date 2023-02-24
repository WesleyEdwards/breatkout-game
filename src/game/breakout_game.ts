import { EnterGameProps } from "../components/Types";
import { emptyValues } from "../utils/helpers";
import { displayCount } from "../utils/miscFunctions";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

type Values = {
  prevTime: number;
  initial: boolean;
  totalTime: number;
};

export function enterGamePlay(gameProps: EnterGameProps) {
  let gameState: GameState | undefined;

  const context = setUpUI();
  let values: Values = { ...emptyValues };

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
    gameState?.drawAll(context);
    displayCount(values.totalTime, context);
  }

  function gameLoop(timeStamp: number) {
    const elapsedTime = values.initial ? 0 : timeStamp - values.prevTime;

    values.initial = false;
    values.prevTime = timeStamp;

    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop);
  }

  function handleWin() {
    gameState = undefined;
    gameProps.onWin();
  }

  function handleLoseLife() {
    gameProps.decrementLife();
    values = { ...emptyValues };
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
