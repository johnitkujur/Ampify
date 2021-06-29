var main = document.querySelector('.display');
var sidebar = document.querySelector('.sidebar');

const track_list = [
    { id: 0, name: 'Levitating', artist: 'Dua Lipa', path: './musicFile/Levitating.mp3' },
    { id: 1, name: 'Montero', artist: 'Lil Nas X', path: './musicFile/Montero.mp3' },
    { id: 2, name: 'Exile', artist: 'Taylor Swift', path: './musicFile/Exile.mp3' },
    { id: 3, name: 'Popstar', artist: 'Drake', path: './musicFile/Popstar.mp3' },
    { id: 4, name: 'Save your Tears', artist: 'The Weekend', path: './musicFile/Save your Tears.mp3' },
    { id: 5, name: 'Toosie Slide', artist: 'Drake', path: './musicFile/Toosie Slide.mp3' }]

const playlist = [];


let track_index = 0;
let isPlaying = false;
let updateTimer;

createSongButton = (i) => {
    var temp = document.createElement('div');

    temp.style.display = 'flex';
    temp.style.justifyContent = 'center';
    temp.style.padding = '10px';

    let song = document.createElement('div');
    song.className = 'songbutton';
    song.id = i;
    song.style.border = 'none';
    song.style.width = '100%';


    song.addEventListener('click', () => {
        track_index = i;
        loadTrack(track_index);
        playTrack();
    })

    song.textContent = track_list[i].name;
    song.style.marginRight = '20px';
    temp.appendChild(song);

    return temp;
}

addToPlaylist = (i) => {
    temp = createSongButton(i);
    sidebar.appendChild(temp);
}

window.onload = () => {
    for (let i = 0; i < track_list.length; i++) {
        temp = createSongButton(i);
        var favbutton = document.createElement('button');
        favbutton.textContent = "Add";
        favbutton.id = i;
        favbutton.addEventListener('click', () => {
            addToPlaylist(i);
        })
        temp.appendChild(favbutton);
        main.appendChild(temp);
    }

    /* if(playlist.length == 0){
        var temp = document.createElement('p');
        console.log(temp);
        temp.textContent = 'No Songs added to the playlist';
        sidebar.appendChild(temp);
    } */
}


let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");



// Create new audio element
let curr_track = document.createElement('audio');


function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    console.log(curr_track.src);
    curr_track.load();

    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;

    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current one finishes playing
    curr_track.addEventListener("ended", nextTrack);

    // Apply a random background color
    //random_bg_color();
}

function random_bg_color() {

    // Get a random number between 64 to 256 (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color withe the given values
    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    // Set the background to that color
    document.body.style.background = bgColor;
}

// Reset Values
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}


// Load the first track in the tracklist
loadTrack(track_index);
