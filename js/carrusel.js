document.addEventListener('DOMContentLoaded', function () {
    const carouselContent = document.getElementById('carousel-content');
    const step = 120;
    let angle = 0;
    let currentIndex = 0;
    const totalSlides = 3; 
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    const buttons = [btn1, btn2, btn3];

    function goToSlide(slideIndex) {
        currentIndex = slideIndex;
        angle = -currentIndex * step;
        updateCarousel();
        updateActiveButton(currentIndex);
    }

    function updateCarousel() {
        carouselContent.style.transform = `translateZ(-35vw) rotateY(${angle}deg)`;
    }

    function updateActiveButton(activeIndex) {
        buttons.forEach((btn, index) => {
            if (index === activeIndex) {
                btn.classList.add('carousel-press');
            } else {
                btn.classList.remove('carousel-press'); 
            }
        });
    }


    btn1.addEventListener('click', function () {
        goToSlide(0);  
    });

    btn2.addEventListener('click', function () {
        goToSlide(1); 
    });

    btn3.addEventListener('click', function () {
        goToSlide(2); 
    });

    // Navegación con flechas
    document.getElementById('prevBtn').addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % totalSlides;
        goToSlide(newIndex);
    });
});
