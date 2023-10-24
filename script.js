let isRunning = false;
let startTime = 0;
let interval;
const timeDisplay = document.querySelector('.time');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        startTime = Date.now() - (startTime > 0 ? startTime : 0);
        interval = setInterval(updateTime, 10);
    } else {
        isRunning = false;
        startButton.textContent = 'Resume';
        clearInterval(interval);
    }
}

function stopTimer() {
    isRunning = false;
    startButton.textContent = 'Start';
    clearInterval(interval);
}

function resetTimer() {
    isRunning = false;
    startButton.textContent = 'Start';
    startTime = 0;
    clearInterval(interval);
    timeDisplay.textContent = '00:00.00';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}
