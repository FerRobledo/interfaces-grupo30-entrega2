function updateImages() {
    if (window.innerWidth <= 768) { // Si el ancho es menor o igual a 768px (pantalla pequeña)
        document.querySelectorAll('.icon-cards__item img')[0].src = './images/resp1.jpg';
        document.querySelectorAll('.icon-cards__item img')[1].src = './images/resp2.jpg';
        document.querySelectorAll('.icon-cards__item img')[2].src = './images/resp3.jpg';
    } else { // Para pantallas grandes
        document.querySelectorAll('.icon-cards__item img')[0].src = './images/banner1.png';
        document.querySelectorAll('.icon-cards__item img')[1].src = './images/banner2.png';
        document.querySelectorAll('.icon-cards__item img')[2].src = './images/banner3.png';
    }
}

// Llama a la función cuando la página cargue
window.onload = updateImages;

// Llama a la función cada vez que redimensionas la ventana
window.onresize = updateImages;
