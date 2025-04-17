const stardustVideo = document.querySelector("#stardust-video");
console.log(stardustVideo);

//--------------------------------------------------------------------
//Audio Logic
//Fetch button for play

const playButton = document.querySelector("#play-button");
console.log(playButton);

//listen for click event on play button
playButton.addEventListener("click", playVideo);

//when click, play audio
function playVideo() {
  stardustVideo.play();
}

//--------------------------------------------------------------------
//Audio Logic
//Fetch button for pause

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

//listen for click event on play button
pauseButton.addEventListener("click", pauseVideo);

//when click, play audio
function pauseVideo() {
  stardustVideo.pause();
}

//--------------------------------------------------------------------
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

playPauseButton.addEventListener("click", playPauseVideo);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

function playPauseVideo() {
  if (stardustVideo.paused || stardustVideo.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    stardustVideo.play();
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    stardustVideo.pause();
  }
}
