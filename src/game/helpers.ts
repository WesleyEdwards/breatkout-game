import { ball_radius } from "../utils/constants";
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
  const ball_pos = ball.getPos();
  const paddle_pos = paddle.getPos();

  if (ball.getDirection().y < 0) return undefined;

  if (
    ball_pos.x + ball_radius > paddle_pos.x &&
    ball_pos.x - ball_radius < paddle_pos.x + paddle.getWidth() &&
    ball_pos.y + ball_radius > paddle_pos.y
  ) {
    // return the fraction of the paddle that the ball hit
    return (ball_pos.x - paddle_pos.x) / paddle.getWidth() - 0.5;
  }
}
