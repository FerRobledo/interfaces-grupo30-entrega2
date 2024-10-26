// Importa la clase Circulo
import { Circulo } from './circulo.js';

// Agrega el evento para el botón de inicio del juego
//document.getElementById("play").addEventListener("click", iniciarJuego);
document.addEventListener('DOMContentLoaded', iniciarJuego);

// Función para iniciar el juego
function iniciarJuego() {
    let contenedor = document.querySelector(".contenedorJuego");
    contenedor.innerHTML = '<canvas id="canvas" width="940" height="612"></canvas>';
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let arrFichas = [];
    let espacios = [];
    crearTablero(canvas, ctx, espacios);
    cargarFichas(canvas, ctx, arrFichas);
}

// Función para crear el tablero
function crearTablero(canvas, ctx, espacios) {
    let img = new Image();
    img.src = "./images/fondo-juego.jpg";

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
                circle.draw(); // Dibuja cada círculo
            }
            espacios.push(rowCircles); // Añadir fila al tablero
        }
    }
}

function cargarFichas(canvas, ctx, arrFichas) {
    let fichasImg = [new Image(), new Image()];
    fichasImg[0].src = "./images/morty.png";
    fichasImg[0].onload = function () {
        fichas(ctx, arrFichas, 0, fichasImg[0]);
    };

    fichasImg[1].src = "./images/rick.png";
    fichasImg[1].onload = function () {
        fichas(ctx, arrFichas, 1, fichasImg[1]);
    }
}

function fichas(ctx, arrFichas, n, img) {

    let rows = 7;
    let cols = 2;
    let cellSize = 60;
    let margin = 10;
    let startX;
    if (n == 0) {
       startX = 10;
    } else {
       startX = 800;
    }
    let startY = 20;

    for (let row = 0; row < rows; row++) {
        let rowCircles = [];
        for (let col = 0; col < cols; col++) {
            let posX = startX + col * (cellSize + margin) + cellSize / 2;
            let posY = startY + row * (cellSize + margin) + cellSize / 2;
            let circle = new Circulo(posX, posY, cellSize / 2, '#fff', ctx);
            circle.setImage(img);
            rowCircles.push(circle);
            console.log(circle);
            circle.draw(); // Dibuja cada círculo
        }
        arrFichas.push(rowCircles);
    }

}


// Limpiar el canvas
function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Dibuja el tablero completo
function drawBoard(canvas, ctx, figures) {
    clearCanvas(canvas, ctx);
    figures.forEach(row => {
        row.forEach(circle => {
            circle.draw();
        });
    });
}

// Detectar clic en un círculo
function findClickedCircle(x, y, figures) {
    for (let row = 0; row < figures.length; row++) {
        for (let col = 0; col < figures[row].length; col++) {
            let circle = figures[row][col];
            if (circle.isPointInside(x, y)) {
                return circle;
            }
        }
    }
    return null;
}

// Cargar el script del círculo
function loadCircleScript() {
    const script = document.createElement('script');
    script.src = 'js/Circulo.js';
    script.type = "module";
    script.onload = () => {
        iniciarJuego(); // Inicia el 4 en línea después de cargar el script
    }
    document.body.appendChild(script);
}

