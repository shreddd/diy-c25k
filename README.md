# DIY C25K Timer

This is an experiment using OpenAI to generate a DIY app that implements the C25K running program. It was pretty impressive in that it mostly got it right in the first try, but there were a few bugs in the corner cases and how things got initialized. It took a few iterations to get it right, but I think this mostly works. 


## Setup Instructions
1. Clone the Repository

```
git clone https://github.com/shreddd/diy-c25k.git
cd diy-c25k

```

2. Open index.html in any modern web browser


## Usage Instructions
- Select a Week: Use the dropdown to select the week of the Couch to 5K plan you’re on.
- Start the Timer: Press the "Start" button to begin.
- Pause or Reset: Use the "Pause" button to pause the timer or the "Reset" button to restart the session.
- Follow the Alerts:
    - A warm-up phase begins each session.
    - The app transitions to running first after the warm-up, followed by walking intervals.
    

 ## Files
```
 couch-to-5k-timer/
├── index.html       # Main HTML file
├── script.js        # Timer logic
├── begin-walking.mp3  # Walking sound alert
├── begin-running.mp3  # Running sound alert
└── README.md        # Documentation
```