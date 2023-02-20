import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "../utils/constants";

export function setUpUI() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.width = MAX_CANVAS_WIDTH;
  canvas.height = MAX_CANVAS_HEIGHT;

  const headerTitle = document.getElementById("empty");
  headerTitle?.appendChild(canvas);

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  return context;
}
