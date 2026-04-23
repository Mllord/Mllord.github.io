const nodes = document.querySelectorAll(".node");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  nodes.forEach((node, i) => {
    const depth = i * 600;
    const nodeZ = -depth + scrollY;
    node.style.transform = `translateX(-50%) translateZ(${nodeZ}px)`;

    if (scrollY > depth - 400 && scrollY < depth + 400) {
      node.classList.add("visible");
    } else {
      node.classList.remove("visible");
    }
  });
});

// Trigger a scroll event initially
window.dispatchEvent(new Event("scroll"));
