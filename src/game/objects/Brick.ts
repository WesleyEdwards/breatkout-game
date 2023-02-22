import { Coordinates } from "../../utils/helpers";

export type BrickColor = "yellow" | "orange" | "blue" | "green";
export class Brick {
  pos: Coordinates;
  width: number;
  height: number;
  color: BrickColor;
  alive: boolean = true;
  constructor(
    pos: Coordinates,
    width: number,
    height: number,
    color: BrickColor
  ) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.alive) {
      context.fillStyle = this.color;
      context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
