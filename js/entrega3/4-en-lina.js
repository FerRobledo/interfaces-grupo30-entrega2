// Importa las clases Circulo y Tablero
import { Circulo } from './circulo.js';
import { Tablero } from './tablero.js';
import { getSeleccion } from './seleccion-jugador.js';
import { inicializarFichas } from './seleccion-jugador.js';
import { startTimer } from './temporizador.js';


document.addEventListener("DOMContentLoaded", () => {

    // Inicia el juego cuando el DOM esté completamente cargado
    const reloj = document.querySelector(".reloj");
    const btnReset = document.getElementById("btn-reiniciar");
    const contenedorBotonesJuego = document.querySelector(".contenedorBotonesJuego");
    const arrowContainer = document.getElementById("arrow-container");
    const btnVolverAtras = document.getElementById("volver-a-jugar");
    const showWinner = document.querySelector(".show-winner");
    const btnMenu = document.getElementById("btn-gomenu");



    btnReset.addEventListener("click", () => reiniciar());
    btnMenu.addEventListener("click", () => menu());
    btnVolverAtras.addEventListener("click", () => volverAjugar());

    // Función para añadir event listeners a los botones
    function agregarEventListenersBotones() {
        const btn4linea = document.getElementById("btn-4linea");
        const btn5linea = document.getElementById("btn-5linea");
        const btn6linea = document.getElementById("btn-6linea");


        btn4linea.addEventListener("click", () => iniciarJuego(6, 7, 60, 4, 15, 70));
        btn5linea.addEventListener("click", () => iniciarJuego(7, 9, 55, 5, 15, 60));
        btn6linea.addEventListener("click", () => iniciarJuego(8, 10, 50, 6, 10, 65));

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
    let arrFichasColocar = [];
    let arrastre = false;
    let ultimaFiguraClickeada = null;
    let fondoJuego = new Image();
    fondoJuego.src = "./images/fondo-juego.jpg";
    let sePuedeSoltar = false;
    let turno = 0;
    let fichaEnGravedad = false;
    let cellSize = null;
    let fichasSeleccionadas = [];

    let turno0img = document.querySelector('#img-turno0');
    let turno1img = document.querySelector('#img-turno1');
    let turno0Div = document.querySelector("#contenedorImg-turno0");
    let turno1Div = document.querySelector("#contenedorImg-turno1");
    let turno0Etiqueta = document.querySelector("#turno0-etiqueta");
    let turno1Etiqueta = document.querySelector("#turno1-etiqueta");
    let turno0p = document.querySelector("#turno0-etiqueta p");
    let turno1p = document.querySelector("#turno1-etiqueta p");



    // Función principal para iniciar el juego
    function iniciarJuego(filas, columnas, tamanio, condVictoria, margin, distanciaTop) {
        fichasSeleccionadas = getSeleccion(); // Obtengo cuales fichas fueron seleccionadas en el menu (getSeleccion() es un metodo de seleccion-jugador.js)
        cellSize = tamanio;

        contenedor.innerHTML = "";
        contenedorBotonesJuego.style.display = "none";
        contenedor.appendChild(canvas);
        reloj.style.display = "flex";



        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);
        setTimeout(() => {
            tablero = new Tablero(ctx, filas, columnas, cellSize, canvas, condVictoria, arrowContainer, margin, distanciaTop);
            tablero.crearTablero();
            drawFigure(); // Dibuja el tablero después de crearlo




        }, 100);
        setTimeout(() => {
            cargarFichas();
            drawFigure(); // Dibuja las fichas después de cargarlas
            turno0Div.classList.add("activo");
            turno0Etiqueta.classList.add("extendido");
            turno0p.classList.add("extendido");
        }, 200);

        startTimer()
    }


    function menu() {
        turno = 0;
        arrFichas = [];
        ultimaFiguraClickeada = null;
        arrastre = false;
        sePuedeSoltar = false;
        fichaEnGravedad = false;
        clearCanvas();
        limpiarIndicadorTurnos();
        tablero.reiniciarTablero();
        contenedor.innerHTML = contenedorOriginal;
        contenedorBotonesJuego.style.display = "flex";
        reloj.style.display = "none";
        agregarEventListenersBotones();
        inicializarFichas();

    }

    function limpiarIndicadorTurnos() {
        turno0Div.classList.remove("activo");
        turno0Etiqueta.classList.remove("extendido");
        turno0p.classList.remove("extendido");

        turno1Div.classList.remove("activo");
        turno1Etiqueta.classList.remove("extendido");
        turno1p.classList.remove("extendido");
    }

    function reiniciar() {
        turno = 0;
        arrFichas = [];
        ultimaFiguraClickeada = null;
        arrastre = false;
        sePuedeSoltar = false;
        fichaEnGravedad = false;

        //SE LIMPIA EL INDICADOR DE TURNOS
        limpiarIndicadorTurnos();
        //

        clearCanvas(); // Limpiar el canvas
        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);

        if (tablero) {
            tablero.reiniciarTablero();
            tablero.crearTablero(); // Redibuja el tablero
        }

        setTimeout(() => {

            turno0Div.classList.add("activo");
            turno0Etiqueta.classList.add("extendido");
            turno0p.classList.add("extendido");

        }, 600);

        cargarFichas();
        startTimer()
        drawFigure();
    }

    // Función para cargar las fichas
    function cargarFichas() {
        arrFichasColocar = [];
        let fichasImg = [new Image(), new Image()];

        if (fichasSeleccionadas[0] === 0) {
            fichasImg[0].src = "./images/morty.jpeg";
            turno0img.src = "./images/morty.jpeg";
        } else {
            fichasImg[0].src = "./images/mortyEvil.jpg";
            turno0img.src = "./images/mortyEvil.jpg";
        }

        if (fichasSeleccionadas[1] === 2) {
            fichasImg[1].src = "./images/rick.jpeg";
            turno1img.src = "./images/rick.jpeg";
        } else {
            fichasImg[1].src = "./images/rickEvil.jpg";
            turno1img.src = "./images/rickEvil.jpg";
        }

        let loadedCount = 0;
        fichasImg.forEach((img, index) => {
            img.onload = function () {
                loadedCount++;
                if (loadedCount === fichasImg.length) {
                    fichas(ctx, arrFichasColocar, 0, fichasImg[0]);
                    fichas(ctx, arrFichasColocar, 1, fichasImg[1]);
                }
            };
        });
    }

    // Función para crear las fichas en el canvas
    function fichas(ctx, arrFichasColocar, n, img) {
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
                arrFichasColocar.push(circle);
                arrFichas.push(circle);
                circle.draw(); // Dibuja cada círculo
            }
        }
    }

    // Modificación de la función cargarFichas para permitir cargar fichas de un equipo específico
    function cargarFichasEquipo(equipo) {
        let img = new Image();

        // Seleccionar imagen según el equipo
        if (equipo === 0) {
            img.src = fichasSeleccionadas[0] === 0 ? "./images/morty.jpeg" : "./images/mortyEvil.jpg";
        } else if (equipo === 1) {
            img.src = fichasSeleccionadas[1] === 2 ? "./images/rick.jpeg" : "./images/rickEvil.jpg";
        }

        img.onload = function () {
            fichas(ctx, arrFichasColocar, equipo, img); // Cargar fichas del equipo especificado
            drawFigure(); // Redibujar después de cargar nuevas fichas
        };
    }

    // Función para verificar y regenerar fichas
    function verificarYRegenerarFichas() {
        let fichasEquipo0 = arrFichasColocar.filter(ficha => ficha.getEquipo() === 0);
        let fichasEquipo1 = arrFichasColocar.filter(ficha => ficha.getEquipo() === 1);

        // Verificar si se han terminado las fichas de cada equipo y recargarlas
        if (fichasEquipo0.length === 0) {
            cargarFichasEquipo(0);
        }
        if (fichasEquipo1.length === 0) {
            cargarFichasEquipo(1);
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
        arrFichasColocar.forEach(ficha => ficha.draw());
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


                if (tablero.comprobarGanador(ultimaFiguraClickeada)) {
                    let ganador = ultimaFiguraClickeada;
                    setTimeout(function () { mostrarGanador(ganador); }, 1000);
                }
                if (turno == 1) {
                    turno = 0;
                    //INDICADOR DE TURNO
                    turno1Div.classList.remove("activo");
                    turno0Div.classList.add("activo");
                    turno1Etiqueta.classList.remove("extendido");
                    turno0Etiqueta.classList.add("extendido");
                    turno1p.classList.remove("extendido");
                    turno0p.classList.add("extendido");
                }
                else {
                    turno = 1;
                    //INDICADOR DE TURNO
                    turno0Div.classList.remove("activo");
                    turno1Div.classList.add("activo");
                    turno0Etiqueta.classList.remove("extendido");
                    turno1Etiqueta.classList.add("extendido");
                    turno0p.classList.remove("extendido");
                    turno1p.classList.add("extendido");


                }

                drawFigure();


                ultimaFiguraClickeada = null;
            } else {
                ultimaFiguraClickeada.setPosition(ultimaFiguraClickeada.posXinicial, ultimaFiguraClickeada.posYinicial);
                ultimaFiguraClickeada = null;
                tablero.esconderFlechas()
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
            tablero.dibujarFlechas();
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
        for (let i = 0; i < arrFichasColocar.length; i++) {
            let element = arrFichasColocar[i];
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

                console.log("Fichas antes" + arrFichas);
                arrFichasColocar = arrFichasColocar.filter(fichaArreglo => fichaArreglo.estaOcupada() !== true); //Filtra por las ocupadas y establece a arrFichasColocar como el nuevo arreglo filtrado. Si no está ocupada (nunca se eligió), se queda.
                console.log("Fichas despues" + arrFichas);
                verificarYRegenerarFichas(); // Verificar y regenerar fichas después del turno

            }
        };
        tablero.esconderFlechas()
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

});