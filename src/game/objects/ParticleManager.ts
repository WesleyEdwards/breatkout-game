import { gravity, particle_velocity } from "../../utils/constants";
import { Coordinates } from "../../utils/helpers";

interface Particle {
  pos: Coordinates;
  vel: Coordinates;
  width: number;
  height: number;
}

export class ParticleManager {
  private particles: Particle[];
  done: boolean = false;
  constructor(
    private context: CanvasRenderingContext2D,
    private pos1: Coordinates,
    private pos2: Coordinates,
    private color: string,
    private particlesPerRow: number,
    private particlesPerCol: number
  ) {
    this.particles = [];
    this.createParticles();
  }

  draw() {
    this.particles.forEach((particle) => {
      this.context.fillStyle = this.color;
      this.context.fillRect(
        particle.pos.x,
        particle.pos.y,
        particle.width,
        particle.height
      );
    });
  }

  update(elapsedTime: number) {
    this.particles.forEach((particle) => {
      particle.pos.x += particle.vel.x * elapsedTime;
      particle.pos.y += particle.vel.y * elapsedTime;
      particle.vel.y += particle_velocity * gravity * elapsedTime; // gravity
    });

    this.particles = this.particles.filter((p) => {
      const dist = Math.random() * 200;
      return (
        p.pos.x > this.pos1.x - dist &&
        p.pos.x < this.pos2.x + dist &&
        p.pos.y > this.pos1.y - dist &&
        p.pos.y < this.pos2.y + dist
      );
    });
    if (this.particles.length === 0) this.done = true;
  }

  createParticles() {
    const { pos1, pos2, particlesPerRow, particlesPerCol } = this;
    const { x: x1, y: y1 } = pos1;
    const { x: x2, y: y2 } = pos2;
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const xStep = xDiff / particlesPerRow;
    const yStep = yDiff / particlesPerCol;
    for (let i = 0; i < particlesPerRow; i++) {
      for (let j = 0; j < particlesPerCol; j++) {
        const x = x1 + i * xStep;
        const y = y1 + j * yStep;
        const vel = {
          x: (Math.random() * 2 - 1) * particle_velocity, // -1 to 1
          y: (Math.random() * 2 - 1) * particle_velocity,
        };
        this.particles.push({
          pos: { x, y },
          vel,
          width: xStep,
          height: yStep,
        });
      }
    }
  }
}
