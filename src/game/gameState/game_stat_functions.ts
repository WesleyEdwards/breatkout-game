import { ball_radius, paddle_width } from "../../utils/constants";
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
    // return the fraction of the paddle that the ball hit
    return (ball.pos.x - paddle.pos.x) / paddle_width - 0.5;
  }
}

export function calcBrickCollision(ball: Ball, bricks: Brick[][]): void {
  bricks.forEach((row) =>
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
        }
      }
    })
  );
}
