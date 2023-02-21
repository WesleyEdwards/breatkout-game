import { ball_radius, paddle_width } from "../utils/constants";
import { Ball } from "./objects/Ball";
import { Paddle } from "./objects/Paddle";

export type Coordinates = {
  x: number;
  y: number;
};

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

export function ballPaddleCollision(
  ball: Ball,
  paddle: Paddle
): number | undefined {
  if (ball.direction.y < 0) return undefined;

  if (
    ball.pos.x + ball_radius > paddle.pos.x &&
    ball.pos.x - ball_radius < paddle.pos.x + paddle_width &&
    ball.pos.y + ball_radius > paddle.pos.y
  ) {
    // return the fraction of the paddle that the ball hit
    return (ball.pos.x - paddle.pos.x) / paddle_width - 0.5;
  }
}
