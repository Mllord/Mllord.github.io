// script.js

const container = document.querySelector(".pillar-container");
const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");
const colors = ["cyan", "magenta", "lime", "blue", "red", "aqua", "violet"];

const pillars = [];
const numPillars = 40;

for (let i = 0; i < numPillars; i++) {
  const div = document.createElement("div");
  div.classList.add("pillar");

  const x = Math.random() * 800 - 400;
  const y = Math.random() * 100 - 50;
  const z = Math.random() * -3000;

  const color = colors[Math.floor(Math.random() * colors.length)];
  div.style.background = color;
  div.style.boxShadow = `0 0 20px ${color}, 0 0 50px ${color}`;

  div.dataset.x = x;
  div.dataset.y = y;
  div.dataset.z = z;

  div.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(90deg)`;
  container.appendChild(div);
  pillars.push(div);
}

function animatePillars() {
  for (const pillar of pillars) {
    let z = parseFloat(pillar.dataset.z);
    z += 30;
    if (z > 100) z = -3000 - Math.random() * 1000;

    pillar.dataset.z = z;
    const x = pillar.dataset.x;
    const y = pillar.dataset.y;

    pillar.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(90deg)`;
  }

  requestAnimationFrame(animatePillars);
}
animatePillars();

setTimeout(() => {
  loginScreen.classList.add("fade-out");
  setTimeout(() => {
    mainContent.style.display = "block";
  }, 1000);
}, 3500);
