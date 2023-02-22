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
  updateAll(
    elapsedTime: number,
    handleLoseLife: () => void,
    incrementScore: (points: number) => void
  ) {
    calcBrickCollision(this.ball, this.bricks, incrementScore);

    const collision = ballPaddleCollision(this.ball, this.paddle);
    const lostLife = this.ball.update(elapsedTime, collision);
    if (lostLife) {
      handleLoseLife();
      this.resetState();
    }
    this.paddle.update(elapsedTime, this.keys);
  }
  drawAll(context: CanvasRenderingContext2D) {
    drawCanvas(context);
    this.paddle.draw(context);
    this.ball.draw(context);
    this.bricks.forEach((row) => row.forEach((b) => b.draw(context)));
  }
  resetState() {
    this.ball = new Ball();
    this.paddle = new Paddle();
  }
}
