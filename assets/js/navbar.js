function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}


// Select all navigation links
const navLinks = document.querySelectorAll(".nav-links ul li a");

// Function to set the active link
function setActiveLink() {
    navLinks.forEach((link) => {
        link.classList.remove("active"); // Remove active class from all links
    });
    this.classList.add("active"); // Add active class to the clicked link
}

// Attach click event listeners to all links
navLinks.forEach((link) => {
    link.addEventListener("click", setActiveLink);
});


const sections = document.querySelectorAll("section");
const options = {
    threshold: 0.6, // Trigger when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove("active"); // Remove active class from all links
                if (link.getAttribute("href").substring(1) === entry.target.id) {
                    link.classList.add("active"); // Add active class to the current section link
                }
            });
        }
    });
}, options);

// Observe all sections
sections.forEach((section) => {
    observer.observe(section);
});

