import { Coordinates } from "../../utils/helpers";

export class Brick {
  pos: Coordinates;
  width: number;
  height: number;
  color: string;
  alive: boolean = true;
  constructor(pos: Coordinates, width: number, height: number, color: string) {
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
