import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "../utils/constants";
import { addEventListeners, ballPaddleCollision, Keys } from "./helpers";
import { Ball } from "./objects/Ball";
import { Paddle } from "./objects/Paddle";

export class GameState {
  private paddle: Paddle = new Paddle();
  private ball: Ball = new Ball();
  private keys: Keys = { direction: "none" };
  constructor() {
    addEventListeners(this.keys);
  }
  updateAll(elapsedTime: number, handleWin: () => void) {
    const collision = ballPaddleCollision(this.ball, this.paddle);
    this.ball.update(elapsedTime, collision);
    this.paddle.update(elapsedTime, this.keys);
  }
  drawAll(context: CanvasRenderingContext2D) {
    context.fillStyle = "green";
    context.fillRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);

    this.paddle.draw(context);
    this.ball.draw(context);
  }
}
