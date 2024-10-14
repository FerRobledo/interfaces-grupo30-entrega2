
btnCarrito = document.querySelectorAll('.btn-carrito');

btnCarrito.forEach(btnCarro => {
    btnCarro.addEventListener('click', function () {
        let tarjeta = btnCarro.closest('.tarjeta-juego');
        let overlay = tarjeta.querySelector('.overlay-carrito');
        console.log(overlay);
        let imagenBoton = btnCarro.querySelector('img');


        overlay.classList.toggle('show');

        if (overlay.classList.contains('show')) {
            imagenBoton.src = './images/Botones-tarjeta-1.png';
        } else {
            imagenBoton.src = './images/Botones-tarjeta.png';
        }
    })
});


