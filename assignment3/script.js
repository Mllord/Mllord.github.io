// Select all timeline cards
const cards = document.querySelectorAll(".card");

// Base Z-position offset to start the cards closer to the user
const baseZ = 250;

// Space between each card along the Z-axis; negative so they go further away
const spacing = -800;

/**
 * Updates each card's Z position based on scroll position.
 * This creates a 3D depth illusion as the user scrolls.
 */
function updateCards(scrollY) {
  cards.forEach((card, i) => {
    // Z = base offset + index spacing + scroll position (pulled forward)
    const z = baseZ + i * spacing + scrollY * 1;

    // Move the card in 3D space
    card.style.transform = `translateZ(${z}px)`;
  });
}

// Trigger card depth updates on scroll
window.addEventListener("scroll", () => {
  updateCards(window.scrollY);
});

// Ensure cards are in the right place on page load
updateCards(window.scrollY);

// --- Scroll Progress Bar ---
// Tracks how far user has scrolled and updates the progress bar width
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  document.getElementById("scroll-progress").style.width = `${scrollPercent}%`;
});

// --- Matrix Code Background Setup ---
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

// Match canvas to screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Font and column layout settings
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Characters to display (Japanese katakana + alphanumerics)
const letters =
  "アァイイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
    ""
  );

// Random vertical offsets so each column starts staggered
const columnOffsets = Array.from(
  { length: columns },
  () => Math.random() * 100
);

// Create initial character for each column
const currentChars = new Array(columns)
  .fill("")
  .map(() => letters[Math.floor(Math.random() * letters.length)]);

// Control how frequently letters update (based on scroll units)
const updateRate = 50;
let lastFrame = 0;

/**
 * Draws Matrix-style rain text using scrollY as the animation controller.
 */
function drawMatrix(scrollY) {
  const frame = Math.floor(scrollY / updateRate);

  // Add a translucent black layer to simulate fading trails
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns; i++) {
    const x = i * fontSize;
    const baseOffset = scrollY / 5 + columnOffsets[i] * 5;
    const y = Math.floor(baseOffset) % canvas.height;

    // Only update each column's character every N scroll units
    if (frame !== lastFrame) {
      currentChars[i] = letters[Math.floor(Math.random() * letters.length)];
    }

    // Draw character in its column
    ctx.fillText(currentChars[i], x, y);
  }

  lastFrame = frame; // Update last rendered frame
}

// Redraw matrix rain on scroll
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  drawMatrix(scrollY);
});

// Resize canvas if window size changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
