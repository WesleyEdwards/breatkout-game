import { GameInfo } from "../components/Types";
import { emptyValues } from "../utils/helpers";
import { displayCount } from "../utils/miscFunctions";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

type enterGameProps = {
  setGameInfo: (gameInfo: GameInfo) => void;
};

type Values = {
  prevTime: number;
  initial: boolean;
  timeElapsed: number;
  context: CanvasRenderingContext2D;
};

export function enterGamePlay(gameProps: enterGameProps) {
  let gameState: GameState | undefined;

  const context = setUpUI();
  const values: Values = {
    ...emptyValues,
    context: context,
  };

  function update(elapsedTime: number) {
    values.timeElapsed += elapsedTime;
    if (values.timeElapsed < 3000) {
      return;
    }
    gameState?.updateAll(elapsedTime, handleWin);
  }

  function render() {
    gameState?.drawAll(values.context);
    displayCount(values.timeElapsed, values.context);
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
