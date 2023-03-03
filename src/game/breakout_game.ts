import { EnterGameProps } from "../components/Types";
import { AudioPlayer } from "../utils/AudioPlayer";
import { GameStatsManager } from "../utils/GameStatsManager";
import { displayCount } from "../utils/miscFunctions";
import { UiFunctions } from "../utils/types";
import { GameState } from "./gameState/GameState";
import { setUpUI } from "./setUpUI";

export function enterGamePlay(gameProps: EnterGameProps) {
  const audio = new AudioPlayer();
  const stats: GameStatsManager = new GameStatsManager();
  const uiFunctions: UiFunctions = {
    handleLoseLife,
    incrementScore,
    handleWin,
  };

  let gameState: GameState | undefined;
  const context = setUpUI();

  function update(elapsedTime: number) {
    stats.addElapsedTime(elapsedTime);

    if (stats.countingDown) return;

    const newBall = stats.checkNewBall();
    gameState?.updateAll(elapsedTime, uiFunctions, newBall);
  }

  function render() {
    gameState?.drawAll(gameProps.bgImage);
    displayCount(stats.totalTime, context);
  }

  function gameLoop(timeStamp: number) {
    if (stats.lives === 0) {
      return audio.pause();
    }
    const elapsedTime = stats.elapsedTime(timeStamp);

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
    stats.loseLife();
  }

  function incrementScore(points: number) {
    stats.incrementScore(points);
    gameProps.addScore(points);
  }
  function startGame() {
    stats.startGame();
    gameState = new GameState(context);
    requestAnimationFrame(gameLoop);
  }

  startGame();
}

export default enterGamePlay;
