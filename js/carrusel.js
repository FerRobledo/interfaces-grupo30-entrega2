document.addEventListener('DOMContentLoaded', function () {
    const carouselContent = document.getElementById('carousel-content');
    const step = 120;  // Grados de rotación entre cada slide
    let angle = 0;

    // Función para ir al slide especificado
    function goToSlide(slideIndex) {
        angle = -slideIndex * step;  // Calcula el ángulo correcto en base al índice del slide
        updateCarousel();
    }

    // Actualiza la transformación del carrusel
    function updateCarousel() {
        carouselContent.style.transform = `translateZ(-35vw) rotateY(${angle}deg)`;
    }

    // Eventos para los botones
    document.getElementById('btn1').addEventListener('click', function () {
        goToSlide(0);  // Primer slide (índice 0)
    });

    document.getElementById('btn2').addEventListener('click', function () {
        goToSlide(1);  // Segundo slide (índice 1)
    });

    document.getElementById('btn3').addEventListener('click', function () {
        goToSlide(2);  // Tercer slide (índice 2)
    });
});
