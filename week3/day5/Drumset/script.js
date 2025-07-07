const keyToSound = {
  'A': 'boom',
  'S': 'clap',
  'D': 'hihat',
  'F': 'kick',
  'G': 'openhat',
  'H': 'ride',
  'J': 'snare',
  'K': 'tink',
  'L': 'tom'
};

function playSound(sound) {
  const audio = document.querySelector(`audio.drum-audio[data-sound="${sound}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}

function animateDrum(key) {
  const drum = document.querySelector(`.drum[data-key="${key}"]`);
  if (drum) {
    drum.classList.add('playing');
    setTimeout(() => drum.classList.remove('playing'), 120);
  }
}

document.querySelectorAll('.drum').forEach(drum => {
  drum.addEventListener('click', function() {
    const sound = this.getAttribute('data-sound');
    playSound(sound);
    animateDrum(this.getAttribute('data-key'));
  });
});

document.addEventListener('keydown', function(e) {
  const key = e.key.toUpperCase();
  if (keyToSound[key]) {
    playSound(keyToSound[key]);
    animateDrum(key);
  }
});

function unlockAllAudio() {
  document.querySelectorAll('audio').forEach(audio => {
    audio.muted = true;
    audio.play().catch(() => {});
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
  });
  window.removeEventListener('touchstart', unlockAllAudio);
  window.removeEventListener('mousedown', unlockAllAudio);
}
window.addEventListener('touchstart', unlockAllAudio, { once: true });
window.addEventListener('mousedown', unlockAllAudio, { once: true });
