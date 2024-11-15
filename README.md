# DIY C25K Timer

This is an experiment in using OpenAI to generate a DIY app that implements the C25K running program. Impressively, most of the code was generated during the first try and it mostly worked. There were a few bugs and corner cases around initialization and display. It took a few iterations to get it right, but I think this mostly works. 

My initial prompts:
1. what is the couch to 5K plan
2. can you show me a detailed plan
3. can you create a run timer app in javascript to track this

After that it was just iterating over additional prompts to tweak the code to get it into its current form.  


## Setup Instructions
1. Clone the Repository

```
git clone https://github.com/shreddd/diy-c25k.git
```

2. Open index.html in any modern web browser. Visit file:///path/to/diy-c25k


## Usage Instructions
- Select a Week: Use the dropdown to select the week of the Couch to 5K plan you’re on.
- Start the Timer: Press the "Start" button to begin.
- Pause or Reset: Use the "Pause" button to pause the timer or the "Reset" button to restart the session.
- Follow the Alerts:
    - A warm-up phase begins each session.
    - The app transitions to running first after the warm-up, followed by walking intervals.
    

 ## Files
```
diy-c25k/
├── index.html       # Main HTML file
├── script.js        # Timer logic
├── begin-walking.mp3  # Walking sound alert
├── begin-running.mp3  # Running sound alert
└── README.md        # Documentation
```

## Credits
- This code was generated using the OpenAI ChatGPT with the GPT-4o model
- Audio samples were generated through [ElevenLabs](https://elevenlabs.io/)
- This code is licensed under the [BSD 2-Clause license](LICENSE)