// const animatedLine = document.querySelector(".scroll-line-animated");
// const totalHeight = document.documentElement.scrollHeight - window.innerHeight;


// function generateSineWavePath(width, height, amplitude, frequency) {
//     const points = [];
//     const step = 20; 
//     const centerY = height / 2; 

//     for (let x = 0; x <= width; x += step) {
//         const y = centerY + amplitude * Math.sin((2 * Math.PI * frequency * x) / width);
//         points.push(`${x},${y}`);
//     }

//     return `M0,${centerY} ${points.map((point) => `L${point}`).join(" ")}`;
// }


// function updateScrollLine() {
//     const progress = window.scrollY / totalHeight; 
//     const pathLength = 2000; 
//     const dashOffset = progress * pathLength; 

//     animatedLine.style.strokeDasharray = `${dashOffset} ${pathLength}`; 
// }


// const sineWavePath = generateSineWavePath(window.innerWidth, 400, 100, 2); 
// animatedLine.setAttribute("d", sineWavePath);


// window.addEventListener("scroll", updateScrollLine);


// window.addEventListener("resize", () => {
//     const newPath = generateSineWavePath(window.innerWidth, 400, 100, 2);
//     animatedLine.setAttribute("d", newPath);
// });









const animatedLine = document.querySelector(".scroll-line-animated");
const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

// Function to generate a sine wave path
function generateSineWavePath(scrollOffset, width, height, amplitude, frequency) {
    const points = [];
    const step = 20; // Step size for X-coordinates
    const centerY = height / 2; // Center line for the wave

    for (let x = scrollOffset; x <= scrollOffset + width; x += step) {
        const y = centerY + amplitude * Math.sin((2 * Math.PI * frequency * x) / width);
        points.push(`${x - scrollOffset},${y}`); // Adjust for scrolling
    }

    return `M0,${centerY} ${points.map((point) => `L${point}`).join(" ")}`;
}

// Update the line as the user scrolls
function updateScrollLine() {
    const scrollTop = window.scrollY; // Current scroll position
    const wavePath = generateSineWavePath(scrollTop, 2000, 100, 50, 2); // Adjust amplitude & frequency
    animatedLine.setAttribute("d", wavePath);
}

// Attach scroll event listener
window.addEventListener("scroll", updateScrollLine);

// Generate the initial wave path
updateScrollLine();




