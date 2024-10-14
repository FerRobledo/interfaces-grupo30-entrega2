document.addEventListener('DOMContentLoaded', function () {
    const carouselContent = document.getElementById('carousel-content');
    const step = 120;  // Grados de rotación entre cada slide
    let angle = 0;
    let currentSlideIndex = 0; // Índice de la diapositiva actual
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

    // Navegación con flechas
    document.getElementById('prevBtn').addEventListener('click', () => {
        const newIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const newIndex = (currentSlideIndex + 1) % totalSlides;
        goToSlide(newIndex);
    });

    // Inicializa el cursor al cargar la página
    updateCursorStyles();
});
