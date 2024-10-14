document.addEventListener('DOMContentLoaded', function () {
    const carouselContent = document.getElementById('carousel-content');
    const step = 120;
    let angle = 0;
    let currentSlideIndex = 0;
    const totalSlides = document.querySelectorAll('.icon-cards__item').length;

    function goToSlide(slideIndex) {
        angle = -slideIndex * step;
        updateCarousel();
        currentSlideIndex = slideIndex;
        updateCursorStyles();
    }

    function updateCarousel() {
        carouselContent.style.transform = `translateZ(-35vw) rotateY(${angle}deg)`;
    }

    function updateCursorStyles() {
        const items = document.querySelectorAll('.icon-cards__item');
        items.forEach((item, index) => {
            item.style.cursor = index === currentSlideIndex ? 'default' : 'pointer';
        });
    }

    const items = document.querySelectorAll('.icon-cards__item');
    items.forEach((item, index) => {
        item.addEventListener('click', () => goToSlide(index));
    });


    document.getElementById('prevBtn').addEventListener('click', () => {
        const newIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const newIndex = (currentSlideIndex + 1) % totalSlides;
        goToSlide(newIndex);
    });


    updateCursorStyles();
});
