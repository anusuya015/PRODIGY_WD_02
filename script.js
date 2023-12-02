let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        startTime = new Date() - (lapCounter > 1 ? lapCounter - 1 : 0) * 1000;
        timer = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    display.textContent = '00:00:00.000';
    startStopButton.textContent = 'Start';
    isRunning = false;
    lapCounter = 1;
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(new Date() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

function updateDisplay() {
    const currentTime = new Date() - startTime;
    display.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
reset();
