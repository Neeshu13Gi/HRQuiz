export const playTone = (frequency = 440, type = 'sine', duration = 0.1, volume = 0.1) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio error", e);
  }
};

export const playClick = () => {
  playTone(600, 'sine', 0.05, 0.2);
};

export const playTick = () => {
  playTone(800, 'square', 0.05, 0.1);
};

export const playSuccess = () => {
  // A sparkling/ringing chime effect
  const notes = [1046.50, 1318.51, 1567.98, 2093.00]; // C6, E6, G6, C7
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'triangle', 0.15, 0.15), i * 80);
  });
  // Final ringing sustain
  setTimeout(() => playTone(2093.00, 'sine', 0.6, 0.1), notes.length * 80);
};

export const playError = () => {
  playTone(300, 'sawtooth', 0.2, 0.2);
  setTimeout(() => playTone(250, 'sawtooth', 0.3, 0.2), 200);
};

export const speakText = (text) => {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 1;
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
    }
  } catch(e) {
    console.error(e);
  }
};
