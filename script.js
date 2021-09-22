const audioContext = new AudioContext();

const notes = [
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

const waveforms = ['sine', 'square', 'sawtooth', 'triangle']
// Holds keys that are currently held down
const currentKeys = [];

const keyboard = document.querySelector('.keyboard');
const waveformInput = document.querySelector('#waveform');
let waveform = waveformInput.value;

waveformInput.addEventListener('change', () => waveform = waveformInput.value);

//  Build note buttons
notes.forEach(({note, frequency, key}) => {
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
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = waveforms[waveform];
        oscillator.connect(audioContext.destination);
        oscillator.start();
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
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = waveforms[waveform];
        oscillator.connect(audioContext.destination);
        oscillator.start();
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
        if (e.key !== key) return;
        // check if key is already pressed to avoid firing the event listener on a loop
        if (currentKeys.includes(e.key)) return;
        // add key to prevent current keys for check above
        currentKeys.push(key);

        // create oscillator and set values
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = waveforms[waveform];
        oscillator.connect(audioContext.destination);
        oscillator.start();
        // end on keyup
        window.addEventListener('keyup', (e) => {
            if (e.key !== key) return;
            oscillator.stop()
            //  remove from current keys
            currentKeys.splice(currentKeys.indexOf(key))
        });
    })
    keyboard.appendChild(noteKey)
})