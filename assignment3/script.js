// Select all timeline cards
const cards = document.querySelectorAll(".card");

// Base Z-position offset
const baseZ = -500;

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
