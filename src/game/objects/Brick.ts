import { brick_images, life_image } from "../../utils/colors";
import { particles_per_column, particles_per_row } from "../../utils/constants";
import { Coordinates } from "../../utils/helpers";
import { ParticleManager } from "./ParticleManager";

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
  image: HTMLImageElement;
  constructor(
    pos: Coordinates,
    width: number,
    height: number,
    color: BrickColor,
    canvas: CanvasRenderingContext2D,
    widthExtra: number,
    firstTrain: boolean
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
    this.image = new Image();
    this.image.src = firstTrain ? life_image : brick_images[this.color];
  }

  update(elapsedTime: number) {
    if (!this.alive) {
      this.particles.update(elapsedTime);
    }
  }

  draw() {
    // this.canvas.fillStyle = this.color;
    // this.canvas.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    if (this.alive) {
      this.canvas.drawImage(
        this.image,
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
      );
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
