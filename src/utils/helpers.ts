export type Coordinates = {
  x: number;
  y: number;
};

export function debounceLog(val: any) {
  if (generateRandomInt(0, 100) === 1) {
    console.log(val);
  }
}

export function generateRandomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export const emptyValues = {
  prevTime: 0,
  initial: true,
  totalTime: 0,
};
