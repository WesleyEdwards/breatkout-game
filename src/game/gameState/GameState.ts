import { addEventListeners, ballPaddleCollision, Keys } from "../helpers";
import { Ball } from "../objects/Ball";
import { Brick } from "../objects/Brick";
import { Paddle } from "../objects/Paddle";
import { calcBrickCollision, createBricks } from "./game_stat_functions";
import { drawCanvas } from "./draw_functions";

export class GameState {
  private paddle: Paddle = new Paddle();
  private ball: Ball = new Ball();
  private keys: Keys = { direction: "none" };
  private bricks: Brick[] = createBricks();
  constructor() {
    addEventListeners(this.keys);
  }
  updateAll(elapsedTime: number, handleWin: () => void) {
    const collision = ballPaddleCollision(this.ball, this.paddle);
    calcBrickCollision(this.ball, this.bricks);
    this.ball.update(elapsedTime, collision);
    this.paddle.update(elapsedTime, this.keys);
  }
  drawAll(context: CanvasRenderingContext2D) {
    drawCanvas(context);
    this.paddle.draw(context);
    this.ball.draw(context);
    this.bricks.forEach((brick) => brick.draw(context));
  }
}
