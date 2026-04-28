import * as THREE from "three";

// ---------- PRELOADER & GSAP ----------
const preloader = document.getElementById("preloader");
const progressText = document.querySelector(".progress-text");
const progressFill = document.querySelector(".progress-bar-fill");

// Simulate loading (replace with real asset loading later)
let loaded = 0;
const total = 100;
const interval = setInterval(() => {
  loaded += Math.floor(Math.random() * 10) + 5;
  if (loaded >= total) loaded = total;
  if (progressText) progressText.innerText = loaded;
  if (progressFill) progressFill.style.width = `${loaded}%`;
  if (loaded === total) {
    clearInterval(interval);
    // GSAP outro
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        preloader.style.visibility = "hidden";
        // Show first achievement toast after loading
        showAchievement("LOAD COMPLETE", "Portfolio unlocked!");
      },
    });
  }
}, 60);

// ---------- THREE.JS WIREFRAME BACKGROUND ----------
const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.FogExp2(0x050505, 0.008);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(4, 3, 12);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

// Lights
const ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

// Wireframe Grid
const gridHelper = new THREE.GridHelper(28, 32, 0x888888, 0x333333);
gridHelper.position.y = -2;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.4;
scene.add(gridHelper);

// Cinematic wireframe torus knot
const knotGeo = new THREE.TorusKnotGeometry(1.5, 0.22, 180, 24, 3, 4);
const wireMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true,
  emissive: 0x111111,
});
const knot = new THREE.Mesh(knotGeo, wireMat);
scene.add(knot);

// Floating wireframe sphere
const icoGeo = new THREE.IcosahedronGeometry(1.0, 0);
const icoWire = new THREE.Mesh(
  icoGeo,
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }),
);
scene.add(icoWire);

// Particles
const particleCount = 2000;
const particlesGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 80;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20;
}
particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.05 });
const particles = new THREE.Points(particlesGeo, particleMat);
scene.add(particles);

// Animation loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.006;
  knot.rotation.x = time * 0.3;
  knot.rotation.y = time * 0.5;
  icoWire.rotation.x = time * 0.2;
  icoWire.rotation.z = time * 0.3;
  particles.rotation.y = time * 0.02;
  camera.position.x += (0 - camera.position.x) * 0.02;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}
animate();
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------- UI INTERACTIONS ----------
// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
toggle?.addEventListener("click", () => navLinks.classList.toggle("active"));
document
  .querySelectorAll(".nav-link")
  .forEach((link) =>
    link.addEventListener("click", () => navLinks.classList.remove("active")),
  );

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

// Horizontal drag scroll
const scrollWrapper = document.querySelector(".horizontal-scroll-wrapper");
if (scrollWrapper) {
  let isDown = false,
    startX,
    scrollLeft;
  scrollWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
  });
  window.addEventListener("mouseup", () => (isDown = false));
  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollWrapper.scrollLeft = scrollLeft - walk;
  });
}

// Scroll reveal (fade up)
const reveals = document.querySelectorAll(
  ".project-card, .stat-card, .about-text, .hero-content, .character-selector",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Skill bars animation
const aboutSection = document.querySelector("#about");
const skillBars = document.querySelectorAll(".skill-progress");
if (aboutSection) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          bar.style.width = bar.style.width;
        });
        aboutObserver.disconnect();
      }
    });
  });
  aboutObserver.observe(aboutSection);
}

// ---------- RPG CHARACTER SELECTOR (Other Works) ----------
const artworks = [
  {
    img: "https://picsum.photos/id/169/500/600",
    title: "Cyber Samurai",
    desc: "A personal exploration of futuristic warriors blending traditional armor with neon aesthetics. Modeled in Blender, textured in Substance Painter.",
    poly: "24k",
    tex: "4K PBR",
    tools: "Blender, Photoshop",
  },
  {
    img: "https://picsum.photos/id/104/500/600",
    title: "Fungal Golem",
    desc: "Creature design inspired by dark fantasy. High-poly sculpt in ZBrush, retopologized for real-time engines.",
    poly: "42k",
    tex: "2K PBR",
    tools: "ZBrush, Maya, Substance",
  },
  {
    img: "https://picsum.photos/id/42/500/600",
    title: "Neon Shrine",
    desc: "Environment concept with volumetric lighting. Built in Unreal Engine 5 with custom megascans.",
    poly: "180k",
    tex: "4K",
    tools: "Unreal, Blender, Quixel",
  },
  {
    img: "https://picsum.photos/id/30/500/600",
    title: "Nomad's Rest",
    desc: "Stylized low-poly diorama. Hand-painted textures and optimized for mobile.",
    poly: "8k",
    tex: "1K",
    tools: "Blender, Photoshop",
  },
];

let currentArtIndex = 0;
const selectorImg = document.getElementById("selectorImg");
const selectorTitle = document.getElementById("selectorTitle");
const selectorDesc = document.getElementById("selectorDesc");
const statPoly = document.getElementById("statPoly");
const statTex = document.getElementById("statTex");
const statTools = document.getElementById("statTools");
const artCounter = document.getElementById("artCounter");
const prevBtn = document.getElementById("prevArt");
const nextBtn = document.getElementById("nextArt");

function updateSelector(index) {
  const art = artworks[index];
  selectorImg.src = art.img;
  selectorTitle.innerText = art.title;
  selectorDesc.innerText = art.desc;
  statPoly.innerText = art.poly;
  statTex.innerText = art.tex;
  statTools.innerText = art.tools;
  artCounter.innerText = `${index + 1} / ${artworks.length}`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentArtIndex = (currentArtIndex - 1 + artworks.length) % artworks.length;
    updateSelector(currentArtIndex);
    showAchievement(
      "VIEWER",
      `Now viewing: ${artworks[currentArtIndex].title}`,
    );
  });
  nextBtn.addEventListener("click", () => {
    currentArtIndex = (currentArtIndex + 1) % artworks.length;
    updateSelector(currentArtIndex);
    showAchievement(
      "VIEWER",
      `Now viewing: ${artworks[currentArtIndex].title}`,
    );
  });
  updateSelector(0);
}

// Achievement Toast System
function showAchievement(title, message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fas fa-trophy"></i> <strong>${title}</strong><br>${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Trigger a few achievements on scroll (just for fun)
window.addEventListener("scroll", () => {
  const workSection = document.querySelector("#work");
  const otherSection = document.querySelector("#other-works");
  if (workSection && window.scrollY + 300 > workSection.offsetTop) {
    if (!window.workAchieved) {
      window.workAchieved = true;
      showAchievement("EXPLORER", "You found the main quests!");
    }
  }
  if (otherSection && window.scrollY + 300 > otherSection.offsetTop) {
    if (!window.otherAchieved) {
      window.otherAchieved = true;
      showAchievement("COLLECTOR", "Side quests unlocked!");
    }
  }
});
