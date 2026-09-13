// Audio synthesizer and music controller for Rahma Riad song and gate sound effects

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private rahmaAudio: HTMLAudioElement | null = null;
  private isSongPlaying: boolean = false;
  private listeners: ((playing: boolean) => void)[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public initRahmaSong() {
    if (!this.rahmaAudio) {
      this.rahmaAudio = new Audio('/audio/rahma_riad_alkawkab.mp3');
      this.rahmaAudio.loop = true;
      this.rahmaAudio.volume = 0.75;

      this.rahmaAudio.addEventListener('play', () => {
        this.isSongPlaying = true;
        this.notifyListeners(true);
      });

      this.rahmaAudio.addEventListener('pause', () => {
        this.isSongPlaying = false;
        this.notifyListeners(false);
      });

      this.rahmaAudio.addEventListener('ended', () => {
        this.isSongPlaying = false;
        this.notifyListeners(false);
      });
    }
  }

  public onSongStateChange(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notifyListeners(playing: boolean) {
    this.listeners.forEach((cb) => cb(playing));
  }

  public isMusicPlaying(): boolean {
    return this.isSongPlaying;
  }

  // Play Rahma Riad's song
  public playRahmaSong() {
    if (this.isMuted) return;
    this.initRahmaSong();
    if (this.rahmaAudio) {
      this.rahmaAudio.currentTime = 0;
      this.rahmaAudio.play().catch(() => {
        // User browser autoplay policy might require direct gesture
      });
    }
  }

  public toggleSong(): boolean {
    this.initRahmaSong();
    if (!this.rahmaAudio) return false;

    if (this.isSongPlaying) {
      this.rahmaAudio.pause();
      return false;
    } else {
      if (this.isMuted) {
        this.setMuted(false);
      }
      this.rahmaAudio.play().catch(() => {});
      return true;
    }
  }

  public pauseSong() {
    if (this.rahmaAudio) {
      this.rahmaAudio.pause();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.rahmaAudio) {
      this.rahmaAudio.muted = muted;
      if (muted && this.isSongPlaying) {
        this.rahmaAudio.pause();
      }
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  // Knocking sound on the palace door
  public playDoorKnock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      [0, 0.14].forEach((delay) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, now + delay);
        osc.frequency.exponentialRampToValueAtTime(45, now + delay + 0.12);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now + delay);

        gain.gain.setValueAtTime(0.5, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.16);
      });
    } catch {
      // Audio block catch
    }
  }

  // Glistening golden chimes and magic flourish
  public playMagicChimes() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [587.33, 739.99, 880.00, 1108.73, 1174.66, 1479.98, 1760.00, 2217.46];

      freqs.forEach((freq, idx) => {
        const startTime = now + idx * 0.08;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch {
      // Audio block catch
    }
  }
}

export const sound = new SoundManager();
