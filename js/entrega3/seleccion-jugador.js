let seleccion;
let fichas;

export function inicializarFichas(){

    let ficha1 = document.getElementById("ficha-1");
    let ficha2 = document.getElementById("ficha-2");
    let ficha3 = document.getElementById("ficha-3");
    let ficha4 = document.getElementById("ficha-4");
    fichas = [ficha1, ficha2, ficha3, ficha4];
    seleccion = [0, 2];
    
    
    ficha1.addEventListener("click", () => seleccionar(0));
    ficha2.addEventListener("click", () => seleccionar(1));
    ficha3.addEventListener("click", () =>  seleccionar(2));
    ficha4.addEventListener("click", () =>  seleccionar(3));
}

inicializarFichas();

function seleccionar(ficha){
    marcarSeleccion(ficha);
}


function marcarSeleccion(ficha){
    if(ficha < 2){
        for(let i = 0; i<2; i++){
            fichas[i].classList.remove("ficha-seleccionada");
            if(i === ficha){
                fichas[ficha].classList.toggle("ficha-seleccionada");
                seleccion[0] = ficha;
            }
        }
    } else{
        for(let i = 2; i<4; i++){
            fichas[i].classList.remove("ficha-seleccionada");
            if(i === ficha){
                fichas[ficha].classList.toggle("ficha-seleccionada");
                seleccion[1] = ficha;
            }
        }
    }
}

export function getSeleccion() {
    return seleccion;
}
