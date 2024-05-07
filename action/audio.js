const audioFiles = ['audio/Main.mp3', 'audio/Chill.mp3', 'auido/off.mp3'];
let currentAudioIndex = 0;
let audioPlayer = new Audio(audioFiles[currentAudioIndex]);


function playNextAudio() {
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
    audioPlayer.src = audioFiles[currentAudioIndex];
    audioPlayer.play();
    const fileName = audioFiles[currentAudioIndex].split('/').pop().split('.')[0];
    audioButton.textContent = fileName;
}


const audioButton = document.getElementById('audioButton');
audioButton.addEventListener('click', () => {
    playNextAudio();
});