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

notes.forEach(({note, frequency, key}) => {
    const noteKey = document.createElement('button');
    noteKey.innerText = note;
    noteKey.addEventListener('mousedown', () => {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        // oscillator.type = 'sawtooth';
        oscillator.connect(audioContext.destination);
        oscillator.start();
        noteKey.addEventListener('mouseup', () => {
            oscillator.stop()
        });
        noteKey.addEventListener('mouseout', () => {
            oscillator.stop()
        });
    })

    window.addEventListener('keydown', (e) => {
        console.log(e);
        if (e.key !== key) return;
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        // oscillator.type = 'sawtooth';
        oscillator.connect(audioContext.destination);
        oscillator.start();
        noteKey.addEventListener('mouseup', () => {
            oscillator.stop()
        });
        window.addEventListener('keyup', () => {
            if (e.key !== key) return;
            oscillator.stop()
        });
    })

    document.body.appendChild(noteKey)

})