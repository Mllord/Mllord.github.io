(function () {
  const cursor = document.querySelector(".cursor");
  const canvas = document.getElementById("trailCanvas");
  if (!cursor || !canvas) return;
  const ctx = canvas.getContext("2d");
  let trail = [];
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    trail = trail.filter((point) => Date.now() - point.time < 150);
  });
  function drawTrail() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (trail.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) ctx.lineTo(trail[i].x, trail[i].y);
      ctx.stroke();
    }
    requestAnimationFrame(drawTrail);
  }
  drawTrail();
  document.body.addEventListener(
    "mouseleave",
    () => (cursor.style.opacity = "0"),
  );
  document.body.addEventListener(
    "mouseenter",
    () => (cursor.style.opacity = "1"),
  );
})();

const topLink = document.querySelector(".top2");
if (topLink) {
  topLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Tilt effect for main heading
const heading = document.querySelector("h1");
if (heading) {
  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    heading.style.transform = `perspective(600px) rotateY(${xAxis}deg) rotateX(${yAxis * 0.3}deg)`;
  });
  document.body.addEventListener("mouseleave", () => {
    heading.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
  });
}

// Tilt effect for Bio heading
const bioHeading = document.querySelector(".bio-heading");
if (bioHeading) {
  document.addEventListener("mousemove", (e) => {
    const xAxisBio = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxisBio = (window.innerHeight / 2 - e.pageY) / 45;
    bioHeading.style.transform = `perspective(600px) rotateY(${xAxisBio}deg) rotateX(${yAxisBio * 0.3}deg)`;
  });
  document.body.addEventListener("mouseleave", () => {
    bioHeading.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg)";
  });
}

// ========== PRELOADER: HIDE AFTER EXACTLY 7000ms (7 seconds) ==========
function setupPreloader() {
  const preloader = document.getElementById("preloader");
  const mainBgIframe = document.getElementById("mainBgVideo");
  if (!preloader || !mainBgIframe) return;
  // Set final background video (loops)
  const finalVideoUrl =
    "https://player.vimeo.com/video/1188780094?background=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1";
  mainBgIframe.src = finalVideoUrl;
  // Hide preloader after 7 seconds
  setTimeout(() => {
    preloader.classList.add("hide-preloader");
    setTimeout(() => {
      if (preloader.parentNode) preloader.style.display = "none";
    }, 1000);
  }, 7500);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupPreloader);
} else {
  setupPreloader();
}

// ========== CHARACTER CONCEPT VIDEO CYCLING ==========
function initCharacterCycling() {
  const characterIframe = document.getElementById("characterVideo");
  if (!characterIframe) return;
  // List of video IDs to cycle through (in order)
  const videoIds = [
    "1188774130", // original
    "1188774148", // new second video
    "1188787674", // new third video
  ];
  let currentIndex = 0;
  // Base URL template
  const baseUrl = (id) =>
    `https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&loop=0`;
  // Function to load next video
  function loadNextVideo() {
    currentIndex = (currentIndex + 1) % videoIds.length;
    const newSrc = baseUrl(videoIds[currentIndex]);
    characterIframe.src = newSrc;
  }
  // Use Vimeo Player API to listen for 'ended' event
  let player = new Vimeo.Player(characterIframe);
  player.on("ended", function () {
    loadNextVideo();
    // Re-attach player to new iframe after src change
    setTimeout(() => {
      player = new Vimeo.Player(characterIframe);
      player.on("ended", loadNextVideo);
    }, 500);
  });
  // Fallback: if iframe is reloaded due to visibility changes, reattach
  const observer = new MutationObserver(() => {
    if (
      characterIframe.src &&
      characterIframe.src !== baseUrl(videoIds[currentIndex])
    ) {
      // Sync if needed, but we only change via loadNextVideo
    }
    player = new Vimeo.Player(characterIframe);
    player.off("ended");
    player.on("ended", loadNextVideo);
  });
  observer.observe(characterIframe, {
    attributes: true,
    attributeFilter: ["src"],
  });
}
// Start cycling once the page is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCharacterCycling);
} else {
  initCharacterCycling();
}

// Disable context menu on background
const bgContainer = document.getElementById("VideoBG");
if (bgContainer)
  bgContainer.addEventListener("contextmenu", (e) => e.preventDefault());

// Enhanced cursor on project cards
const cards = document.querySelectorAll(".project-card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const cur = document.querySelector(".cursor");
    if (cur) {
      cur.style.width = "12px";
      cur.style.height = "12px";
      cur.style.border = "1px solid rgba(255,255,255,0.9)";
      cur.style.backgroundColor = "rgba(255,255,255,0.25)";
    }
  });
  card.addEventListener("mouseleave", () => {
    const cur = document.querySelector(".cursor");
    if (cur) {
      cur.style.width = "5px";
      cur.style.height = "5px";
      cur.style.border = "1px solid white";
      cur.style.backgroundColor = "rgba(255,255,255,0.15)";
    }
  });
});

console.log(
  "Portfolio ready — preloader hides after 7 seconds, Character Concept cycles through 3 videos.",
);
