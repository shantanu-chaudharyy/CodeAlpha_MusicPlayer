const songs = [
  { title: "Despacito", artist: "Luis Fonsi", src: "song1.mp3", cover: "cover1.jpg" },
  { title: "Bon Appétit", artist: "Katy Perry", src: "song2.mp3", cover: "cover2.jpg" },
  { title: "FE!N", artist: "Travis Scott", src: "song3.mp3", cover: "cover3.jpg" }
  
];

let currentSong = 0;
let isPlaying = false;
let autoplay = false;
let shuffle = false;

const audio = new Audio();
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const toggleBtn = document.getElementById('toggle-button');
const toggleLabel = document.getElementById('toggle-label');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playlist = document.getElementById('playlist');
const toast = document.getElementById('toast');
const darkModeBtn = document.getElementById('dark-mode-toggle');
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  highlightActive();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = "⏸";
  showToast("Playing");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = "▶";
  showToast("Paused");
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

playBtn.addEventListener("click", () => isPlaying ? pauseSong() : playSong());

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

nextBtn.addEventListener("click", () => {
  nextTrack();
});

function nextTrack() {
  if (shuffle) {
    let random;
    do {
      random = Math.floor(Math.random() * songs.length);
    } while (random === currentSong);
    currentSong = random;
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  playSong();
}

shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.style.color = shuffle ? "hotpink" : "";
  showToast(shuffle ? "Shuffle On" : "Shuffle Off");
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
  progress.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  drawWaveform();
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

toggleBtn.addEventListener("change", () => {
  autoplay = toggleBtn.checked;
  toggleLabel.textContent = autoplay ? "Autoplay On" : "Autoplay Off";
});

audio.addEventListener("ended", () => {
  if (autoplay) {
    nextTrack();
  } else {
    pauseSong();
  }
});

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function highlightActive() {
  const lis = playlist.querySelectorAll("li");
  lis.forEach((li, i) => {
    li.classList.toggle("active", i === currentSong);
  });
}

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
  playlist.appendChild(li);
});

function drawWaveform() {
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);
  const barWidth = 2;
  for (let i = 0; i < width; i += barWidth * 2) {
    const barHeight = Math.random() * height;
    ctx.fillStyle = "#ff0080";
    ctx.fillRect(i, height - barHeight, barWidth, barHeight);
  }
}

loadSong(currentSong);
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    audio.pause();
  }
});
document.addEventListener('keydown', (e) => {
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault(); // Prevent page scroll
    isPlaying ? pauseSong() : playSong();
  }
});
});
drawWaveform();
// Typing effect for footer credit
const footerText = "Designed & Developed by Shantanu Chaudhary";
let footerIndex = 0;

function typeFooter() {
  if (footerIndex < footerText.length) {
    document.getElementById("footer-text").textContent += footerText.charAt(footerIndex);
    footerIndex++;
    setTimeout(typeFooter, 80); // speed of typing
  }
}

typeFooter();
