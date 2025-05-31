// Select all timeline cards
const cards = document.querySelectorAll(".card");

// Base Z-position offset
const baseZ = 250;

// Distance between cards along the Z-axis
const spacing = -800;

/**
 * Updates the position of each card based on scroll.
 * @param {number} scrollY - Current vertical scroll position
 */
function updateCards(scrollY) {
  cards.forEach((card, i) => {
    // Each card moves along Z-axis as user scrolls
    // We multiply scrollY by -1 to make the cards appear to move toward the user
    const z = baseZ + i * spacing + scrollY * 1;

    // Apply the Z-axis translation
    card.style.transform = `translateZ(${z}px)`;
  });
}

// Listen to scroll events and update card positions
window.addEventListener("scroll", () => {
  updateCards(window.scrollY);
});

// Initialize the positions on page load
updateCards(window.scrollY);

// for the scroll progress bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  document.getElementById("scroll-progress").style.width = `${scrollPercent}%`;
});
////////////

const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const letters =
  "アァイイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
    ""
  );

const columnOffsets = Array.from(
  { length: columns },
  () => Math.random() * 100
);

// Store current characters per column
const currentChars = new Array(columns)
  .fill("")
  .map(() => letters[Math.floor(Math.random() * letters.length)]);
const updateRate = 50; // update every 10 scroll units
let lastFrame = 0;

function drawMatrix(scrollY) {
  const frame = Math.floor(scrollY / updateRate);

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns; i++) {
    const x = i * fontSize;
    const baseOffset = scrollY / 5 + columnOffsets[i] * 5;
    const y = Math.floor(baseOffset) % canvas.height;

    // Only update character every N frames
    if (frame !== lastFrame) {
      currentChars[i] = letters[Math.floor(Math.random() * letters.length)];
    }

    ctx.fillText(currentChars[i], x, y);
  }

  lastFrame = frame;
}

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  drawMatrix(scrollY);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
