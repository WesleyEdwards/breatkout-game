import { EnterGameProps } from "../components/Types";
import { AudioPlayer } from "../utils/AudioPlayer";
import { GameStatsManager } from "../utils/GameStatsManager";
import { debounceLog } from "../utils/helpers";
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
    toggleModal,
  };

  let gameState: GameState | undefined;
  const context = setUpUI();

  function update(elapsedTime: number) {
    stats.addElapsedTime(elapsedTime);

    if (stats.countingDown) return;

    const newBall = stats.checkNewBall();
    gameState?.updateAll(elapsedTime, uiFunctions, stats.paused, newBall);
  }

  function render() {
    if (stats.paused) return;
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

  function toggleModal() {
    stats.togglePause();
    gameProps.toggleModal();
  }

  startGame();
}

export default enterGamePlay;
