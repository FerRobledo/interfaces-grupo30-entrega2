// Importa las clases Circulo y Tablero
import { Circulo } from './circulo.js';
import { Tablero } from './tablero.js';

document.addEventListener("DOMContentLoaded", () => {

    // Inicia el juego cuando el DOM esté completamente cargado
    const reloj = document.querySelector(".reloj");
    const btnReset = document.getElementById("btn-reiniciar");
    const contenedorBotonesJuego = document.querySelector(".contenedorBotonesJuego");

    const btnVolverAtras = document.getElementById("volver-a-jugar");
    const showWinner = document.querySelector(".show-winner");
    const btnMenu = document.getElementById("btn-gomenu");


    reloj.style.display = "none";


    btnReset.addEventListener("click", () => reiniciar());
    btnMenu.addEventListener("click", () => menu());
    btnVolverAtras.addEventListener("click", () => volverAjugar());

    // Función para añadir event listeners a los botones
    function agregarEventListenersBotones() {
        const btn4linea = document.getElementById("btn-4linea");
        const btn5linea = document.getElementById("btn-5linea");
        const btn6linea = document.getElementById("btn-6linea");

        btn4linea.addEventListener("click", () => iniciarJuego(6, 7, 60, 4));
        btn5linea.addEventListener("click", () => iniciarJuego(7, 9, 55, 5));
        btn6linea.addEventListener("click", () => iniciarJuego(8, 10, 50, 6));

    }
    agregarEventListenersBotones();

    let contenedor = document.querySelector(".contenedorJuego");
    const contenedorOriginal = contenedor.innerHTML;
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
    function iniciarJuego(filas, columnas, tamanio, condVictoria) {
        cellSize = tamanio;

        contenedor.innerHTML = "";
        contenedorBotonesJuego.style.display = "none";
        contenedor.appendChild(canvas);
        reloj.style.display = "flex";

        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            tablero = new Tablero(ctx, filas, columnas, cellSize, canvas, condVictoria);
            tablero.crearTablero();
        }, 100);
        setTimeout(() => {
            cargarFichas();
        }, 200);
    }

    function menu() {
        turno = 0;
        arrFichas = [];
        ultimaFiguraClickeada = null;
        arrastre = false;
        sePuedeSoltar = false;
        fichaEnGravedad = false;
        clearCanvas();
        tablero.reiniciarTablero();
        contenedor.innerHTML = contenedorOriginal;
        contenedorBotonesJuego.style.display = "flex";
        reloj.style.display = "none";
        agregarEventListenersBotones();

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

        if (tablero) {
            tablero.reiniciarTablero(); // Asegúrate de que esta función reinicie todo en el Tablero
            tablero.crearTablero(); // Redibuja el tablero
        }
        cargarFichas();
    }

    // Función para cargar las fichas
    function cargarFichas() {
        arrFichas = [];
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
        let startX = n === 0 ? 10 : canvas.width - 210; // Posición inicial para Morty y Rick
        let startY = 20;
        let rows = 7; // Número de filas
        let cols = 3; // Número de columnas

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
                if (tablero.hayGanador(ultimaFiguraClickeada)) {
                    console.log("Ganador equipo: " + turno);
                    mostrarGanador(ultimaFiguraClickeada);
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

    // MUESTRO EL GANADOR EN PANTALLA

    function mostrarGanador(ultimaFicha) {
        let equipo = ultimaFicha.getEquipo();
        let image = document.getElementById("winner-image");
        let text = document.getElementById("winner-text");

        if (equipo == 0) {
            reloj.style.display = "none";
            canvas.style.zIndex = "none";
            contenedor.style.display = "none";
            showWinner.style.display = "flex";
            image.src = '/images/mortywins.gif';
            text.textContent = 'Morty Wins';
        } else if (equipo == 1) {
            reloj.style.display = "none";
            canvas.style.zIndex = "none";
            contenedor.style.display = "none";
            showWinner.style.display = "flex";
            image.src = '/images/rickwins.gif';  // Reemplaza con la ruta de la imagen del jugador 2
            text.textContent = 'Rick Wins';
        }
    }

    function volverAjugar() {
        reiniciar();
        showWinner.style.display = "none";

        contenedor.style.display = "flex";
        reloj.style.display = "flex";
    }

})