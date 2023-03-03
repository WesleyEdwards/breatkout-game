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
    // "yellow",
    // "orange",
    // "orange",
    // "blue",
    // "blue",
    "green",
    // "green",
  ] satisfies BrickColor[],
} as const;

export const countDownFont = {
  size: 60,
  font: "Monospace",
} as const;

export const life_image =
  "https://user-images.githubusercontent.com/97990557/209986272-22157ab1-35ba-4ff1-9173-f72696174670.png";
