document.querySelector(".menu-toggle.first").addEventListener("click", function(){
    var barralateral = document.querySelector(".nav");
    var categorias = document.querySelectorAll(".categoria");

    barralateral.classList.toggle("navExtendido");
    categorias.forEach(element => {
        var nombre = element.querySelector("p");
        console.log(nombre);
        nombre.classList.toggle("nombreExtendido");
        element.classList.toggle("categoriaExtendida");
    });
})