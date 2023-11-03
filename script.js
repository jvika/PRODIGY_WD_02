// Get necessary elements
const timerDisplay = document.querySelector('.timer-display');
const startButton = document.getElementById('start-timer');
const stopButton = document.getElementById('stop-timer');
const resetButton = document.getElementById('reset-timer');
const timeLapseButton = document.getElementById('timeLapse');

// Initialize variables
let startTime;
let interval;
let laps = [];
let previousLapTime;

// Event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
timeLapseButton.addEventListener('click', timeLapse);

// Start timer
function startTimer() {
    if (!interval) {
        startTime = new Date().getTime() - (previousLapTime || 0);
        interval = setInterval(updateTime, 10);
    }
}

// Stop timer
function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  laps = [];
  previousLapTime = null;
  updateDisplay(0);
  clearLapses(); // Clear time lapses from the DOM
}

function clearLapses() {
  const lapseItems = document.querySelectorAll('.lapse-item');
  lapseItems.forEach(item => item.remove());
}



// Update timer display
function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    updateDisplay(elapsedTime);
}

// Format time values
function formatTime(value) {
    return value.toString().padStart(2, '0');
}

// Update the timer display
function updateDisplay(elapsedTime) {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    timerDisplay.textContent = `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)} : ${milliseconds}`;
}
// Capture time lapse
function timeLapse() {
  if (interval) {
      const currentTime = new Date().getTime();
      const elapsedSinceLastLap = currentTime - (previousLapTime || startTime);
      previousLapTime = currentTime;

      const hours = Math.floor(elapsedSinceLastLap / 3600000);
      const minutes = Math.floor((elapsedSinceLastLap % 3600000) / 60000);
      const seconds = Math.floor((elapsedSinceLastLap % 60000) / 1000);
      const milliseconds = elapsedSinceLastLap % 1000;

      const lapseItem = document.createElement('div');
      lapseItem.textContent = `Lapse: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${milliseconds}`;
      document.body.appendChild(lapseItem);
  }
}
