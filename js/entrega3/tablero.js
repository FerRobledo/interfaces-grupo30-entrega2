import { Circulo } from './circulo.js';

export class Tablero {
    constructor(ctx, rows, cols, canvas) {
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;
        this.cellSize = 60;
        this.margin = 10;
        this.startX = (canvas.width - (cols * (this.cellSize + this.margin))) / 2;
        this.startY = 170;
        this.espacios = [];  // Agrega esta línea para inicializar los espacios
    }

    crearTablero() {
        for (let row = 0; row < this.rows; row++) {
            let rowCircles = [];
            for (let col = 0; col < this.cols; col++) {
                let posX = this.startX + col * (this.cellSize + this.margin) + this.cellSize / 2;
                let posY = this.startY + row * (this.cellSize + this.margin) + this.cellSize / 2;
                let circle = new Circulo(posX, posY, this.cellSize / 2, '#fff', this.ctx);
                rowCircles.push(circle);
                circle.draw(); // Dibuja cada círculo en el tablero
            }
            this.espacios.push(rowCircles); // Añadir cada fila de círculos al tablero
        }
    }

    encontrarUltimaFilaDisponible(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.espacios[row][col].color === '#fff') { // Si el espacio está libre
                return row;
            }
        }
        return null; // Si la columna está llena
    }
}
