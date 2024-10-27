const tarjetasContainers = document.querySelectorAll('.tarjetas');

tarjetasContainers.forEach(tarjetasContainer => {
    tarjetasContainer.addEventListener('scroll', () => {
        const maxScrollLeft = tarjetasContainer.scrollWidth - tarjetasContainer.clientWidth;
        
        if (tarjetasContainer.scrollLeft >= maxScrollLeft) {
            tarjetasContainer.style.paddingRight = '0px';
        } else {
            tarjetasContainer.style.paddingRight = '10px';
        }
    });
});

