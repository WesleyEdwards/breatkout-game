import { colorPalette } from "../../utils/colors";
import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "../../utils/constants";

export const drawCanvas = (context: CanvasRenderingContext2D) => {
  context.fillStyle = colorPalette.canvasBackground;
  context.fillRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
};
