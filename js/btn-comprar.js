document.querySelectorAll('.btn-carrito').forEach(div => {
    div.addEventListener('click', function() {
        let img = this.querySelector('img');
        let header = this.closest('.tarjeta-juego').querySelector('.header-juego');
        let carritoOk = this.parentElement.parentElement.parentElement.querySelector(".carrito-ok");
        console.log(carritoOk);
        // Cambiar la imagen
        let currentSrc = img.src.split('/').pop();
        if (currentSrc === 'carrito-de-compra-anadir.png') {
            img.src = './images/carrito-de-compra-menos.png';
        } else {
            img.src = './images/carrito-de-compra-anadir.png';
        }

        // Cambiar el estilo del header
        header.classList.toggle('gradient');
        carritoOk.classList.toggle('rotate');
    });
});