const main = document.querySelector(".main");

const searchinput = document.querySelector("#search");
const container = document.querySelector(".card-container");
const arrowRight = document.querySelectorAll(".arrow-btn.right");
const arrowLeft = document.querySelectorAll(".arrow-btn.left");
const artist_container = document.querySelector(".artist-card");
const mood_container = document.querySelector(".mood-card");
const songcard = document.querySelector(".song-card");
const recent = document.querySelector("#recentList");
const originalMainContent = main.innerHTML;
// Array of all containers for arrow functionality
const containers = [
  { element: songcard, name: "songs" },
  { element: artist_container, name: "artists" },
  { element: mood_container, name: "mood" },
];
// user icon
const usericon = document.querySelector("#user-icon");
const name = document.querySelector(".userName");
const mobileName = document.querySelector(".userName-menu");
const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const userMenuArea = document.querySelector("#userMenuArea");
const logopt = document.querySelector(".logopt");

// Shuffle function to randomize song order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
}
// artist card
async function loadArtistCards() {
  try {
    const response = await fetch("src/assets/data/artist.json");
    const data = await response.json();
    shuffleArray(data);

    data.forEach((artist) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("artist");

      card.innerHTML = `
          <img src="${artist.image}" alt="${artist.name}">
          <div class="play-button"></div>
          <div class="card-info">
            <h4>${artist.name}</h4>
          </div>
        `;
      document.querySelector(".artist-card").appendChild(card);
    });
    return data;
  } catch (error) {
    console.log("❌ Error loading artists:", error);
  }
}
let artistdata = [];
loadArtistCards().then((data) => {
  data.forEach((artist) => artistdata.push(artist));
});

// mood card
async function moodcard() {
  try {
    const response = await fetch("src/assets/data/mood.json");
    const data = await response.json();
    shuffleArray(data);

    data.forEach((mood) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("mood");

      card.innerHTML = `
          <img src="${mood.image}" alt="${mood.name}">
          <div class="play-button"></div>
          <div class="card-info">
            <h4>${mood.name}</h4>
          </div>
        `;
      document.querySelector(".mood-card").appendChild(card);
    });
  } catch (error) {
    console.log("❌ Error loading artists:", error);
  }
}
moodcard();

// Load and display song cards
async function loadSongs() {
  try {
    const response = await fetch("src/assets/data/song.json");
    const data = await response.json();
    shuffleArray(data);

    data.forEach((song) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
          <img src="${song.cover}" alt="${song.title}">
          <div class="play-button"></div>
          <div class="card-info">
            <h4>${song.title}</h4>
            <p class="art">${song.artist} • ${song.duration}</p>
           
            <span class="tag ${song.tag.toLowerCase()}">${song.tag}</span>
          </div>
        `;

      document.querySelector(".song-card").appendChild(card);

      // Add click event listener to load song details
      card.addEventListener("click", async () => {
        loadSongDetails(song);
        loadlibrary(song);
      });
    });
    return data;
  } catch (error) {
    console.log("❌ Error loading songs:", error);
  }
}
let songdata = [];
loadSongs().then((data) => {
  data.forEach((songs) => songdata.push(songs));
});
loadSongs();
async function loadlibrary(song) {
  const create_li = document.createElement("li");
  create_li.innerHTML = `<div class="just">
                  <img src="${song.cover}" alt="${song.title}">
                  <div class="justcontent"> 
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                  </div>
                </div>`;
  recent.appendChild(create_li);
}
// Function to load song details into main content area
async function loadSongDetails(song) {
  try {
    const response = await fetch("song-details.html");
    let htmlContent = await response.text();

    // Replace placeholders with actual song data
    htmlContent = htmlContent.replace(/\$\{song\.cover\}/g, song.cover);
    htmlContent = htmlContent.replace(/\$\{song\.title\}/g, song.title);
    htmlContent = htmlContent.replace(/\$\{song\.artist\}/g, song.artist);
    htmlContent = htmlContent.replace(
      /\$\{song\.lyrics\}/g,
      song.lyrics || "Lyrics not available"
    );

    // Update the main content
    main.innerHTML = htmlContent;

    // Populate dynamic artist info
    await populateArtistInfo(song);

    // Re-initialize functionality after loading new content
    initializeAfterLoad(song);
  } catch (error) {
    console.error("❌ Error loading song details:", error);
  }
}

// Function to populate artist info dynamically
async function populateArtistInfo(song) {
  try {
    // Fetch artist data
    const response = await fetch("src/assets/data/artist.json");
    const artistData = await response.json();

    // Find the artist(s) for this song
    const songArtists = song.artist.split(", ").map((name) => name.trim());
    const matchingArtists = artistData.filter((artist) =>
      songArtists.some(
        (songArtist) =>
          artist.name.toLowerCase().includes(songArtist.toLowerCase()) ||
          songArtist.toLowerCase().includes(artist.name.toLowerCase())
      )
    );

    // If no exact matches found, show all artists (fallback)
    const artistsToShow =
      matchingArtists.length > 0 ? matchingArtists : artistData.slice(0, 3);

    // Get the dynamic artists container
    const dynamicArtistsContainer = document.getElementById("dynamic-artists");

    if (dynamicArtistsContainer) {
      // Clear existing content
      dynamicArtistsContainer.innerHTML = "";

      // Create artist cards
      artistsToShow.forEach((artist) => {
        const artistCard = document.createElement("div");
        artistCard.className = "artist-info-card";
        artistCard.innerHTML = `
          <div class="artist-info-item">
            <img src="${artist.image}" alt="${artist.name}" class="artist-info-img">
            <div class="artist-info-details">
              <h4>${artist.name}</h4>
              <p>Artist</p>
            </div>
          </div>
        `;
        dynamicArtistsContainer.appendChild(artistCard);
      });
    }
  } catch (error) {
    console.error("❌ Error populating artist info:", error);
  }
}

// Function to initialize functionality after dynamic content load
function initializeAfterLoad(song) {
  // Re-load all cards in the new content
  loadArtistCards();
  moodcard();
  loadSongs();

  // Re-initialize toggle functionality if lyrics exist
  const toggleBtn = document.getElementById("toggleLyrics");
  const lyricsBox = document.getElementById("lyrics");

  if (toggleBtn && lyricsBox) {
    toggleBtn.addEventListener("click", () => {
      lyricsBox.classList.toggle("expanded");
      toggleBtn.innerText = lyricsBox.classList.contains("expanded")
        ? "Show Less"
        : "Show More";
    });
  }
  // Add play/pause logic

  const playBtn = document.querySelector(".play-button1");
  playbar(playBtn, song);
}

// arrow buttons functionality
function updateArrows() {
  containers.forEach(({ element }, index) => {
    if (!element || !arrowLeft[index] || !arrowRight[index]) return; // Skip if container or arrows don't exist

    const scrollLeft = element.scrollLeft > 0;
    const scrollRight =
      element.scrollLeft + element.offsetWidth < element.scrollWidth - 5;

    // Update arrows for this specific container
    if (scrollLeft) {
      arrowLeft[index].classList.remove("hidden");
    } else {
      arrowLeft[index].classList.add("hidden");
    }

    if (scrollRight) {
      arrowRight[index].classList.remove("hidden");
    } else {
      arrowRight[index].classList.add("hidden");
    }
    arrowLeft[index].addEventListener("click", () => {
      element.scrollBy({
        left: -element.offsetWidth,
        behavior: "smooth",
      });
    });

    arrowRight[index].addEventListener("click", () => {
      element.scrollBy({
        left: element.offsetWidth,
        behavior: "smooth",
      });
    });
  });
}

// Add scroll listeners for all containers
containers.forEach(({ element }) => {
  if (element) {
    element.addEventListener("scroll", updateArrows);
  }
});

updateArrows();

document.getElementById("homeBtn").addEventListener("click", function (e) {
  e.preventDefault(); // stop page reload
  main.innerHTML = originalMainContent;
  loadSongs();
  loadArtistCards();
  moodcard();
  updateArrows();
});

async function playbar(plybtn, songurl) {
  let previous = document.querySelector("#previous");
  let play = document.querySelector("#play");
  let pause = document.querySelector(".pause");
  let next = document.querySelector("#next");
  let playbar = document.querySelector(".playbar");
  let isPlaying = false;
  playmusic(songurl);

  plybtn.addEventListener("click", () => {
    if (!isPlaying) {
      isPlaying = true;
      plybtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      playbar.classList.remove("hidden");
      play.classList.add("hidden");
      pause.classList.remove("hidden");
    } else {
      isPlaying = false;
      plybtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="black"><polygon points="6,4 20,12 6,20" /></svg>`;
      play.classList.remove("hidden");
      pause.classList.add("hidden");
    }
  });
  pause.addEventListener("click", () => {
    isPlaying = false;
    plybtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="black"><polygon points="6,4 20,12 6,20" /></svg>`;
    play.classList.remove("hidden");
    pause.classList.add("hidden");
  });
  play.addEventListener("click", () => {
    isPlaying = true;
    plybtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="black" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    play.classList.add("hidden");
    pause.classList.remove("hidden");
  });
}

let currentAudio = null;
const playmusic = (song) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  document.querySelector(
    ".songinfo"
  ).innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
  const audio = new Audio(song.audio);
  currentAudio = audio;
  document.querySelector(".play-button1").addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  document.querySelector("#play").addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  document.querySelector(".pause").addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  // timeupdate event
  audio.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerText = `${format(
      audio.currentTime
    )} / ${format(audio.duration)}`;
    document.querySelector(".circle").style.left =
      (audio.currentTime / audio.duration) * 100 + "%";
  });
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let persentage = (e.offsetX / e.target.clientWidth) * 100;
    document.querySelector(".circle").style.left = persentage + "%";
    audio.currentTime = (persentage / 100) * audio.duration;
  });

  document.querySelector("#next").addEventListener("click", () => {
    let currentIndex = songdata.findIndex(
      (s) => s.audio.split("/").pop() == song.audio.split("/").pop()
    );
    let nextIndex = (currentIndex + 1) % songdata.length;
    loadSongDetails(songdata[nextIndex]).then(() => {
      document.querySelector(".play-button1").click();
    });
    loadlibrary(songdata[nextIndex]);
  });
  document.querySelector("#previous").addEventListener("click", () => {
    let currentIndex = songdata.findIndex(
      (s) => s.audio.split("/").pop() == song.audio.split("/").pop()
    );
    let prevIndex = (currentIndex - 1 + songdata.length) % songdata.length;
    loadSongDetails(songdata[prevIndex]).then(() => {
      document.querySelector(".play-button1").click();
      main.classList.add(".main.animated-slide-right ");
    });
  });
};

function format(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return formattedMinutes + ":" + formattedSeconds;
}

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".dropdown-menu").classList.toggle("hidden");
});

document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".dropdown-menu").classList.add("hidden");
});

if (localStorage.getItem("isLoggedIn") === "true") {
  name.innerText =
    localStorage.getItem("currentName") ||
    localStorage.getItem("currentNameLogin");
  mobileName.innerText =
    localStorage.getItem("currentName") ||
    localStorage.getItem("currentNameLogin");
  userMenuArea.classList.remove("hidden");
  logopt.classList.add("hidden");
  usericon.classList.remove("hidden");
  login.classList.add("hidden");
  signup.classList.add("hidden");
}

document.querySelector(".logoutbtn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentName");
  localStorage.removeItem("currentNameLogin");
  usericon.classList.add("hidden");
  name.innerText = "";
  userMenuArea.classList.add("hidden");
  logopt.classList.remove("hidden");
  login.classList.remove("hidden");
  signup.classList.remove("hidden");
  document.querySelector(".logout").style.display = "none";
});

document.querySelector(".logoutbtn2").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentName");
  localStorage.removeItem("currentNameLogin");
  userMenuArea.classList.add("hidden");
  logopt.classList.remove("hidden");
});
