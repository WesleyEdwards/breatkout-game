import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

export function enterGamePlay() {
  let gameState: GameState | undefined;
  let prevTime = 0;
  let initial = true;
  const context = setUpUI();

  function update(elapsedTime: number) {
    gameState?.updateAll(elapsedTime, handleWin);
  }

  function render() {
    gameState?.drawAll(context);
  }

  function gameLoop(timeStamp: number) {
    const elapsedTime = initial ? 0 : timeStamp - prevTime;
    initial = false;

    prevTime = timeStamp;

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
    initial = true;
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
