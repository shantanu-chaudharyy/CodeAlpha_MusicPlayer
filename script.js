const songs = [
  {
    title: "Despacito",
    artist: "Luis Fonsi",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Bon appetit",
    artist: "Katy Perry",
    src: "song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "FE!N",
    artist: "Travis Scott",
    src: "song3.mp3",
    cover: "cover3.jpg"
  }
];

let songIndex = 0;
const audio = new Audio();
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function setProgress(e) {
  const value = e.target.value;
  audio.currentTime = (value / 100) * audio.duration;
}

function setVolume(e) {
  audio.volume = e.target.value;
}

function initPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
progress.addEventListener("input", setProgress);
volume.addEventListener("input", setVolume);

loadSong(songs[songIndex]);
initPlaylist();
document.getElementById("autoplay").addEventListener("change", (e) => {
  audio.onended = e.target.checked ? nextSong : null;
});
function highlightPlaylist() {
  [...playlistEl.children].forEach((li, i) => {
    li.style.background = i === songIndex ? "#444" : "";
  });
}

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  highlightPlaylist();
}
const toggleButton = document.getElementById("toggle-button");
const toggleLabel = document.getElementById("toggle-label");

toggleButton.addEventListener("change", () => {
  if (toggleButton.checked) {
    toggleLabel.textContent = "Autoplay On";
    // Add autoplay functionality or theme toggle here
    console.log("Autoplay enabled");
  } else {
    toggleLabel.textContent = "Autoplay Off";
    console.log("Autoplay disabled");
  }
});
