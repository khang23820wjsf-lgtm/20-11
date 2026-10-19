/**
 * Pure Web Audio API Ambient Soundscape & Interactive Harmonic Synthesizer
 * Provides an organic, warm, meditative cinematic soundscape without external MP3 dependencies.
 * Never autoplays; only starts on explicit user click.
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;
  private oscillators: OscillatorNode[] = [];

  public init() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    try {
      this.init();
      if (!this.ctx) return;

      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      // Clean up any existing oscillators
      this.oscillators.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {
          // ignore
        }
      });
      this.oscillators = [];

      this.isPlaying = true;

      // Master output with gentle fade-in
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.001, this.ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 2.5);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      // Warm Fmaj9 cinematic drone chords: F2 (87.31), C3 (130.81), A3 (220.0), E4 (329.63), G4 (392.0)
      const droneNotes = [87.31, 130.81, 174.61, 220.0, 261.63];
      droneNotes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        // Slight detune for lush chorus warmth
        osc.frequency.setValueAtTime(freq + (idx - 2) * 0.15, this.ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(420 + idx * 60, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.018 + (idx === 0 ? 0.015 : 0.008), this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        this.oscillators.push(osc);
      });

      // Periodic gentle crystalline piano/harp chime
      const pentatonic = [349.23, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
      const playChime = () => {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;

        const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        this.triggerNote(note, 0.025, 4.5);

        const nextInterval = 3200 + Math.random() * 4200;
        this.timer = window.setTimeout(playChime, nextInterval);
      };

      this.timer = window.setTimeout(playChime, 800);
    } catch {
      this.isPlaying = false;
    }
  }

  private triggerNote(freq: number, peakGain: number, duration: number, delaySec: number = 0) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const startTime = this.ctx.currentTime + delaySec;

    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    chimeGain.gain.setValueAtTime(0.0001, startTime);
    chimeGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.15);
    chimeGain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  /**
   * Plays a delicate harmonic shimmer on user interaction (only if audio is currently active)
   */
  public playInteractionChime(variant: "soft" | "bloom" | "envelope" = "soft") {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    if (variant === "envelope") {
      // Ascending warm arpeggio
      const arp = [349.23, 440.0, 523.25, 659.25, 880.0];
      arp.forEach((f, idx) => this.triggerNote(f, 0.03, 3.2, idx * 0.12));
    } else if (variant === "bloom") {
      const chord = [440.0, 523.25, 659.25, 783.99];
      chord.forEach((f, idx) => this.triggerNote(f, 0.025, 2.8, idx * 0.08));
    } else {
      const notes = [523.25, 659.25, 783.99];
      const pick = notes[Math.floor(Math.random() * notes.length)];
      this.triggerNote(pick, 0.022, 2.2, 0);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.6);
        setTimeout(() => {
          if (this.ctx && this.ctx.state === "running" && !this.isPlaying) {
            this.ctx.suspend();
          }
        }, 650);
      } catch {
        // Fallback
      }
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundscape = new AmbientSoundscape();
