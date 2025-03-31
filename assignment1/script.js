// Select the cursor element with the class "cursor"
const cursor = document.querySelector(".cursor");

// Get the canvas element where the trail will be drawn
const canvas = document.getElementById("trailCanvas");
// Get the 2D drawing context for the canvas
const ctx = canvas.getContext("2d");

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store the trail points
let trail = [];

// Event listener for mouse movement
window.addEventListener("mousemove", (e) => {
  // Move the cursor to the mouse position
  // Offsets ensure that the cursor is centered around the mouse pointer
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  // Add a new point to the trail at the mouse position
  // Include a timestamp to calculate the lifetime of the point
  trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

  // Remove points older than 0.2 seconds to create a fading effect
  trail = trail.filter((point) => Date.now() - point.time < 200);
});

// Function to draw the trail effect
function drawTrail() {
  // Clear the canvas before each frame to prevent overlap
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Start a new drawing path
  ctx.beginPath();
  ctx.strokeStyle = "white"; // Color of the trail line
  ctx.lineWidth = 1.5; // Thickness of the trail line

  // If there are at least two points, draw a line between them
  if (trail.length > 1) {
    // Start the line at the first point in the trail
    ctx.moveTo(trail[0].x, trail[0].y);
    // Draw a line to each subsequent point in the trail
    for (let i = 1; i < trail.length; i++) {
      ctx.lineTo(trail[i].x, trail[i].y);
    }
    // Render the line on the canvas
    ctx.stroke();
  }

  // Request the next frame for smooth animation
  requestAnimationFrame(drawTrail);
}

// Event listener to adjust canvas size if the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start drawing the trail effect
drawTrail();
