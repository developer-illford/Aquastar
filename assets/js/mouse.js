const mouseBubble = document.querySelector(".mouse-bubble");

let mouseX = 0, mouseY = 0; // Target mouse position
let bubbleX = 0, bubbleY = 0; // Current bubble position
const speed = 0.1; // Adjust this for smoother (lower) or faster (higher) follow speed

// Track mouse position on movement
document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Smoothly update bubble position
function animateBubble() {
    // Calculate the distance to move in each frame
    bubbleX += (mouseX - bubbleX) * speed;
    bubbleY += (mouseY - bubbleY) * speed;

    // Apply the updated position
    mouseBubble.style.left = `${bubbleX}px`;
    mouseBubble.style.top = `${bubbleY}px`;

    // Continue the animation
    requestAnimationFrame(animateBubble);
}

// Start the animation
animateBubble();
