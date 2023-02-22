import { start_lives } from "../utils/constants";

export type GameInfo = {
  lives: number;
  score: number;
};

export const initGameInfo: GameInfo = {
  lives: start_lives,
  score: 0,
};

export type ScreenProps = {
  onBack: () => void;
  score?: number;
};

export type MenuButton = {
  text: string;
  onClick: () => void;
};

export type Page =
  | "menu"
  | "newGame"
  | "highScores"
  | "help"
  | "about"
  | "lose"
  | "win";
