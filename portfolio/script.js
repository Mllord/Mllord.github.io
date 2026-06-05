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
  }, 8000);
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

  // Updated video order: new video first, then original first, then original second
  const videoIds = ["1198912252", "1188774130", "1188774148"];
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
// Background video – never pause
function initBackgroundVideo() {
  const bgIframe = document.getElementById("mainBgVideo");
  if (!bgIframe) return;
  bgIframe.addEventListener("load", () => {
    try {
      const bgPlayer = new Vimeo.Player(bgIframe);
      bgPlayer.play().catch((e) => console.log("bg play:", e));
      bgPlayer.on("pause", () => bgPlayer.play());
      setInterval(() => {
        if (bgPlayer) {
          bgPlayer
            .getPaused()
            .then((paused) => {
              if (paused) bgPlayer.play();
            })
            .catch(() => {});
        }
      }, 2000);
    } catch (e) {}
  });
}

// Tilt effect for project title (uses same h1 styling as main page)
function initTiltEffect() {
  const title = document.getElementById("dynamicTitle");
  if (!title) return;
  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    title.style.transform = `perspective(600px) rotateY(${xAxis}deg) rotateX(${yAxis * 0.3}deg)`;
  });
  document.body.addEventListener("mouseleave", () => {
    title.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
  });
}

// Smooth scroll to top
function initSmoothTop() {
  const topLink = document.querySelector(".top2");
  if (topLink) {
    topLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initBackgroundVideo();
  initTiltEffect();
  initSmoothTop();
});
