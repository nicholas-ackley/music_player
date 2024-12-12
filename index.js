
const image = document.getElementById('cover'),       // Album cover image
    title = document.getElementById('music-title'),   // Music title text
    artist = document.getElementById('music-artist'), // Artist name text
    currentTimeEl = document.getElementById('current-time'), // Current time of the track
    durationEl = document.getElementById('duration'), // Total duration of the track
    progress = document.getElementById('progress'),   // Progress bar indicating song progress
    playerProgress = document.getElementById('player-progress'), // Clickable progress bar container
    prevBtn = document.getElementById('prev'),        // Previous song button
    nextBtn = document.getElementById('next'),        // Next song button
    playBtn = document.getElementById('play'),        // Play/Pause button
    background = document.getElementById('bg-img');   // Background image for visual effect

// Create an Audio object to play music
const music = new Audio();

// Array of songs with metadata such as file path, display name, cover image, and artist
const songs = [
    {
        path: 'assets/takeu.mp3',
        displayName: 'Take u',
        cover: 'assets/takeu.jpg',
        artist: 'Jengi',
    },
    {
        path: 'assets/food.mp3',
        displayName: 'Food for the soul',
        cover: 'assets/food.jpg',
        artist: 'itsmurph',
    },
    {
        path: 'assets/Flume.mp3',
        displayName: 'Hollow',
        cover: 'assets/bali.jpg',
        artist: 'Flume',
    },
    {
        path: 'assets/name.mp3',
        displayName: 'Say my name',
        cover: 'assets/name.jpg',
        artist: 'Destiny\'s Child',
    }
];

// Tracks the current song index and play state
let musicIndex = 0;      // Default to the first song in the playlist
let isPlaying = false;   // Flag to track if the song is currently playing

// Function to toggle play and pause
function togglePlay() {
    if (isPlaying) {
        pauseMusic(); // If music is playing, pause it
    } else {
        playMusic();  // If music is paused, play it
    }
}

// Function to play music
function playMusic() {
    isPlaying = true; // Set play state to true
    
    // Replace the play icon with a pause icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    
    // Set the hover tooltip text for the button
    playBtn.setAttribute('title', 'Pause');
    
    // Start playing the current song
    music.play();
}

// Function to pause music
function pauseMusic() {
    isPlaying = false; // Set play state to false
    
    // Replace the pause icon with a play icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    
    // Set the hover tooltip text for the button
    playBtn.setAttribute('title', 'Play');
    
    // Pause the currently playing song
    music.pause();
}

// Function to load and display the song details
function loadMusic(song) {
    // Set the source of the audio file
    music.src = song.path;
    
    // Update the song title and artist name
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    
    // Update the album cover and background image
    image.src = song.cover;
    background.src = song.cover;
}

// Function to change the current song
// direction: -1 for previous song, 1 for next song
function changeMusic(direction) {
    // Update the music index by adding the direction
    // Use modulo to loop around the playlist
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    
    // Load the new song based on the updated index
    loadMusic(songs[musicIndex]);
    
    // Play the new song automatically
    playMusic();
}

// Function to update the progress bar and time display
function updateProgressBar() {
    // Destructure the duration (total time) and currentTime (elapsed time) of the music
    const { duration, currentTime } = music;
    
    // Calculate the percentage of progress
    const progressPercent = (currentTime / duration) * 100;
    
    // Update the width of the progress bar
    progress.style.width = `${progressPercent}%`;
    
    // Helper function to format time as mm:ss
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    
    // Display total duration if available
    durationEl.textContent = duration ? `${formatTime(duration / 60)}:${formatTime(duration % 60)}` : '00:00';
    
    // Display current elapsed time
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// Function to set the song progress based on user click
function setProgressBar(e) {
    // Get the width of the progress bar container
    const width = playerProgress.clientWidth;
    
    // Get the horizontal position of the click within the progress bar
    const clickX = e.offsetX;
    
    // Calculate the new current time based on the click position
    music.currentTime = (clickX / width) * music.duration;
}

// Event Listeners
// 1. Toggle play/pause when the play button is clicked
playBtn.addEventListener('click', togglePlay);

// 2. Play the previous song when the previous button is clicked
prevBtn.addEventListener('click', () => changeMusic(-1));

// 3. Play the next song when the next button is clicked
nextBtn.addEventListener('click', () => changeMusic(1));

// 4. Automatically play the next song when the current song ends
music.addEventListener('ended', () => changeMusic(1));

// 5. Update the progress bar as the song plays
music.addEventListener('timeupdate', updateProgressBar);

// 6. Allow the user to click on the progress bar to change the song position
playerProgress.addEventListener('click', setProgressBar);

// Initial setup: load the first song in the playlist
loadMusic(songs[musicIndex]);
