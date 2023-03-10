import { game_music_src } from "./constants";

export class AudioPlayer {
  private audio: HTMLAudioElement;
  constructor() {
    this.audio = new Audio();
    this.audio.src = game_music_src;
    this.audio.loop = true;

    setTimeout(() => {
      this.play();
    }, 500);
  }

  play() {
    // this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
}
