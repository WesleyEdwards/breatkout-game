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
  canvas: CanvasRenderingContext2D;
  constructor(
    canvas: CanvasRenderingContext2D,
    startPos: Coordinates | undefined
  ) {
    this.pos = startPos ? { ...startPos } : { ...ball_start_pos };
    this.direction = { ...ball_start_vel };
    this.canvas = canvas;
  }

  update(elapsedTime: number, collision?: number): boolean {
    if (collision) {
      this.handleCollision(collision);
    }
    if (this.pos.x + ball_radius > MAX_CANVAS_WIDTH) {
      this.reverseX();
    }
    if (this.pos.x - ball_radius < 0) {
      this.reverseX();
    }
    if (this.pos.y - ball_radius < 0) {
      this.reverseY();
    }
    if (this.pos.y > MAX_CANVAS_HEIGHT - 5) {
      return true;
    }

    this.pos.x += this.direction.x * this.speed() * elapsedTime;
    this.pos.y += this.direction.y * this.speed() * elapsedTime;
    return false;
  }
  draw() {
    this.canvas.fillStyle = colorPalette.ball;
    this.canvas.beginPath();
    this.canvas.arc(this.pos.x, this.pos.y, ball_radius, 0, 2 * Math.PI);
    this.canvas.fill();
  }

  handleCollision(partOfPaddle: number) {
    this.direction.x = partOfPaddle;
    this.direction.y = 1 - Math.abs(this.direction.x);
    this.reverseY();
  }

  reverseY() {
    this.direction.y *= -1;
  }
  reverseX() {
    this.direction.x *= -1;
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
