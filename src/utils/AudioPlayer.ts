import { audio_src } from "./constants";

export class AudioPlayer {
  private audio: HTMLAudioElement;
  constructor() {
    this.audio = new Audio();
    this.audio.src = audio_src;
    this.audio.loop = true;
    // this.play();
  }

  play() {
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
}
