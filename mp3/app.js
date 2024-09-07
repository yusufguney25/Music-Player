const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const currentTime = document.querySelector("#current-time")
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "/MusicPlayer/img/" + music.image;
    audio.src = "/MusicPlayer/mp3/" + music.file;

}
//Click play icon
play.addEventListener("click", () => {

    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});
//Pause icon functionality
function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();

}
//play icon functionality
function playMusic() {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();

};
//Click prev icon
prev.addEventListener("click", () => {
    prevMusic();
});
function prevMusic() {
    player.previousMusic();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}
//Click next icon
next.addEventListener("click", () => {
    nextMusic();
    
});
function nextMusic() {
    player.nextMusic();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
};
function calculateTime(TotalSeconds) {
    const minute = Math.floor(TotalSeconds / 60);
    const second = Math.floor(TotalSeconds % 60);
    const lastSecond = second < 10 ? `0${second}` : `${second}`;
    const sonuc = `${minute}:${lastSecond}`;
    return sonuc;
};

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";

    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high"
    }
});


let muteState = "unmuted";
volume.addEventListener("click", () => {
    if (muteState === "unmuted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onClick ="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class ="music-${i}" src="/MusicPlayer/mp3/${list[i].file}"></audio>
            </li>
        
        `;

        ul.insertAdjacentHTML('beforeend', liTag);
        let liAudioTag = ul.querySelector(`.music-${i}`);
        let liAudioDuration = ul.querySelector(`#music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });


    }
};

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
};

const isPlayingNow = ()=> {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")==player.index){
            li.classList.add("playing");
        }
    }
};

audio.addEventListener("ended",()=>{
    nextMusic();
});


