document.querySelector(".menu-toggle.first").addEventListener("click", function(){
    var barralateral = document.querySelector(".nav");
    var categorias = document.querySelectorAll(".categoria");

    barralateral.classList.toggle("navExtendido");
    categorias.forEach(element => {
        var nombre = element.querySelector("p");
        console.log(nombre);
        setTimeout(function() {
            nombre.classList.toggle('nombreExtendido');
        }, 70);
        element.classList.toggle("categoriaExtendida");
    });
})