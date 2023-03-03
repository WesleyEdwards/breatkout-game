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
import { UiFunctions } from "../../utils/types";

export class GameState {
  private paddle: Paddle;
  private balls: Ball[];
  private keys: Keys = { direction: "none" };
  private bricks: Brick[][];
  canvas: CanvasRenderingContext2D;

  constructor(canvas: CanvasRenderingContext2D) {
    addEventListeners(this.keys);
    this.bricks = createBricks(canvas);
    this.paddle = new Paddle(canvas);
    this.balls = [new Ball(canvas, undefined)];
    this.canvas = canvas;
  }

  updateAll(
    elapsedTime: number,
    UiFunctions: UiFunctions,
    newBall: boolean = false
  ) {
    const { handleLoseLife, incrementScore, handleWin } = UiFunctions;

    if (newBall) {
      this.balls.push(
        new Ball(this.canvas, {
          x: this.paddle.pos.x + paddle_width / 2,
          y: MAX_CANVAS_HEIGHT - paddle_height * 2 - ball_radius,
        })
      );
    }

    this.balls.forEach((ball) => {
      calcBrickCollision(ball, this.bricks, incrementScore);
      const partOfPaddleCollide = ballPaddleCollision(ball, this.paddle);
      const outOfBounds = ball.update(elapsedTime, partOfPaddleCollide);
      if (outOfBounds) {
        this.balls.splice(this.balls.indexOf(ball), 1);
      }
    });
    if (this.balls.length === 0) {
      handleLoseLife();
      this.resetState();
    }

    this.bricks.forEach((row) => row.forEach((b) => b.update(elapsedTime)));

    this.checkShrinkPaddle();

    this.paddle.update(elapsedTime, this.keys);

    if (this.checkWinState) handleWin();
  }

  drawAll(image: HTMLImageElement) {
    drawCanvas(this.canvas, image);
    this.paddle.draw();
    this.balls.forEach((ball) => ball.draw());
    this.bricks.forEach((row) => row.forEach((b) => b.draw()));
  }
  resetState() {
    this.balls = [new Ball(this.canvas, undefined)];
    this.paddle = new Paddle(this.canvas);
  }

  get checkWinState() {
    return this.bricks.length === 0;
  }

  checkShrinkPaddle() {
    if (this.paddle.hasShrunk) return;
    if (this.bricks.length === 0) return true;
    const shrinkMe = this.bricks[this.bricks.length - 1].some(
      (b) => b.alive === false
    );

    if (shrinkMe) this.paddle.shrink = true;
  }
}
