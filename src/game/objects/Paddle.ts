import {
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
  paddle_height,
  paddle_speed,
  paddle_start_pos,
  paddle_width,
} from "../../utils/constants";
import { colorPalette } from "../../utils/colors";
import { Coordinates } from "../../utils/helpers";
import { Keys } from "../gameState/game_constructor";

export class Paddle {
  pos: Coordinates;
  constructor() {
    this.pos = { ...paddle_start_pos };
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
