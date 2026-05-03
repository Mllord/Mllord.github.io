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

let bgPlayer = null;

function initBackgroundVideo() {
  const bgIframe = document.getElementById("mainBgVideo");
  if (!bgIframe) return;
  bgIframe.addEventListener("load", () => {
    try {
      bgPlayer = new Vimeo.Player(bgIframe);
      bgPlayer.play().catch((e) => console.log("Initial play failed:", e));
      bgPlayer.on("pause", () => {
        console.log("Background paused, resuming...");
        bgPlayer.play();
      });
      setInterval(() => {
        if (bgPlayer) {
          bgPlayer
            .getPaused()
            .then((paused) => {
              if (paused) {
                console.log("Background paused (interval check), resuming...");
                bgPlayer.play();
              }
            })
            .catch(() => {});
        }
      }, 2000);
    } catch (e) {
      console.log("Failed to initialize Vimeo player for background:", e);
    }
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBackgroundVideo);
} else {
  initBackgroundVideo();
}

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add("hide-preloader");
    setTimeout(() => {
      if (preloader.parentNode) preloader.style.display = "none";
    }, 1000);
  }, 7500);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hidePreloader);
} else {
  hidePreloader();
}

function initHoverPlay() {
  const fieldIframe = document.getElementById("fieldVideo");
  if (fieldIframe) {
    let fieldPlayer = new Vimeo.Player(fieldIframe);
    const card = fieldIframe.closest(".project-card");
    card.addEventListener("mouseenter", () => fieldPlayer.play());
    card.addEventListener("mouseleave", () => fieldPlayer.pause());
  }
  const journeyIframe = document.getElementById("journeyVideo");
  if (journeyIframe) {
    let journeyPlayer = new Vimeo.Player(journeyIframe);
    const card = journeyIframe.closest(".project-card");
    card.addEventListener("mouseenter", () => journeyPlayer.play());
    card.addEventListener("mouseleave", () => journeyPlayer.pause());
  }
  const fluidIframe = document.getElementById("fluidVideo");
  if (fluidIframe) {
    let fluidPlayer = new Vimeo.Player(fluidIframe);
    const card = fluidIframe.closest(".project-card");
    card.addEventListener("mouseenter", () => fluidPlayer.play());
    card.addEventListener("mouseleave", () => fluidPlayer.pause());
  }
}

function initCharacterCycling() {
  const characterIframe = document.getElementById("characterVideo");
  if (!characterIframe) return;

  const videoIds = ["1188774130", "1188774148", "1188787674"];
  let currentIndex = 0;
  let characterPlayer = null;
  let isHovered = false;

  function buildUrl(id) {
    return `https://player.vimeo.com/video/${id}?controls=0&title=0&byline=0&portrait=0&playsinline=1&loop=0&muted=1`;
  }

  function loadVideo(index, playIfHovered = true) {
    const newSrc = buildUrl(videoIds[index]);
    if (characterIframe.src !== newSrc) {
      characterIframe.src = newSrc;
    }
    setTimeout(() => {
      if (characterPlayer) {
        characterPlayer.off("ended");
      }
      characterPlayer = new Vimeo.Player(characterIframe);
      characterPlayer.on("ended", () => {
        currentIndex = (currentIndex + 1) % videoIds.length;
        loadVideo(currentIndex, isHovered);
      });
      if (isHovered && playIfHovered && characterPlayer) {
        characterPlayer.play();
      }
    }, 300);
  }

  loadVideo(0, false);

  const card = characterIframe.closest(".project-card");
  card.addEventListener("mouseenter", () => {
    isHovered = true;
    if (characterPlayer) characterPlayer.play();
  });
  card.addEventListener("mouseleave", () => {
    isHovered = false;
    if (characterPlayer) characterPlayer.pause();
  });

  const prevBtn = document.querySelector(".char-prev");
  const nextBtn = document.querySelector(".char-next");
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
      loadVideo(currentIndex, isHovered);
    });
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % videoIds.length;
      loadVideo(currentIndex, isHovered);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initHoverPlay();
    initCharacterCycling();
  });
} else {
  initHoverPlay();
  initCharacterCycling();
}

const bgContainer = document.getElementById("VideoBG");
if (bgContainer)
  bgContainer.addEventListener("contextmenu", (e) => e.preventDefault());

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
  "Portfolio ready — background never pauses, preloader 7.5s, project videos play on hover, Character Concept cycles with buttons.",
);
