import {
  ball_radius,
  MAX_CANVAS_HEIGHT,
  paddle_height,
  paddle_width,
} from "../../utils/constants";
import { Ball } from "../objects/Ball";
import { Brick } from "../objects/Brick";
import { Paddle } from "../objects/Paddle";
import { drawCanvas } from "./draw_functions";
import { Keys, addEventListeners, createBricks } from "./game_constructor";
import { calcBrickCollision, ballPaddleCollision } from "./game_stat_functions";

type UiFunctions = {
  handleLoseLife: () => void;
  incrementScore: (points: number) => void;
  handleWin: () => void;
};

export class GameState {
  private paddle: Paddle = new Paddle();
  private ball: Ball = new Ball();
  private ball2: Ball | null = null;
  private keys: Keys = { direction: "none" };
  private bricks: Brick[][];

  constructor(canvas: CanvasRenderingContext2D) {
    addEventListeners(this.keys);
    this.bricks = createBricks(canvas);
  }
  updateAll(
    elapsedTime: number,
    UiFunctions: UiFunctions,
    newBall: boolean = false
  ) {
    const { handleLoseLife, incrementScore, handleWin } = UiFunctions;

    if (newBall) {
      this.ball2 = new Ball({
        x: this.paddle.pos.x + paddle_width / 2,
        y: MAX_CANVAS_HEIGHT - paddle_height * 2 - ball_radius,
      });
    }

    if (this.ball2) {
      calcBrickCollision(this.ball2, this.bricks, incrementScore);
      ballPaddleCollision(this.ball2, this.paddle);
      const collision2 = ballPaddleCollision(this.ball2, this.paddle);
      this.ball2.update(elapsedTime, collision2);
      if (this.ball2.pos.y > MAX_CANVAS_HEIGHT - 5) this.ball2 = null;
    }

    calcBrickCollision(this.ball, this.bricks, incrementScore);
    const collision = ballPaddleCollision(this.ball, this.paddle);
    const lostLife = this.ball.update(elapsedTime, collision);
    if (lostLife) {
      handleLoseLife();
      this.resetState();
    }
    this.bricks.forEach((row) => row.forEach((b) => b.update(elapsedTime)));
    this.paddle.update(elapsedTime, this.keys);
    if (this.checkWinState) handleWin();
  }
  drawAll(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    drawCanvas(context, image);
    this.paddle.draw(context);
    this.ball.draw(context);
    this.ball2?.draw(context);
    this.bricks.forEach((row) => row.forEach((b) => b.draw(context)));
  }
  resetState() {
    this.ball = new Ball();
    this.ball2 = null;
    this.paddle = new Paddle();
  }

  get checkWinState() {
    return this.bricks.length === 0;
  }
}
