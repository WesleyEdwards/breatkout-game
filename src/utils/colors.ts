import { BrickColor } from "../game/objects/Brick";

const colorLibrary = {
  dark: "#363635",
  darkSecondary: "#595A4A",
  light: "#B0FE76",
  lightSecondary: "#81E979",
  lightTertiary: "#8FBB99",
} as const;

export const colorPalette = {
  canvasBackground: colorLibrary.darkSecondary,
  paddle: colorLibrary.lightTertiary,
  ball: colorLibrary.light,
  countDown: colorLibrary.light,
  brick: [
    "yellow",
    "yellow",
    "orange",
    "orange",
    "blue",
    "blue",
    "green",
    "green",
  ] satisfies BrickColor[],
} as const;

export const countDownFont = {
  size: 60,
  font: "Monospace",
} as const;

export const life_image =
  "https://user-images.githubusercontent.com/97990557/222792775-303dc95c-2a58-4734-b83f-183f5f9b4010.png";

export const paddle_image =
  "https://user-images.githubusercontent.com/97990557/222813813-90da7484-a7a4-4203-8903-8386845b3b91.png";

export const penny_image =
  "https://user-images.githubusercontent.com/97990557/222793756-810b6b12-60c0-4579-bfc2-298a544d3c0a.png";

export const brick_images: Record<BrickColor, string> = {
  yellow:
    "https://user-images.githubusercontent.com/97990557/222806564-64df3ddc-f74c-49bd-acb0-8193159e4ef4.png",
  blue: "https://user-images.githubusercontent.com/97990557/222807289-c8534497-e61c-48d8-b2d2-ccec0e77c772.png",
  orange:
    "https://user-images.githubusercontent.com/97990557/222807299-2bf8e281-c74e-4ae2-8aa1-8cb978a98b20.png",
  green:
    "https://user-images.githubusercontent.com/97990557/222807312-a4953840-998c-4079-90e0-6f2053ffe2a6.png",
};
