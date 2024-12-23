document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the "animate" class
    var animatedElements = document.querySelectorAll('.animate');

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 3 / 4 &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        animatedElements.forEach(function (el) {
            // Check if each element is in the viewport
            if (isElementInViewport(el)) {
                // Add the specific animation class to trigger the animation
                el.classList.add('fade-in');
            }
        });

        // Filter out elements that have been animated and remove them from the list
        animatedElements = Array.prototype.filter.call(animatedElements, function (el) {
            return !el.classList.contains('fade-in');
        });

        // If all elements have been animated, remove the scroll event listener
        if (animatedElements.length === 0) {
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Add a scroll event listener to trigger the animation
    window.addEventListener('scroll', handleScroll);

    // Trigger the check on page load
    handleScroll();
});

