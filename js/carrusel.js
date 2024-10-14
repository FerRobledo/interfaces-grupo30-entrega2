document.addEventListener('DOMContentLoaded', function () {
    const carouselContent = document.getElementById('carousel-content');
    const step = 120;
    let angle = 0;
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    const buttons = [btn1, btn2, btn3];  // Agrupamos los botones en un array

    function goToSlide(slideIndex) {
        angle = -slideIndex * step;
        updateCarousel();
        updateActiveButton(slideIndex);  // Actualiza los botones activos
    }

    function updateCarousel() {
        carouselContent.style.transform = `translateZ(-35vw) rotateY(${angle}deg)`;
    }

    // Función para actualizar qué botón tiene la clase 'carousel-press'
    function updateActiveButton(activeIndex) {
        // Remueve la clase 'carousel-press' de todos los botones
        buttons.forEach((btn, index) => {
            if (index === activeIndex) {
                btn.classList.add('carousel-press');  // Añade la clase al botón activo
            } else {
                btn.classList.remove('carousel-press');  // Remueve la clase de los demás
            }
        });
    }

    // Eventos para los botones
    btn1.addEventListener('click', function () {
        goToSlide(0);  // Primer slide (índice 0)
    });

    btn2.addEventListener('click', function () {
        goToSlide(1);  // Segundo slide (índice 1)
    });

    btn3.addEventListener('click', function () {
        goToSlide(2);  // Tercer slide (índice 2)
    });
});

