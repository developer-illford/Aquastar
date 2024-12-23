const slider = document.querySelector('.service_cards_sec');
let isDown = false;
let startX;
let scrollLeft;


slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; 
    slider.scrollLeft = scrollLeft - walk;
});


slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
    isDown = false;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; 
    slider.scrollLeft = scrollLeft - walk;
});


document.addEventListener("DOMContentLoaded", () => {
    const serviceCardsSection = document.querySelector(".service_cards_sec");
    const leftArrow = document.querySelector(".scroll-left-arrow");
    const rightArrow = document.querySelector(".scroll-right-arrow");

    // Update arrow visibility based on scroll position
    const updateArrowVisibility = () => {
        const scrollableWidth = serviceCardsSection.scrollWidth - serviceCardsSection.clientWidth;

        // Show or hide left arrow
        if (serviceCardsSection.scrollLeft > 0) {
            leftArrow.classList.remove("hidden");
        } else {
            leftArrow.classList.add("hidden");
        }

        // Show or hide right arrow
        if (serviceCardsSection.scrollLeft < scrollableWidth) {
            rightArrow.classList.remove("hidden");
        } else {
            rightArrow.classList.add("hidden");
        }
    };

    // Scroll left when the left arrow is clicked
    leftArrow.addEventListener("click", () => {
        serviceCardsSection.scrollBy({
            left: -200, // Scroll left by 200px
            behavior: "smooth",
        });
    });

    // Scroll right when the right arrow is clicked
    rightArrow.addEventListener("click", () => {
        serviceCardsSection.scrollBy({
            left: 200, // Scroll right by 200px
            behavior: "smooth",
        });
    });

    // Update arrow visibility on scroll and resize
    serviceCardsSection.addEventListener("scroll", updateArrowVisibility);
    window.addEventListener("resize", updateArrowVisibility);

    // Initialize arrow visibility
    updateArrowVisibility();
});
