import { BrickColor } from "../game/objects/Brick";
import { Coordinates } from "./helpers";

export const audio_src = "/sounds/swing-train.mp3";

export const start_lives = 3;

export const MAX_CANVAS_WIDTH = 1024;
export const MAX_CANVAS_HEIGHT = 576;

export const paddle_height = 20;
export const paddle_width = 100;
export const paddle_speed = 0.6;

export const init_ball_speed = 0.3;
export const ball_increase = 0.1;
export const ball_radius = 10;

export const lowest_bricks = 220;
export const brick_height = 20;
export const bricks_per_row = 14;

export const particles_per_row = 50;
export const particles_per_column = 10;
export const particle_velocity = 0.1;
export const gravity = 0.005;

export const points_for_new_ball = 100;

export const paddle_start_pos: Coordinates = {
  x: MAX_CANVAS_WIDTH / 2 - paddle_width / 2,
  y: MAX_CANVAS_HEIGHT - paddle_height * 2,
};

export const ball_start_pos: Coordinates = {
  x: paddle_start_pos.x + paddle_width / 2,
  y: MAX_CANVAS_HEIGHT - paddle_height * 2 - ball_radius,
};
export const ball_start_vel: Coordinates = {
  x: 0.25,
  y: -0.75,
};

export const brick_points_map: Record<BrickColor, number> = {
  yellow: 1,
  orange: 2,
  blue: 3,
  green: 5,
};

export const brick_line_points = 25;
