import { colorPalette, countDownFont } from "./colors";
import { MAX_CANVAS_HEIGHT, MAX_CANVAS_WIDTH } from "./constants";

export function displayCount(
  timeElapsed: number,
  canvas: CanvasRenderingContext2D
) {
  const count = Math.floor((4000 - timeElapsed) / 1000);

  canvas.font = `${countDownFont.size}px ${countDownFont.font}`;
  canvas.fillStyle = colorPalette.countDown;
  canvas.textAlign = "center";

  if (timeElapsed > 3000 && timeElapsed < 4000) {
    canvas.fillText("GO!", MAX_CANVAS_WIDTH / 2, MAX_CANVAS_HEIGHT * 0.7);
  }
  if (count > 0) {
    canvas.fillText(
      count.toString(),
      MAX_CANVAS_WIDTH / 2,
      MAX_CANVAS_HEIGHT * 0.7
    );
  }
}

export type ScoreRecord = {
  name?: string;
  score: number;
};

const scoreStorageName = "breakout-scores";

export function addScoreToStorage(name: string, score: number) {
  const scores: ScoreRecord[] = getScoresFromStorage();
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  if (scores.length > 10) scores.pop();
  localStorage.setItem(scoreStorageName, JSON.stringify(scores));
}

export function getScoresFromStorage(): ScoreRecord[] {
  const scores = localStorage.getItem(scoreStorageName);
  return scores ? JSON.parse(scores) : [];
}
