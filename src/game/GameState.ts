import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "../utils/constants";

export class GameState {
  constructor() {
    console.log("gameState");
  }
  updateAll(elapsedTime: number, handleWin: () => void) {
    // console.log("updateAll");
  }
  drawAll(context: CanvasRenderingContext2D) {
    context.fillStyle = "green";
    context.fillRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
  }
}
