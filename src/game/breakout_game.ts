import { emptyValues } from "../utils/helpers";
import { displayCount } from "../utils/miscFunctions";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

type EnterGameProps = {
  decrementLife: () => void;
  addScore: (score: number) => void;
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
    gameState?.updateAll(elapsedTime, handleLoseLife);
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

  const handleLoseLife = () => {
    gameProps.decrementLife();
    values = { ...emptyValues };
  };
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
