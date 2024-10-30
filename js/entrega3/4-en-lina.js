// Importa las clases Circulo y Tablero
import { Circulo } from './circulo.js';
import { Tablero } from './tablero.js';

document.addEventListener("DOMContentLoaded", () => {

    // Inicia el juego cuando el DOM esté completamente cargado
    const reloj = document.querySelector(".reloj");
    const btnReset = document.getElementById("btn-reiniciar");
    const btn4linea = document.getElementById("btn-4linea");
    const btn5linea = document.getElementById("btn-5linea");
    const btn6linea = document.getElementById("btn-6linea");

    reloj.style.display = "none";

    btn4linea.addEventListener("click", () => iniciarJuego(6, 7, 60));
    btn5linea.addEventListener("click", () => iniciarJuego(7, 9, 50));
    btn6linea.addEventListener("click", () => iniciarJuego(8, 10, 40));
    btnReset.addEventListener("click", () => reiniciar());

    let contenedor = document.querySelector(".contenedorJuego");
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = contenedor.clientWidth;
    canvas.height = contenedor.clientHeight;
    let ctx = canvas.getContext('2d');
    let tablero;
    let arrFichas = [];
    let arrastre = false;
    let ultimaFiguraClickeada = null;
    let fondoJuego = new Image();
    fondoJuego.src = "./images/fondo-juego.jpg";
    let sePuedeSoltar = false;
    let turno = 0;
    let fichaEnGravedad = false;
    let cellSize = null;

    // Función principal para iniciar el juego
    function iniciarJuego(filas, columnas, tamanio) {
        console.log("hola");
        cellSize = tamanio;

        contenedor.innerHTML = "";
        contenedor.appendChild(canvas);



        reloj.style.display = "block";

        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            tablero = new Tablero(ctx, filas, columnas, cellSize, canvas);
            tablero.crearTablero();
        }, 100);
        setTimeout(() => {
            cargarFichas();
        }, 200);
    }

    function reiniciar() {
        turno = 0;
        arrFichas = [];
        ultimaFiguraClickeada = null;
        arrastre = false;
        sePuedeSoltar = false;
        fichaEnGravedad = false;

        clearCanvas(); // Limpiar el canvas
        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);

        tablero.reiniciarTablero();
        tablero.crearTablero();

        cargarFichas();
    }

    // Función para cargar las fichas
    function cargarFichas() {
        let fichasImg = [new Image(), new Image()];
        fichasImg[0].src = "./images/morty.jpeg";
        fichasImg[1].src = "./images/rick.jpeg";

        let loadedCount = 0;
        fichasImg.forEach((img, index) => {
            img.onload = function () {
                loadedCount++;
                if (loadedCount === fichasImg.length) {
                    fichas(ctx, arrFichas, 0, fichasImg[0]);
                    fichas(ctx, arrFichas, 1, fichasImg[1]);
                }
            };
        });
    }

    // Función para crear las fichas en el canvas
    function fichas(ctx, arrFichas, n, img) {
        let margin = 10;
        let startX = n === 0 ? 10 : canvas.width - 140; // Posición inicial para Morty y Rick
        let startY = 20;
        let rows = 7; // Número de filas
        let cols = 2; // Número de columnas

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                let posX = startX + col * (cellSize + margin) + cellSize / 2;
                let posY = startY + row * (cellSize + margin) + cellSize / 2;
                let circle = new Circulo(posX, posY, posX, posY, cellSize / 2, '#fff', ctx, n); // Crear fichas
                circle.setImage(img);
                arrFichas.push(circle);
                circle.draw(); // Dibuja cada círculo
            }
        }
    }

    // Función para limpiar el canvas si es necesario
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Redibuja el tablero y las fichas
    function drawFigure() {
        clearCanvas(); // Limpia el canvas antes de redibujar
        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height); // Dibuja el fondo
        tablero.crearTablero(); // Dibuja el tablero
        arrFichas.forEach(ficha => ficha.draw()); // Dibuja las fichas
    }

    /* MANEJO DE FICHAS Y MOUSE */
    canvas.addEventListener("mousedown", iniciarArrastre, false);
    canvas.addEventListener("mouseup", detenerArrastre, false);
    canvas.addEventListener("mousemove", arrastreActivo, false);
    canvas.addEventListener("mousemove", cambiarCursor, false);

    function iniciarArrastre(e) {
        let figuraClickeada = findClickedFigure(e.offsetX, e.offsetY);
        sePuedeSoltar = false;
        if (figuraClickeada != null) {
            if (figuraClickeada.getEquipo() == turno && !figuraClickeada.estaOcupada() && fichaEnGravedad == false) { // Comprobar que no este ubicada y que sea del equipo correcto
                arrastre = true;
                ultimaFiguraClickeada = figuraClickeada;
            }
        }
    }

    function detenerArrastre() {
        if (arrastre) {

            arrastre = false;
            if (sePuedeSoltar) {
                soltarFicha(ultimaFiguraClickeada);
                if (tablero.alineoCuatro(ultimaFiguraClickeada)) {
                    console.log("Ganador equipo: " + turno);
                }
                if (turno == 1)
                    turno = 0;
                else
                    turno = 1;

                drawFigure();
                ultimaFiguraClickeada = null; // Limpiamos la referencia
            } else {
                ultimaFiguraClickeada.setPosition(ultimaFiguraClickeada.posXinicial, ultimaFiguraClickeada.posYinicial);
                ultimaFiguraClickeada = null;
                drawFigure();

            }
        }
    }

    function arrastreActivo(e) {
        if (arrastre && ultimaFiguraClickeada != null) {
            ultimaFiguraClickeada.setPosition(e.offsetX, e.offsetY);
            if (tablero.buscarColumna(e.offsetX, e.offsetY + 15)) {
                sePuedeSoltar = true;
            } else {
                sePuedeSoltar = false;
            }
            drawFigure(); // Redibuja después de mover la figura
        }
    }

    function cambiarCursor(e) {
        let figuraClickeada = findClickedFigure(e.offsetX, e.offsetY);
        if (figuraClickeada) {
            canvas.style.cursor = "pointer"; // Cambia el cursor al pasar sobre la ficha
        } else {
            canvas.style.cursor = "default"; // Restablece el cursor si no está sobre ninguna ficha
        }
    }

    function findClickedFigure(x, y) {
        for (let i = 0; i < arrFichas.length; i++) {
            let element = arrFichas[i];
            if (element.isPointInside(x, y)) {
                return element; // Devuelve la figura clickeada
            }
        }
        return null; // Si no se encuentra, devuelve null
    }

    function soltarFicha(ficha) {
        let velocidad = 10;
        const posX = tablero.ultimoPintado.getPosX();
        let posFinal = tablero.ultimoPintado.getPosY() - 15;
        let posRebote = posFinal - 30; // Altura del rebote
        let posInicial = ficha.getPosY();
        fichaEnGravedad = true;
        let rebote = 0;
        let reboteMaximo = 3; // Cantidad de rebotes

        const animarCaida = () => {
            // Verifica si la ficha ha alcanzado la posición final
            if (posInicial < posFinal) {
                // Actualiza la posición de la ficha
                posInicial += velocidad;
                ficha.setPosition(posX, posInicial);
                drawFigure();

                // Continúa la animación
                requestAnimationFrame(animarCaida);
            } else if (rebote < reboteMaximo) {
                // Genera un efecto de rebote
                rebote++;
                posInicial = posRebote; // Lleva la ficha a la posición de rebote
                posFinal += 5; // Ajusta el final para que rebote ligeramente menos en cada ciclo
                posRebote += 10; // Ajusta el rebote para disminuir cada vez

                requestAnimationFrame(animarCaida);
            } else {
                // Una vez que termina el último rebote
                ficha.setPosition(posX, posFinal);
                ficha.ocupar(ficha.getEquipo());
                tablero.ultimoPintado.ocupar(ficha.getEquipo());
                tablero.actualizarColumna(); // Indicar que cayó una ficha
                drawFigure();

                fichaEnGravedad = false;
            }
        };

        // Iniciar la animación
        animarCaida();
    }

});