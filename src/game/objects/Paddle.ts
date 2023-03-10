import {
  MAX_CANVAS_HEIGHT,
  MAX_CANVAS_WIDTH,
  paddle_height,
  paddle_speed,
  paddle_start_pos,
  paddle_width,
  shrink_rate,
} from "../../utils/constants";
import { colorPalette, paddle_image } from "../../utils/colors";
import { Coordinates, debounceLog } from "../../utils/helpers";
import { Keys } from "../gameState/game_constructor";

export class Paddle {
  pos: Coordinates;
  canvas: CanvasRenderingContext2D;
  shrink: boolean = false;
  width: number = paddle_width;
  image: HTMLImageElement;

  constructor(canvas: CanvasRenderingContext2D) {
    this.pos = { ...paddle_start_pos };
    this.canvas = canvas;
    this.image = new Image();
    this.image.src = paddle_image;
  }

  update(elapsedTime: number, keys: Keys, losing: boolean) {
    if (losing) {
      return this.shrinkPaddle(elapsedTime);
    }
    if (this.shrink) {
      if (this.hasShrunk) this.shrink = false;
      this.shrinkPaddle(elapsedTime);
      if (this.width < 0) this.width = 0;
    }

    if (keys.direction === "left" && this.pos.x > 0) {
      this.pos.x -= paddle_speed * elapsedTime;
    }

    if (
      keys.direction === "right" &&
      this.pos.x < MAX_CANVAS_WIDTH - this.width
    ) {
      this.pos.x += paddle_speed * elapsedTime;
    }
  }

  draw() {
    this.canvas.drawImage(
      this.image,
      this.pos.x,
      this.pos.y - 10,
      this.width,
      paddle_height
    );

    // this.canvas.fillStyle = colorPalette.paddle;
    // this.canvas.fillRect(this.pos.x, this.pos.y, this.width, paddle_height);
  }

  shrinkPaddle(elapsedTime: number) {
    this.width -= shrink_rate * elapsedTime;
    this.pos.x += (shrink_rate * elapsedTime) / 2;
  }

  get hasShrunk() {
    return this.width < paddle_width / 2;
  }
}
