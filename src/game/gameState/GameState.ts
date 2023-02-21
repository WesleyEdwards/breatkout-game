import { Ball } from "../objects/Ball";
import { Brick } from "../objects/Brick";
import { Paddle } from "../objects/Paddle";
import { drawCanvas } from "./draw_functions";
import { Keys, addEventListeners, createBricks } from "./game_constructor";
import { calcBrickCollision, ballPaddleCollision } from "./game_stat_functions";

export class GameState {
  private paddle: Paddle = new Paddle();
  private ball: Ball = new Ball();
  private keys: Keys = { direction: "none" };
  private bricks: Brick[][] = createBricks();
  constructor() {
    addEventListeners(this.keys);
  }
  updateAll(elapsedTime: number, handleWin: () => void) {
    calcBrickCollision(this.ball, this.bricks);

    const collision = ballPaddleCollision(this.ball, this.paddle);
    this.ball.update(elapsedTime, collision);
    this.paddle.update(elapsedTime, this.keys);
  }
  drawAll(context: CanvasRenderingContext2D) {
    drawCanvas(context);
    this.paddle.draw(context);
    this.ball.draw(context);
    this.bricks.forEach((row) => row.forEach((b) => b.draw(context)));
  }
}
