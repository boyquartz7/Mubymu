let interval;
const face = document.getElementById('face');
const timerDisplay = document.getElementById('timeRemaining');
const goatSound = document.getElementById('goatSound');
const bgMusic = document.getElementById('bgMusic');

const faces = ["😌", "🙂", "😐", "😟", "😫", "😱"];
let totalSeconds = 0;
let lastFaceIndex = 0;

function startTimer() {
  clearInterval(interval);
  const minutes = parseInt(document.getElementById('timeSelect').value);
  totalSeconds = minutes * 60;
  let secondsLeft = totalSeconds;

  lastFaceIndex = 0;
  updateFace(0);
  updateTimeDisplay(secondsLeft);

  bgMusic.currentTime = 0;
  bgMusic.play();
  bgMusic.playbackRate = 1.0;

  interval = setInterval(() => {
    secondsLeft--;

    const progress = 1 - (secondsLeft / totalSeconds);
    const faceIndex = updateFace(progress);

    // Si cambió el emoji, aumenta velocidad de reproducción
    if (faceIndex > lastFaceIndex) {
      bgMusic.playbackRate += 0.1; // cada cambio sube velocidad
      lastFaceIndex = faceIndex;
    }

    updateTimeDisplay(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(interval);
      face.textContent = "😱";
      timerDisplay.textContent = "¡Tiempo terminado!";
      goatSound.play();
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, 1000);
}

function updateFace(progress) {
  const index = Math.min(Math.floor(progress * faces.length), faces.length - 1);
  face.textContent = faces[index];
  return index;
}

function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function stressFace() {
  face.textContent = "😱";
}
