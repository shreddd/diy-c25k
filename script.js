// Couch to 5K Plan Intervals (in seconds)
const couchTo5KPlan = {
    1: { runningTime: 60, walkingTime: 90, intervals: 8 },
    2: { runningTime: 90, walkingTime: 120, intervals: 6 },
    3: { runningTime: 90, walkingTime: 90, intervals: 6, extra: { runningTime: 180, walkingTime: 180 } },
    4: { runningTime: 180, walkingTime: 90, intervals: 6, extra: { runningTime: 300, walkingTime: 150 } },
    5: { runningTime: 300, walkingTime: 180, intervals: 3 },
    6: { runningTime: 300, walkingTime: 180, intervals: 4, extra: { runningTime: 600, walkingTime: 300 } },
    7: { runningTime: 1500, walkingTime: 0, intervals: 1 },
    8: { runningTime: 1680, walkingTime: 0, intervals: 1 },
    9: { runningTime: 1800, walkingTime: 0, intervals: 1 }
};

// Configurable Warm-Up Time (in seconds)
const defaultWarmUpTime = 300; // Default 5 minutes
let warmUpTime = defaultWarmUpTime; // Variable for current warm-up time

// Timer Variables
let selectedWeek = 1;
let runningTime, walkingTime, intervals, extraIntervals;
let currentInterval = 0;
let intervalType = 'Warm-Up'; // Start with the warm-up phase
let timeLeft = warmUpTime;
let isRunning = false;
let timer;

// DOM Elements
const weekSelect = document.getElementById('week-select');
const planDetails = document.getElementById('plan-details');
const timerDisplay = document.getElementById('timer');
const currentIntervalDisplay = document.getElementById('current-interval');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const walkingSound = document.getElementById('walking-sound');
const runningSound = document.getElementById('running-sound');

// Update Timer Display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;

    // Update Current Interval Display
    if (intervalType === 'Warm-Up') {
        currentIntervalDisplay.textContent = 'Warm-Up Time!';
    } else {
        currentIntervalDisplay.textContent = `${intervalType} Interval (${Math.ceil(currentInterval / 2)}/${intervals})`;
    }
}

// Play Sound Alert
function playSound(type) {
    if (type === 'Walking') {
        walkingSound.currentTime = 0;
        walkingSound.play();
    } else if (type === 'Running') {
        runningSound.currentTime = 0;
        runningSound.play();
    }
}

// Countdown Timer Logic
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        if (intervalType === 'Warm-Up') {
            // Transition from Warm-Up to Running
            intervalType = 'Running';
            timeLeft = runningTime;
            playSound('Running');
        } else if (intervalType === 'Running') {
            // Transition from Running to Walking
            intervalType = 'Walking';
            timeLeft = walkingTime;
            playSound('Walking');
        } else if (intervalType === 'Walking') {
            // Transition from Walking to Running
            intervalType = 'Running';
            timeLeft = runningTime;
            playSound('Running');
        }

        if (intervalType !== 'Warm-Up') {
            currentInterval++;
        }

        if (currentInterval > intervals * 2) {
            clearInterval(timer);
            currentIntervalDisplay.textContent = 'Workout Complete!';
            return;
        }

        updateDisplay();
    }
}

// Start Timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(countdown, 1000);
        startButton.textContent = 'Pause';
    } else {
        isRunning = false;
        clearInterval(timer);
        startButton.textContent = 'Start';
    }
}

// Reset Timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    currentInterval = 0;
    intervalType = 'Warm-Up';
    timeLeft = warmUpTime; // Reset to warm-up time
    loadWeek(selectedWeek);
    updateDisplay();
    startButton.textContent = 'Start';
}

// Load Week Data and Update Plan Details
function loadWeek(week) {
    const plan = couchTo5KPlan[week];
    runningTime = plan.runningTime;
    walkingTime = plan.walkingTime;
    intervals = plan.intervals;
    extraIntervals = plan.extra || null;

    timeLeft = warmUpTime; // Start with warm-up time
    intervalType = 'Warm-Up'; // Reset interval type to Warm-Up
    updateDisplay();

    let details = `<strong>Week ${week} Plan:</strong><br>`;
    details += `- Warm-Up: ${Math.floor(warmUpTime / 60)} min ${warmUpTime % 60} sec<br>`;
    details += `- Running Time: ${Math.floor(runningTime / 60)} min ${runningTime % 60} sec<br>`;
    details += `- Walking Time: ${Math.floor(walkingTime / 60)} min ${walkingTime % 60} sec<br>`;
    details += `- Intervals: ${intervals}<br>`;
    if (extraIntervals) {
        details += `- Extra Running: ${Math.floor(extraIntervals.runningTime / 60)} min ${extraIntervals.runningTime % 60} sec<br>`;
        details += `- Extra Walking: ${Math.floor(extraIntervals.walkingTime / 60)} min ${extraIntervals.walkingTime % 60} sec<br>`;
    }
    planDetails.innerHTML = details;
}

// Handle Week Change
weekSelect.addEventListener('change', () => {
    selectedWeek = parseInt(weekSelect.value, 10);
    resetTimer();
});

// Event Listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize
loadWeek(selectedWeek);
