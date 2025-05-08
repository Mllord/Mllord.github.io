const video = document.querySelector("#custom-video-player");
const bgvideo = document.querySelector("#bgv");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
const fullscreen = document.querySelector("#fullscreen-btn");
const title = document.querySelector("#title");
const line = document.querySelector("#line");
const likeButton = document.querySelector("#like-btn");
const likes = document.querySelector("#likes");

video.removeAttribute("controls");
playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    bgvideo.play();
    playPauseImg.src = "https://img.icons8.com/ios/50/pause--v1.png";
    title.classList.add("fade");
    line.classList.add("fade");
  } else {
    video.pause();
    bgvideo.pause();
    playPauseImg.src =
      "https://img.icons8.com/fluency-systems-regular/48/play--v1.png";
    title.classList.remove("fade");
    line.classList.remove("fade");
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}
// Add other functionalities here
//-----------------------------------------------------------------
// Enables the functioning of the fullscreen button in addition to ensuring functionality across multiple browers
fullscreen.addEventListener("click", toggleFullScreen);
video.addEventListener("dblclick", toggleFullScreen);
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      /* Firefox */
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      /* IE/Edge */
      video.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}
//-----------------------------------------------------------------

// The following code allows users to like the video and display total likes
let likeCount = 0;

console.log(likeButton);
likeButton.addEventListener("click", addLikes);

likes.textContent = likeCount;

function addLikes() {
  likeCount++;
  likes.textContent = likeCount;
}
//-----------------------------------------------------------------
