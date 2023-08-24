const isMoreThan = (input, value) => {
  return input > value;
};

const isMoreThanOrEqual = (input, value) => {
  return input >= value;
};

const isLessThan = (input, value) => {
  return input < value;
};

const isLessThanOrEqual = (input, value) => {
  return input <= value;
};

// STOPWATCH

const stopwatchInput = document.querySelector("input#stopwatch");
const stopwatchLabel = document.querySelector("label#stopwatch");

const validateStopwatch = () => {
  const stopwatchValue = stopwatchInput.value;
  const isTooMuchChars = isMoreThan(stopwatchValue.length, 10);
  if (isTooMuchChars) {
    return false;
  }

  const isOutOfRange = isMoreThan(Number(stopwatchValue), 3563999999) || isLessThan(Number(stopwatchValue), -3600);
  if (isOutOfRange) {
    return false;
  }

  return true;
};

const updateStopwatchLabel = (time) => {
  const isPositive = Math.abs(time) === time;
  if (!isPositive) {
    time = Math.abs(time);
  }
  const ms = String(time % 100).padStart(2, "0");
  const s = String(Math.floor((time / 100) % 60)).padStart(2, "0");
  const m = String(Math.floor((time / 100 / 60) % 60)).padStart(2, "0");
  const h = String(Math.floor((time / 100 / 60 / 60) % 60)).padStart(2, "0");
  const resultTime = `${isPositive ? "" : "-"}${h}:${m}:${s}:${ms}`;
  stopwatchLabel.innerHTML = resultTime;
};

let stopwatchId;
let stopwatchTime = 0;
let isStopwatchRunning = false;
let isStopwatchPaused = false;

const startStopwatch = () => {
  if (!validateStopwatch()) return;

  if (isStopwatchRunning && !isStopwatchPaused) {
    stopStopwatch();
    startStopwatch();
    return;
  }
  if (!isStopwatchPaused) {
    stopwatchTime = Number(stopwatchInput.value);
  }
  isStopwatchRunning = true;
  isStopwatchPaused = false;
  stopwatchId = setInterval(() => {
    stopwatchTime += 1;
    if (stopwatchTime > 3563999999) {
      stopStopwatch();
      return;
    }
    updateStopwatchLabel(stopwatchTime);
  }, 10);
};

const pauseStopwatch = () => {
  if (!isStopwatchRunning) return;
  isStopwatchPaused = true;
  clearInterval(stopwatchId);
};

const stopStopwatch = () => {
  isStopwatchRunning = false;
  isStopwatchPaused = false;
  clearInterval(stopwatchId);
  stopwatchTime = 0;
  updateStopwatchLabel(stopwatchTime);
};

// TIMER

const timerInput = document.querySelector("input#timer");
const timerLabel = document.querySelector("label#timer");
const timerProgress = document.querySelector("progress#timer");

const validateTimer = () => {
  const timerValue = timerInput.value;
  const isTooMuchChars = isMoreThan(timerValue.length, 10);
  if (isTooMuchChars) {
    return false;
  }

  const isOutOfRange = isMoreThan(Number(timerValue), 3564000000) || isLessThan(Number(timerValue), 0);
  if (isOutOfRange) {
    return false;
  }

  return true;
};

const updateTimerLabel = (time) => {
  const ms = String(time % 100).padStart(2, "0");
  const s = String(Math.floor((time / 100) % 60)).padStart(2, "0");
  const m = String(Math.floor((time / 100 / 60) % 60)).padStart(2, "0");
  const h = String(Math.floor((time / 100 / 60 / 60) % 60)).padStart(2, "0");
  const resultTime = `${h}:${m}:${s}:${ms}`;
  timerLabel.innerHTML = resultTime;
};

const updateTimerProgressMaxValue = (time) => {
  timerProgress.max = time;
}

const updateTimerProgressLabel = (time) => {
  timerProgress.value = time;
}

let timerId;
let timerTime = 0;
let isTimerRunning = false;
let isTimerPaused = false;

const startTimer = () => {
  if (!validateTimer()) return;

  if (isTimerRunning && !isTimerPaused) {
    stopTimer();
    startTimer();
    return;
  }

  if (!isTimerPaused) {
    timerTime = Number(timerInput.value);
  }

  isTimerRunning = true;
  isTimerPaused = false;
  updateTimerProgressMaxValue(timerTime);
  timerId = setInterval(() => {
    timerTime -= 1;
    if (timerTime <= 0) {
      stopTimer();
      return;
    }
    updateTimerProgressLabel(timerTime);
    updateTimerLabel(timerTime);
  }, 10);
};

const pauseTimer = () => {
  if (!isTimerRunning) return;
  isTimerPaused = true;
  clearInterval(timerId);
};

const stopTimer = () => {
  isTimerRunning = false;
  isTimerPaused = false;
  clearInterval(timerId);
  timerTime = 0;
  updateTimerProgressLabel(timerTime);
  updateTimerLabel(timerTime);
};
