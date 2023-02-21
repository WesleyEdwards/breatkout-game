import { colorPalette } from "../../utils/colors";
import {
  bricks_per_row,
  brick_height,
  lowest_bricks,
  MAX_CANVAS_WIDTH,
} from "../../utils/constants";
import { Ball } from "../objects/Ball";
import { Brick } from "../objects/Brick";

export function createBricks(): Brick[] {
  const spaceBetweenBricks = 5;
  const brickWidth =
    (MAX_CANVAS_WIDTH - bricks_per_row * spaceBetweenBricks) / bricks_per_row;

  const bricks: Brick[] = [];

  new Array(bricks_per_row).fill(null).map((_, i) => {
    const xPos = i * (brickWidth + spaceBetweenBricks) + spaceBetweenBricks;

    colorPalette.brick.forEach((color, i) => {
      const yPos = lowest_bricks - (brick_height + spaceBetweenBricks) * i;
      bricks.push(
        new Brick({ x: xPos, y: yPos }, brickWidth, brick_height, color)
      );
    });
  });
  return bricks;
}

export function calcBrickCollision(ball: Ball, bricks: Brick[]): void {
  bricks.forEach((brick) => {
    if (brick.alive) {
      const brickPos = brick.pos;
      const brickWidth = brick.width;
      const brickHeight = brick.height;

      if (
        ball.pos.x > brickPos.x &&
        ball.pos.x < brickPos.x + brickWidth &&
        ball.pos.y > brickPos.y &&
        ball.pos.y < brickPos.y + brickHeight
      ) {
        brick.alive = false;
        ball.reverseY();
      }
    }
  });
}
