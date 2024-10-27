// Importa la clase Circulo
import { Circulo } from './circulo.js';

// Inicia el juego cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', iniciarJuego);
let contenedor = document.querySelector(".contenedorJuego");
contenedor.innerHTML = '<canvas id="canvas" width="940" height="800"></canvas>';
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let arrFichas = [];
let espacios = [];
let arrastre = false;
let ultimaFiguraClickeada = null;
let fondoJuego = new Image();
fondoJuego.src = "./images/juegowallpaper.jpg";

// Función principal para iniciar el juego
function iniciarJuego() {


    fondoJuego.onload = () => {
        ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height);

        setTimeout(() => {
            crearTablero(canvas, ctx, espacios);
        }, 100);

        setTimeout(() => {
            cargarFichas(canvas, ctx, arrFichas);
        }, 200);
    };
}

// Función para crear el tablero
function crearTablero() {

    let canvasWidth = canvas.width;
    let rows = 6;
    let cols = 7;
    let cellSize = 60;
    let margin = 10;
    let startX = (canvasWidth - (cols * (cellSize + margin))) / 2;
    let startY = 170;

    for (let row = 0; row < rows; row++) {
        let rowCircles = [];
        for (let col = 0; col < cols; col++) {
            let posX = startX + col * (cellSize + margin) + cellSize / 2;
            let posY = startY + row * (cellSize + margin) + cellSize / 2;
            let circle = new Circulo(posX, posY, cellSize / 2, '#fff', ctx);
            rowCircles.push(circle);
            circle.draw(); // Dibuja cada círculo en el tablero
        }
        espacios.push(rowCircles); // Añadir cada fila de círculos al tablero
    }

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
    let cellSize = 60;
    let margin = 10;
    let startX = n === 0 ? 10 : 800; // Posición inicial para Morty y Rick
    let startY = 20;

    
    // Crear ficha y agregar al arreglo
    let circle = new Circulo(startX + cellSize / 2, startY + cellSize / 2, cellSize / 2, '#fff', ctx);
    circle.setImage(img);
    arrFichas.push(circle);
    circle.draw(); // Dibuja la ficha
}

// Función para limpiar el canvas si es necesario
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Redibuja el tablero y las fichas
function drawFigure() {

    clearCanvas(); // Limpia el canvas antes de redibujar
    ctx.drawImage(fondoJuego, 0, 0, canvas.width, canvas.height); //Dibuja el fondo
    crearTablero(); //Dibuja el tablero
    arrFichas.forEach(ficha => ficha.draw()); // Dibuja las fichas
}




/* MANEJO DE FICHAS Y MOUSE*/
canvas.addEventListener("mousedown", iniciarArrastre, false);
canvas.addEventListener("mouseup", detenerArrastre, false);
canvas.addEventListener("mousemove", arrastreActivo, false);
canvas.addEventListener("mousemove", cambiarCursor, false);

function iniciarArrastre(e) {
    let figuraClickeada = findClickedFigure(e.offsetX, e.offsetY);
    if (figuraClickeada != null) {
        arrastre = true;
        ultimaFiguraClickeada = figuraClickeada;

    }
}

function detenerArrastre() {
    arrastre = false;
    ultimaFiguraClickeada = null; // Limpiamos la referencia
}

function arrastreActivo(e) {
    if (arrastre && ultimaFiguraClickeada != null) {
        ultimaFiguraClickeada.setPosition(e.offsetX, e.offsetY);
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
        const element = arrFichas[i];
        if (element.isPointInside(x, y)) {
            return element; // Devuelve la figura clickeada
        }
    }
    return null; // Si no se encuentra, devuelve null
}

/* FIN DE FICHAS Y MOUSE*/
