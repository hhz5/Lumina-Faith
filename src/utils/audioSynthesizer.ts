// Procedural Web Audio API sound engine for sacred digital rituals
class AudioEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Pure wooden fish resonant knock
  public playWoodenFish() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Primary hollow click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Dual bandpass filter for wooden resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(580, now);
      filter.Q.setValueAtTime(4.5, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);

      // Add gentle secondary sub-knock for acoustic body
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(280, now);
      subOsc.frequency.exponentialRampToValueAtTime(90, now + 0.06);

      subGain.gain.setValueAtTime(0.6, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 0.1);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  // Singing bowl resonance (Tibetan bowl harmonic frequencies: 432Hz & 864Hz with gentle vibrato)
  public playSingingBowl() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const duration = 4.5;

      const fundFreq = 432; // Root healing frequency

      // Fundamental harmonic
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(fundFreq, now);

      // Subtle frequency vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(3.2, now);
      lfoGain.gain.setValueAtTime(2.5, now);
      lfo.connect(osc1.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

      // Overtone harmonic (Singing rim strike)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(fundFreq * 2.76, now);

      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0.35, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  // Temple bell chime
  public playTempleBell() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const duration = 3.2;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, now); // G5 note
      osc.frequency.exponentialRampToValueAtTime(780, now + duration);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  // Serene bead bead flick click
  public playBeadClick() {
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }
}

export const audioService = new AudioEngine();
