const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

//--------------------------------------------------------------------
//Audio Logic
//Fetch button for play

const playButton = document.querySelector("#play-button");
console.log(playButton);

//listen for click event on play button
playButton.addEventListener("click", playAudio);

//when click, play audio
function playAudio() {
  airportAudio.play();
}

//--------------------------------------------------------------------
//Audio Logic
//Fetch button for pause

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

//listen for click event on play button
pauseButton.addEventListener("click", pauseAudio);

//when click, play audio
function pauseAudio() {
  airportAudio.pause();
}

//--------------------------------------------------------------------
//POP Logic
//Fetch button for pop
const popSound = document.querySelector("#pop");
console.log(popSound);

const popButton = document.querySelector("#pop-sound");
console.log(popButton);

//listen for click event on pop button
popButton.addEventListener("click", popAudio);

//when click, play audio
function popAudio() {
  popSound.play();
}

//--------------------------------------------------------------------
