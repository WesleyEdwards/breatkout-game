import { colorPalette } from "../../utils/colors";
import {
  ball_increase,
  ball_radius,
  ball_start_pos,
  ball_start_vel,
  init_ball_speed,
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
} from "../../utils/constants";
import { Coordinates } from "../../utils/helpers";

export class Ball {
  pos: Coordinates;
  direction: Coordinates;
  bricksBroken: number = 0;
  constructor() {
    this.pos = ball_start_pos;
    this.direction = ball_start_vel;
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

    this.pos.x += this.direction.x * this.speed() * elapsedTime;
    this.pos.y += this.direction.y * this.speed() * elapsedTime;
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
  speed() {
    return init_ball_speed + ball_increase * this.bricksValue();
  }
  bricksValue() {
    if (this.bricksBroken < 4) return 0;
    if (this.bricksBroken < 12) return 1;
    if (this.bricksBroken < 36) return 2;
    if (this.bricksBroken < 62) return 3;
    return 4;
  }
}
