import { points_for_new_ball, start_lives } from "./constants";

export class GameStatsManager {
  prevTime: number = 0;
  initial: boolean = true;
  totalTime: number = 0;
  lives: number = start_lives;
  totalScore: number = 0;
  pointsToNewBall: number = 0;
  //   newBall: boolean = false;
  constructor() {}

  addElapsedTime(elapsedTime: number) {
    this.totalTime += elapsedTime;
  }

  checkNewBall(): boolean {
    if (this.pointsToNewBall >= points_for_new_ball) {
      this.pointsToNewBall = this.pointsToNewBall - points_for_new_ball;
      return true;
    }
    return false;
  }

  get countingDown() {
    return this.totalTime < 3000;
  }
  elapsedTime(timeStamp: number): number {
    const elapsed = this.initial ? 0 : timeStamp - this.prevTime;
    this.initial = false;
    this.prevTime = timeStamp;
    return elapsed;
  }
  loseLife() {
    this.lives--;
    this.totalScore = 0;
    this.prevTime = 0;
    this.initial = true;
    this.totalTime = 0;
  }

  incrementScore(points: number) {
    this.totalScore += points;
    this.pointsToNewBall += points;
  }
  startGame() {
    this.initial = true;
  }
}
