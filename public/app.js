// Determine base URL for assets
const baseURL = window.location.origin; // Automatically adjusts between localhost and Render
const audioPath = `${baseURL}/audio/`; // Adjust path to match server directory
const imgPath = `${baseURL}/img/`;

// Initialize audio element
const music = new Audio('TUNE MUSIC.mp3');

// Create an array of songs with dynamic paths
const songs = [
    { id: '1', songName: `On My Way <br><div class="subtitle">Alan Walker</div>`, poster: `${imgPath}1.jpg` },
    { id: '2', songName: `Alan Walker-Faded <br><div class="subtitle">Alan Walker</div>`, poster: `${imgPath}2.jpg` },
    { id: '3', songName: `Cartoon - On & On <br><div class="subtitle">Daniel Levi</div>`, poster: `${imgPath}3.jpg` },
    { id: '4', songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`, poster: `${imgPath}4.jpg` },
    { id: '5', songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`, poster: `${imgPath}5.jpg` },
    { id: '6', songName: `Electronic Music <br><div class="subtitle">Electro</div>`, poster: `${imgPath}6.jpg` },
    { id: '7', songName: `Agar Tum Sath Ho <br><div class="subtitle">Arijit Singh , Alka Yagnik</div>`, poster: `${imgPath}7.jpg` },
    { id: '8', songName: `Suna Hai <br><div class="subtitle">Neha Kakkar</div>`, poster: `${imgPath}8.jpg` },
    { id: '9', songName: `Dilbar <br><div class="subtitle">Neha Kakkar</div>`, poster: `${imgPath}9.jpg` },
    { id: '10', songName: `Duniya <br><div class="subtitle">Akhil , Dhwani Bhanushali</div>`, poster: `${imgPath}10.jpg` },
    { id: '11', songName: `Lagdi Lahore Di <br><div class="subtitle">Guru Randhawa</div>`, poster: `${imgPath}11.jpg` },
    { id: '12', songName: `Putt Jatt Da <br><div class="subtitle">Diljit Dosanjh</div>`, poster: `${imgPath}12.jpg` },
    { id: '13', songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`, poster: `${imgPath}13.jpg` },
    { id: '14', songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`, poster: `${imgPath}14.jpg` },
    { id: '15', songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`, poster: `${imgPath}15.jpg` },
    { id: '16', songName: `Apna Bana Le <br><div class="subtitle">Arijit Singh</div>`, poster: `${imgPath}16.jpg` },
    { id: '17', songName: `Haan Ke Haan <br><div class="subtitle">Monali Thakur</div>`, poster: `${imgPath}17.jpg` },
    { id: '18', songName: `Har Har Gange <br><div class="subtitle">Arijit Singh</div>`, poster: `${imgPath}18.jpg` },
    { id: '19', songName: `Ik Vaari Aa <br><div class="subtitle">Arijit Singh</div>`, poster: `${imgPath}19.jpg` },
    { id: '20', songName: `Jab Tak <br><div class="subtitle">Armaan Malik</div>`, poster: `${imgPath}20.png` },
    { id: '21', songName: `Kalank Title Track<br><div class="subtitle">Arijit Singh</div>`, poster: `${imgPath}21.jpeg` },
    { id: '22', songName: `Kun Faya Kun<br><div class="subtitle">A.R RAHMAN , MOHIT CHAUHAN</div>`, poster: `${imgPath}22.jpeg` },
    { id: '23', songName: `Matargashti <br><div class="subtitle">Mohit Chauhan</div>`, poster: `${imgPath}23.jpg` },
    { id: '24', songName: `Naina Da Kya Kasoor <br><div class="subtitle">Amit Trivedi</div>`, poster: `${imgPath}24.png` },
    { id: '25', songName: `Namo Namo<br><div class="subtitle">Amit Trivedi</div>`, poster: `${imgPath}25.jpg` },
    { id: '26', songName: `Pehle Bhi Main<br><div class="subtitle">Vishal Mishra</div>`, poster: `${imgPath}26.png` },
    { id: '27', songName: `Qaafiraana <br><div class="subtitle">Arijit Singh , Nikita Gandhi</div>`, poster: `${imgPath}27.jpg` },
    { id: '28', songName: `Tere Haawale <br><div class="subtitle">Arijit Singh , Shilpa Rao</div>`, poster: `${imgPath}28.jpg` },
    { id: '29', songName: `Tum Se <br><div class="subtitle">Raghav</div>`, poster: `${imgPath}29.jpg` },
    { id: '30', songName: `Zaalima <br><div class="subtitle">Arijit Singh</div>`, poster: `${imgPath}30.jpg` },
];

// Update song items in the DOM
Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    });
};

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    });
};

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
let songTitleTop = document.querySelector('.content h1');
let songLyricsTop = document.querySelector('.content p');
let searchInput = document.querySelector('.search input');
let searchResults = document.querySelector('.menu_song');

const playButtonTop = document.querySelector('.buttons button:first-child');

playButtonTop.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const updateSongDisplay = (songId) => {
    const songInfo = songs.find((song) => song.id === songId);
    if (songInfo) {
        songTitleTop.innerHTML = songInfo.songName.replace('<br>', ' - ');
        songLyricsTop.innerHTML = songInfo.lyrics || "";
    }
};

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';
    const filteredSongs = songs.filter(song => song.songName.toLowerCase().includes(query));

    if (filteredSongs.length > 0) {
        filteredSongs.forEach(song => {
            searchResults.innerHTML += `
                <li class="songItem">
                    <span>${song.id.padStart(2, '0')}</span>
                    <img src="${song.poster}" alt="song-poster">
                    <h5>${song.songName}</h5>
                    <i class="bi playListPlay bi-play-circle-fill" id="${song.id}"></i>
                </li>
            `;
        });
        Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
            element.addEventListener('click', (e) => {
                index = e.target.id;
                makeAllPlays();
                e.target.classList.remove('bi-play-circle-fill');
                e.target.classList.add('bi-pause-circle-fill');
                music.src = `${audioPath}${index}.mp3`;
                poster_master_play.src = `${imgPath}${index}.jpg`;
                music.play();
                let song_title = songs.filter((ele) => {
                    return ele.id == index;
                });

                song_title.forEach(ele => {
                    let { songName } = ele;
                    title.innerHTML = songName;
                });
                masterPlay.classList.remove('bi-play-fill');
                masterPlay.classList.add('bi-pause-fill');
                wave.classList.add('active2');
                updateSongDisplay(index);
                music.addEventListener('ended', () => {
                    masterPlay.classList.add('bi-play-fill');
                    masterPlay.classList.remove('bi-pause-fill');
                    wave.classList.remove('active2');
                });
                makeAllBackgrounds();
                Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
            });
        });
    } else {
        searchResults.innerHTML = '<li>No results found</li>';
    }
});

Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `${audioPath}${index}.mp3`;
        poster_master_play.src = `${imgPath}${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        });

        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        });
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        updateSongDisplay(index);
        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        });
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
    });
});

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `${audioPath}${index}.mp3`;
    poster_master_play.src = `${imgPath}${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
});

next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `${audioPath}${index}.mp3`;
    poster_master_play.src = `${imgPath}${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
});

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});
right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});

let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', () => {
    item.scrollLeft -= 330;
});
right_scrolls.addEventListener('click', () => {
    item.scrollLeft += 330;
});

// Autoplay next song feature
function nextSong() {
    index = (parseInt(index) % songs.length) + 1; // move to the next song in the array
    music.src = `${audioPath}${index}.mp3`;
    poster_master_play.src = `${imgPath}${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    });
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    updateSongDisplay(index);
}

// Autoplay next song feature
function nextSong() {
    index = (parseInt(index) % songs.length) + 1; // move to the next song in the array
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play().then(() => {
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        });

        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        });
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        updateSongDisplay(index);
    }).catch(error => {
        console.error("Error playing the next song:", error);
    });
}

// Event listener for when the music ends (autoplay next song)
music.addEventListener('ended', () => {
    nextSong();
});


document.addEventListener('keydown', (event) => {
    // Check if the focused element is an input or textarea
    const activeElement = document.activeElement;
    if (activeElement.tagName.toLowerCase() === 'input' || activeElement.tagName.toLowerCase() === 'textarea') {
        return; // Exit the function if typing in an input or textarea
    }

    switch (event.key) {
        case ' ':
        case 'k':
        case 'K':
        case 'Enter':
            // Play/pause the song
            if (music.paused || music.currentTime <= 0) {
                music.play();
                masterPlay.classList.remove('bi-play-fill');
                masterPlay.classList.add('bi-pause-fill');
                wave.classList.add('active2');
            } else {
                music.pause();
                masterPlay.classList.add('bi-play-fill');
                masterPlay.classList.remove('bi-pause-fill');
                wave.classList.remove('active2');
            }
            break;
        case 'ArrowRight':
            if (event.shiftKey) {
                // Play the next song
                nextSong();
            } else {
                // Skip forward 5 seconds
                music.currentTime = Math.max(music.currentTime + 5, 0);
            }
            break;
        case 'ArrowLeft':
            if (event.shiftKey) {
                // Play the song from the beginning
                music.currentTime = 0;
                music.play();
                masterPlay.classList.remove('bi-play-fill');
                masterPlay.classList.add('bi-pause-fill');
                wave.classList.add('active2');
            } else {
                // Skip backward 5 seconds
                music.currentTime = Math.max(music.currentTime - 5, 0);
            }
            break;
        case 'ArrowUp':
            // Skip forward 30 seconds
            music.currentTime = Math.min(music.currentTime + 30, music.duration);
            break;
        case 'ArrowDown':
            // Skip backward 30 seconds
            music.currentTime = Math.max(music.currentTime - 30, 0);
            break;
        case 'j':
        case 'J':
            // Skip backward 10 seconds
            music.currentTime = Math.max(music.currentTime - 10, 0);
            break;
        case 'l':
        case 'L':
            // Skip forward 10 seconds
            music.currentTime = Math.min(music.currentTime + 10, music.duration);
            break;
    }
});
