import { emptyValues } from "../utils/helpers";
import { displayCount } from "../utils/miscFunctions";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

type EnterGameProps = {
  decrementLife: () => void;
  addScore: (score: number) => void;
  onWin: () => void;
};

type Values = {
  prevTime: number;
  initial: boolean;
  timeElapsed: number;
};

export function enterGamePlay(gameProps: EnterGameProps) {
  let gameState: GameState | undefined;

  const context = setUpUI();
  let values: Values = { ...emptyValues };

  function update(elapsedTime: number) {
    values.timeElapsed += elapsedTime;
    if (values.timeElapsed < 3000) {
      return;
    }
    gameState?.updateAll(elapsedTime, handleLoseLife, handleIncrementScore);
  }

  function render() {
    gameState?.drawAll(context);
    displayCount(values.timeElapsed, context);
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
    // handleWinUi(time, score, dimensions, () => initializeGameUi(startGame));
  }

  function handleLoseLife() {
    gameProps.decrementLife();
    values = { ...emptyValues };
  }

  function handleIncrementScore(points: number) {
    gameProps.addScore(points);
  }
  function startGame() {
    // setupCanvas(canvas, context, startOver);
    values.initial = true;
    gameState = new GameState();
    requestAnimationFrame(gameLoop);
  }

  function startOver() {
    gameState = undefined;
    // initializeGameUi(startGame);
  }

  startGame();
}

export default enterGamePlay;
