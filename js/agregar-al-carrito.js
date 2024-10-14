function mostrarOverlay(div) {
    const tarjeta = div.closest('.tarjeta-juego');
    const overlay = tarjeta.querySelector('.overlay-carrito');
    const imagenBoton = div.querySelector('img');


    overlay.classList.toggle('show');

    if (overlay.classList.contains('show')) {
        imagenBoton.src = './images/Botones-tarjeta-1.png'; 
    } else {
        imagenBoton.src = './images/Botones-tarjeta.png';
    }
}


document.querySelectorAll('.btn-carrito').forEach(div => {
    div.addEventListener('click', () => mostrarOverlay(div));
});