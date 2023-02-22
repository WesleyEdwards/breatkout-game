import {
  ball_radius,
  brick_line_points,
  brick_points_map,
  paddle_width,
} from "../../utils/constants";
import { Ball } from "../objects/Ball";
import { Brick } from "../objects/Brick";
import { Paddle } from "../objects/Paddle";

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
    // return the paddle is hit, between -0.5 and 0.5
    return (ball.pos.x - paddle.pos.x) / paddle_width - 0.5;
  }
}

export function calcBrickCollision(
  ball: Ball,
  bricks: Brick[][],
  incrementScore: (points: number) => void
): void {
  bricks.forEach((row) => {
    row.forEach((brick) => {
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
          ball.bricksBroken += 1;

          Object.entries(brick_points_map).forEach(([color, points]) => {
            if (brick.color === color) incrementScore(points);
          });
        }
      }
    });
  });
  bricks.forEach((row) => {
    if (row.every((b) => b.alive === false)) {
      bricks.splice(bricks.indexOf(row), 1);
      incrementScore(brick_line_points);
    }
  });
}
