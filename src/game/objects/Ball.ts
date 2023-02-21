import { colorPalette } from "../../utils/colors";
import {
  ball_radius,
  init_ball_speed,
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
} from "../../utils/constants";
import { Coordinates } from "../helpers";

export class Ball {
  pos: Coordinates;
  speed: number;
  direction: Coordinates;
  constructor() {
    this.pos = {
      x: MAX_CANVAS_WIDTH / 4,
      y: MAX_CANVAS_HEIGHT / 2,
    };
    this.speed = init_ball_speed;
    this.direction = {
      x: 0.5,
      y: 0.5,
    };
  }

  update(elapsedTime: number, collision?: number) {
    if (collision) {
      this.handleCollision(collision);
    }
    if (this.pos.x + ball_radius > MAX_CANVAS_WIDTH) {
      this.direction.x *= -1;
    }
    if (this.pos.x - ball_radius < 0) {
      this.direction.x *= -1;
    }
    if (this.pos.y + ball_radius > MAX_CANVAS_HEIGHT) {
      this.reverseY();
    }
    if (this.pos.y - ball_radius < 0) {
      this.reverseY();
    }

    this.pos.x += this.direction.x * this.speed * elapsedTime;
    this.pos.y += this.direction.y * this.speed * elapsedTime;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = colorPalette.ball;
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, ball_radius, 0, 2 * Math.PI);
    context.fill();
  }

  handleCollision(partOfPaddle: number) {
    this.direction.x = partOfPaddle;
    this.direction.y = 1 - Math.abs(this.direction.x);
    this.reverseY();
  }

  reverseY() {
    this.direction.y *= -1;
  }
}
