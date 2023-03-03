import { particles_per_column, particles_per_row } from "../../utils/constants";
import { Coordinates } from "../../utils/helpers";
import { ParticleManager } from "./ParticleManafer";

export type BrickColor = "yellow" | "orange" | "blue" | "green";
export class Brick {
  pos: Coordinates;
  width: number;
  height: number;
  color: BrickColor;
  alive: boolean = true;
  particles: ParticleManager;
  canvas: CanvasRenderingContext2D;
  widthExtra: number;
  constructor(
    pos: Coordinates,
    width: number,
    height: number,
    color: BrickColor,
    canvas: CanvasRenderingContext2D,
    widthExtra: number
  ) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvas = canvas;
    this.widthExtra = widthExtra;
    this.particles = new ParticleManager(
      canvas,
      this.pos,
      { x: this.pos.x + this.width, y: this.pos.y + this.height },
      this.color,
      particles_per_row,
      particles_per_column
    );
  }

  update(elapsedTime: number) {
    if (!this.alive) {
      this.particles.update(elapsedTime);
    }
  }

  draw() {
    if (this.alive) {
      this.canvas.fillStyle = this.color;
      this.canvas.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    } else {
      this.particles.draw();
    }
  }
  get isDone() {
    return this.particles.done;
  }

  get ownedPos() {
    return { ...this.pos, x: this.pos.x - this.widthExtra };
  }
  get ownedWidth() {
    return this.width + this.widthExtra * 2;
  }
}
