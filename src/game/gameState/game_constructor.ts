import { colorPalette } from "../../utils/colors";
import {
  MAX_CANVAS_WIDTH,
  bricks_per_row,
  lowest_bricks,
  brick_height,
} from "../../utils/constants";
import { Brick } from "../objects/Brick";

export type Keys = {
  direction: "left" | "right" | "none";
};

export function addEventListeners(keys: Keys) {
  window.addEventListener("keydown", ({ key }) => {
    if (key === "ArrowLeft") keys.direction = "left";
    if (key === "ArrowRight") keys.direction = "right";
  });

  window.addEventListener("keyup", ({ key }) => {
    if (key === "ArrowLeft" && keys.direction === "left")
      keys.direction = "none";
    if (key === "ArrowRight" && keys.direction === "right")
      keys.direction = "none";
  });
}

export function createBricks(canvas: CanvasRenderingContext2D): Brick[][] {
  const spaceBetweenBricks = 5;
  const emptySpaceBetween = bricks_per_row * spaceBetweenBricks;
  const screenWithEndSpace = MAX_CANVAS_WIDTH - spaceBetweenBricks;
  const brickWidth = (screenWithEndSpace - emptySpaceBetween) / bricks_per_row;

  return new Array(colorPalette.brick.length).fill(null).map((_, i) => {
    const yPos = lowest_bricks - (brick_height + spaceBetweenBricks) * i;
    return new Array(bricks_per_row).fill(null).map((_, j) => {
      const xPos = j * (brickWidth + spaceBetweenBricks) + spaceBetweenBricks;
      return new Brick(
        { x: xPos, y: yPos },
        brickWidth,
        brick_height,
        colorPalette.brick[i],
        canvas,
        spaceBetweenBricks / 2 + 3
      );
    });
  });
}
