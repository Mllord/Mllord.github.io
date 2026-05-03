gsap.registerPlugin(ScrollTrigger);

// ---------- PROJECT DATA (five projects) ----------
const projectsData = [
  {
    title: "Field",
    desc: "Immersive 3D environment",
    tags: ["Unity", "Environment"],
    videoUrl: "https://www.youtube.com/embed/_hI-jMQSGxI",
    bgColor: "#2c4a3e",
  },
  {
    title: "Journey",
    desc: "Immersive 3D Environment",
    tags: ["Unity", "Environment"],
    videoUrl: "https://www.youtube.com/embed/jz-7SUFb88k",
    bgColor: "#3a2c4a",
  },
  {
    title: "Self Portrait Video",
    desc: "Short form video portrait",
    tags: ["Premiere Pro", "Clip Studio Paint"],
    videoUrl: "https://www.youtube.com/embed/Ce_h1-l7-uc",
    bgColor: "#4a2c3e",
  },
  {
    title: "Character Concept",
    desc: "Concept Design for Characters",
    tags: ["Clip Studio Paint"],
    videoUrl: "https://www.youtube.com/embed/AwQ0WeSRZrg",
    bgColor: "#2c3e4a",
  },
  {
    title: "Deep Web",
    desc: "Z-Axis Interactive Website",
    tags: ["HTML", "CSS", "JS"],
    videoUrl: "https://mllord.github.io/assignment3/",
    bgColor: "#1f2c3c",
  },
];

function getEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  let videoId = null;
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  } else if (url.includes("shorts/")) {
    videoId = url.split("shorts/")[1].split("?")[0];
  }
  if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  return url;
}

function generateProjects() {
  const container = document.querySelector(".projects-container");
  if (!container) return;
  container.innerHTML = "";

  projectsData.forEach((proj, idx) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    // Alternating side: image on left for even index (0,2,4), right for odd (1,3)
    const isImageLeft = idx % 2 === 0;

    // Image container
    const imgDiv = document.createElement("div");
    imgDiv.className = "project-image";
    const placeholder = document.createElement("div");
    placeholder.className = "img-placeholder";
    placeholder.style.setProperty("--bg", proj.bgColor || "#2b2d42");

    if (proj.videoUrl) {
      const embedUrl = getEmbedUrl(proj.videoUrl);
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      );
      iframe.setAttribute("allowfullscreen", true);
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      placeholder.appendChild(iframe);
    } else {
      placeholder.innerHTML = `<i class="fas fa-cube"></i>`;
    }
    imgDiv.appendChild(placeholder);

    // Text container
    const textDiv = document.createElement("div");
    textDiv.className = "project-text";

    const title = document.createElement("h2");
    title.className = "project-title";
    title.setAttribute("data-scramble", "true");
    title.innerText = proj.title;
    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.innerText = proj.desc;
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "project-tags";
    proj.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.innerText = tag;
      tagsDiv.appendChild(span);
    });
    textDiv.appendChild(title);
    textDiv.appendChild(desc);
    textDiv.appendChild(tagsDiv);

    // Append in order to achieve alternating side
    if (isImageLeft) {
      projectDiv.appendChild(imgDiv);
      projectDiv.appendChild(textDiv);
    } else {
      projectDiv.appendChild(textDiv);
      projectDiv.appendChild(imgDiv);
    }

    container.appendChild(projectDiv);
  });
}

// ---------- PARALLAX ----------
function initParallax() {
  const images = document.querySelectorAll(".project-image");
  const texts = document.querySelectorAll(".project-text");
  const range = 500;
  images.forEach((img) => {
    const parent = img.closest(".project");
    if (parent) {
      ScrollTrigger.create({
        trigger: parent,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const y = (self.progress - 0.5) * range * 0.5;
          gsap.set(img, { y: y, ease: "none" });
        },
      });
    }
  });
  texts.forEach((text) => {
    const parent = text.closest(".project");
    if (parent) {
      ScrollTrigger.create({
        trigger: parent,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const y = (self.progress - 0.5) * range * 0.8;
          gsap.set(text, { y: y, ease: "none" });
        },
      });
    }
  });
}

// ---------- RANDOM LETTER SCRAMBLE ----------
function initScrambleTitles() {
  const titles = document.querySelectorAll('[data-scramble="true"]');
  titles.forEach((titleElem) => {
    const originalText = titleElem.innerText;
    const chars = originalText.split("");
    const randomChar = (originalChar) => {
      if (originalChar === " ") return " ";
      const isUpper =
        originalChar === originalChar.toUpperCase() &&
        originalChar !== originalChar.toLowerCase();
      const isLower =
        originalChar === originalChar.toLowerCase() &&
        originalChar !== originalChar.toUpperCase();
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let random = letters[Math.floor(Math.random() * letters.length)];
      if (isUpper && /[a-zA-Z]/.test(originalChar))
        random = random.toUpperCase();
      else if (isLower && /[a-zA-Z]/.test(originalChar))
        random = random.toLowerCase();
      else random = originalChar;
      return random;
    };
    let animationActive = false;
    let intervalId = null;
    const runScramble = () => {
      if (animationActive) return;
      animationActive = true;
      const duration = 1000;
      const steps = 18;
      let step = 0;
      intervalId = setInterval(() => {
        step++;
        const progress = step / steps;
        const randomness = Math.max(0, 1 - progress * 1.3);
        const newText = chars
          .map((ch, idx) => {
            if (ch === " ") return " ";
            if (Math.random() < randomness) return randomChar(ch);
            else return originalText[idx];
          })
          .join("");
        titleElem.innerText = newText;
        if (step >= steps) {
          clearInterval(intervalId);
          titleElem.innerText = originalText;
          animationActive = false;
        }
      }, duration / steps);
    };
    ScrollTrigger.create({
      trigger: titleElem,
      start: "top 85%",
      onEnter: () => runScramble(),
      onLeaveBack: () => {
        if (intervalId) clearInterval(intervalId);
        titleElem.innerText = originalText;
        animationActive = false;
      },
    });
  });
}

// ---------- CUSTOM CURSOR ----------
function initCustomCursor() {
  const mainCursor = document.querySelector(".cursor-main");
  const trailCursor = document.querySelector(".cursor-trail");
  if (!mainCursor || !trailCursor) return;
  let mouseX = 0,
    mouseY = 0;
  let trailX = 0,
    trailY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(mainCursor, { x: mouseX, y: mouseY });
  });
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    gsap.set(trailCursor, { x: trailX, y: trailY });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
  const interactives = document.querySelectorAll(
    "a, .project, .nav-link, .social a, .email, .logo a",
  );
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(mainCursor, { scale: 2.2, opacity: 0.6, duration: 0.2 });
      gsap.to(trailCursor, { scale: 1.6, opacity: 0.4, duration: 0.2 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(mainCursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(trailCursor, { scale: 1, opacity: 0.65, duration: 0.3 });
    });
  });
}

// ---------- INITIALIZATION ----------
window.addEventListener("load", () => {
  generateProjects();
  initCustomCursor();

  const preloader = document.getElementById("preloader");
  const wrapper = document.querySelector(".site-wrapper");
  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      duration: 1,
      delay: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        preloader.style.display = "none";
        wrapper.style.opacity = "1";
        initParallax();
        initScrambleTitles();
        ScrollTrigger.refresh();
      },
    });
  } else {
    wrapper.style.opacity = "1";
    initParallax();
    initScrambleTitles();
    ScrollTrigger.refresh();
  }
});

// Smooth scroll nav
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("href");
    if (target && target !== "#") {
      const section = document.querySelector(target);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  });
});
