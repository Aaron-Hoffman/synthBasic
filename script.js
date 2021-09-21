const audioContext = new AudioContext();

const notes = [
    {note: 'C', frequency: 261.63},
    {note: 'C#', frequency: 277.18},
    {note: 'D', frequency: 293.66},
    {note: 'D#', frequency: 311.13},
    {note: 'E', frequency: 329.63},
    {note: 'F', frequency: 349.23},
    {note: 'F#', frequency: 369.99},
    {note: 'G', frequency: 392.00},
    {note: 'G#', frequency: 415.30},
    {note: 'A', frequency: 440.00},
    {note: 'A#', frequency: 466.16},
    {note: 'B', frequency: 493.88},
    {note: 'C', frequency: 523.25} 
]

notes.forEach(({note, frequency}) => {
    const key = document.createElement('button');
    key.innerText = note;
    key.addEventListener('click', () => {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1)
    })

    document.body.appendChild(key)

})