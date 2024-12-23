const bubbles = document.querySelectorAll(".bubble");
let followMouse = false;

document.addEventListener("mousemove", (e) => {
    if (followMouse) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Clamp bubble positions to keep them within viewport bounds
        const bubble1X = Math.min(Math.max(e.clientX * 0.08, 20), viewportWidth - 170);
        const bubble1Y = Math.min(Math.max(e.clientY * 0.08, 20), viewportHeight - 170);
        const bubble2X = Math.min(Math.max(e.clientX * 0.05, 20), viewportWidth - 170);
        const bubble2Y = Math.min(Math.max(e.clientY * 0.05, 20), viewportHeight - 170);
        const bubble3X = Math.min(Math.max(e.clientX * 0.06, 20), viewportWidth - 170);
        const bubble3Y = Math.min(Math.max(e.clientY * 0.06, 20), viewportHeight - 170);

        // Apply the transformations with clamped values to prevent overflow
        bubbles[0].style.transform = `translate(${bubble1X}px, ${bubble1Y}px)`;
        bubbles[1].style.transform = `translate(${bubble2X}px, ${bubble2Y}px)`;
        bubbles[2].style.transform = `translate(${bubble3X}px, ${bubble3Y}px)`;
    }
});

document.addEventListener("touchmove", (e) => {
    if (followMouse) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const touch = e.touches[0];

        const bubble1X = Math.min(Math.max(touch.clientX * 0.08, 20), viewportWidth - 170);
        const bubble1Y = Math.min(Math.max(touch.clientY * 0.08, 20), viewportHeight - 170);
        const bubble2X = Math.min(Math.max(touch.clientX * 0.05, 20), viewportWidth - 170);
        const bubble2Y = Math.min(Math.max(touch.clientY * 0.05, 20), viewportHeight - 170);
        const bubble3X = Math.min(Math.max(touch.clientX * 0.06, 20), viewportWidth - 170);
        const bubble3Y = Math.min(Math.max(touch.clientY * 0.06, 20), viewportHeight - 170);

        bubbles[0].style.transform = `translate(${bubble1X}px, ${bubble1Y}px)`;
        bubbles[1].style.transform = `translate(${bubble2X}px, ${bubble2Y}px)`;
        bubbles[2].style.transform = `translate(${bubble3X}px, ${bubble3Y}px)`;
    }
});

// Enable follow mode on interaction start
document.addEventListener("mousedown", () => {
    followMouse = true;
    bubbles.forEach(bubble => bubble.style.animation = "none"); // Stop animation
});
document.addEventListener("mouseup", () => {
    followMouse = false;
    resetBubbles(); // Resume animation
});
document.addEventListener("touchstart", () => {
    followMouse = true;
    bubbles.forEach(bubble => bubble.style.animation = "none"); // Stop animation
});
document.addEventListener("touchend", () => {
    followMouse = false;
    resetBubbles(); // Resume animation
});

// Function to reset bubbles to original animation
function resetBubbles() {
    bubbles.forEach((bubble, index) => {
        bubble.style.animation = `float${index + 1} ${10 + index * 2}s infinite alternate ease-in-out`;
    });
}
