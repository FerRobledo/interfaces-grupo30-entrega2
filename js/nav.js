document.querySelector(".menu-toggle.first").addEventListener("click", function(){
    var barralateral = document.querySelector(".nav");
    var categorias = document.querySelectorAll(".categoria");

    barralateral.classList.toggle("navExtendido");
    categorias.forEach(element => {
        var nombre = element.querySelector("p");
        
        if (barralateral.classList.contains("navExtendido")) {
            setTimeout(function() {
                nombre.classList.add('nombreExtendido');
            }, 70);
        } else {
            nombre.classList.remove('nombreExtendido');
        }

        element.classList.toggle("categoriaExtendida");
    });
});
