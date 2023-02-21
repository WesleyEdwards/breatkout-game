import { Coordinates, Keys } from "../helpers";
import {
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
  paddle_height,
  paddle_speed,
  paddle_width,
} from "../../utils/constants";
import { colorPalette } from "../../utils/colors";

export class Paddle {
  pos: Coordinates;
  constructor() {
    this.pos = {
      x: MAX_CANVAS_WIDTH / 2 - paddle_width / 2,
      y: MAX_CANVAS_HEIGHT - paddle_height * 2,
    };
  }

  update(elapsedTime: number, keys: Keys) {
    if (keys.direction === "left" && this.pos.x > 0) this.pos.x -= paddle_speed;

    if (
      keys.direction === "right" &&
      this.pos.x < MAX_CANVAS_WIDTH - paddle_width
    ) {
      this.pos.x += paddle_speed;
    }
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = colorPalette.paddle;
    context.fillRect(this.pos.x, this.pos.y, paddle_width, paddle_height);
  }
}
