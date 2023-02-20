import {
  ball_radius,
  init_ball_speed,
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
} from "../../utils/constants";
import { Coordinates } from "../helpers";

export class Ball {
  private pos: Coordinates;
  private speed: number;
  private direction: Coordinates;
  constructor() {
    this.pos = {
      x: MAX_CANVAS_WIDTH / 4,
      y: MAX_CANVAS_HEIGHT / 2,
    };
    this.speed = init_ball_speed;
    this.direction = {
      x: 1,
      y: 1,
    };
  }
  update(elapsedTime: number, collision: boolean) {
    if (collision) {
      this.direction.y *= -1;
    }
    if (this.pos.x + ball_radius > MAX_CANVAS_WIDTH) {
      this.direction.x *= -1;
    }
    if (this.pos.x - ball_radius < 0) {
      this.direction.x *= -1;
    }
    if (this.pos.y + ball_radius > MAX_CANVAS_HEIGHT) {
      this.direction.y *= -1;
    }
    if (this.pos.y - ball_radius < 0) {
      this.direction.y *= -1;
    }

    this.pos.x += this.direction.x * this.speed * elapsedTime;
    this.pos.y += this.direction.y * this.speed * elapsedTime;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, ball_radius, 0, 2 * Math.PI);
    context.fill();
  }
  getPos() {
    return this.pos;
  }
  getDirection() {
    return this.direction;
  }
}
