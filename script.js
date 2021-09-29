const synth = {};

synth.audioContext = new AudioContext();

synth.notes = [
    {note: 'C', frequency: 261.63, key: 'a'},
    {note: 'C#', frequency: 277.18, key: 'w'},
    {note: 'D', frequency: 293.66, key: 's'},
    {note: 'D#', frequency: 311.13, key: 'e'},
    {note: 'E', frequency: 329.63, key: 'd'},
    {note: 'F', frequency: 349.23, key: 'f'},
    {note: 'F#', frequency: 369.99, key: 't'},
    {note: 'G', frequency: 392.00, key: 'g'},
    {note: 'G#', frequency: 415.30, key: 'y'},
    {note: 'A', frequency: 440.00, key: 'h'},
    {note: 'A#', frequency: 466.16, key: 'u'},
    {note: 'B', frequency: 493.88, key: 'j'},
    {note: 'C', frequency: 523.25, key: 'k'} 
]

synth.waveforms = ['sine', 'square', 'sawtooth', 'triangle']
// Holds keys that are currently held down
synth.currentKeys = [];

synth.keyboard = document.querySelector('.keyboard');

//  Sliders
//  Waveform
synth.waveformInput = document.querySelector('#waveform');
synth.waveform = synth.waveformInput.value;
synth.waveformInput.addEventListener('change', () => synth.waveform = synth.waveformInput.value);
//  Volume
synth.volumeSlider = document.querySelector('#volume');
synth.volume = synth.volumeSlider.value;
synth.volumeSlider.addEventListener('input', () => {
    synth.volume = synth.volumeSlider.value;
    synth.gainNode.gain.linearRampToValueAtTime(synth.volume, synth.audioContext.currentTime + 0.1)
})
// Filter 
synth.filterSlider = document.querySelector('#filter');
synth.filterFrequency = synth.filterSlider.value;
synth.filterSlider.addEventListener('input', () => {
    synth.filterFrequency = synth.filterSlider.value;
    synth.filterNode.frequency.linearRampToValueAtTime(synth.filterFrequency, synth.audioContext.currentTime + 0.1)
})

// Parameter nodes
synth.gainNode = synth.audioContext.createGain();
synth.filterNode = synth.audioContext.createBiquadFilter();

// Connect Nodes
synth.gainNode.connect(synth.audioContext.destination);
synth.filterNode.connect(synth.gainNode);

// Set initial values
synth.gainNode.gain.setValueAtTime(synth.volume, synth.audioContext.currentTime);
// Filter
synth.filterNode.type = 'lowpass';
synth.filterNode.frequency.setValueAtTime(1000, synth.audioContext.currentTime)

// Creates oscillators on key press
synth.createOscillator = (frequency) => {
    const oscillator = synth.audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, synth.audioContext.currentTime);
        oscillator.type = synth.waveforms[synth.waveform];
        oscillator.connect(synth.filterNode);
        oscillator.start();
        return oscillator;
}

//  Build note buttons
synth.notes.forEach(({note, frequency, key}) => {
    const noteKey = document.createElement('button');
    noteKey.innerHTML = `<span>${key}</span>`;

    if (note.includes('#')) {
        noteKey.classList.add('blackKey');
    } else {
        noteKey.classList.add('whiteKey');
    }

    // mouse event listener
    noteKey.addEventListener('mousedown', () => {
        // create oscillator and set params
        const oscillator = synth.createOscillator(frequency);
        //  event listeners to stop
        noteKey.addEventListener('mouseup', () => {
            oscillator.stop()
        });
        noteKey.addEventListener('mouseout', () => {
            oscillator.stop()
        });
    })

    // mouse over event listener
    noteKey.addEventListener('mouseover', (e) => {
        // check if mouse button is clicked
        if (e.buttons === 0) return;
        // create oscillator and set params
        const oscillator = synth.createOscillator(frequency);
        //  event listeners to stop
        noteKey.addEventListener('mouseup', () => {
            oscillator.stop()
        });
        noteKey.addEventListener('mouseout', () => {
            oscillator.stop()
        });
    })

    // keyboard event listener
    window.addEventListener('keydown', (e) => {
        // check if button pressed corresponds to a note key
        if (e.key.toLowerCase() !== key) return;
        // check if key is already pressed to avoid firing the event listener on a loop
        if (synth.currentKeys.includes(e.key.toLowerCase())) return;
        // add key to prevent current keys for check above
        synth.currentKeys.push(key.toLowerCase());

        // create oscillator and set values
        const oscillator = synth.createOscillator(frequency);
        // end on keyup
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() !== key) return;
            oscillator.stop()
            //  remove from current keys
            synth.currentKeys.splice(synth.currentKeys.indexOf(key))
        });
    })
    // Add key to the page
    synth.keyboard.appendChild(noteKey);
})