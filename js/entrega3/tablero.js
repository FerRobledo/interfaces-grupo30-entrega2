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
        this.ocupados = [];
        this.ultimoPintado = null;
    }

    crearTablero() {

        if(this.espacios.length === 0){

            for (let col = 0; col < this.cols; col++) {
                let colCircles = [];
                for (let row = 0; row < this.rows; row++) {
                    let posX = this.startX + col * (this.cellSize + this.margin) + this.cellSize / 2;
                    let posY = this.startY + row * (this.cellSize + this.margin) + this.cellSize / 2;
                    let circle = new Circulo(posX, posY, this.cellSize / 2, '#fff', this.ctx);
                    colCircles.push(circle);
                    circle.draw(); // Dibuja cada círculo en el tablero
                }
                this.espacios.push(colCircles); // Añadir cada fila de círculos al tablero
            }
            this.instanciarOcupados();
        } else {
            this.dibujarTablero();
        }
    }

    instanciarOcupados(){
        for(let i = 0; i < this.espacios.length; i++){
            this.ocupados[i] = 0;
        }
    }

    dibujarTablero(){
        for(let col = 0; col < this.cols; col++){
            for(let row = 0; row < this.rows; row++){
                this.espacios[col][row].draw();
            }
        }
    }

    encontrarUltimaFilaDisponible(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.espacios[col][row].estaOcupada()) { // Si el espacio está libre
                return row;
            }
        }
        return null; // Si la columna está llena
    }


    buscarColumna(posX){ 
        for(let col = 0; col < this.cols ; col++){ //Recorre todas las columnas del tablero
            console.log(this.espacios[col][0].comprobarAltura(posX));
           if(this.espacios[col][0].comprobarAltura(posX)){ // Comprueba si la posicion del mouse en X coincide con la posicion en X de la columna
                
                if(this.ultimoPintado != null) 
                    this.ultimoPintado.setFill("#fff"); // Pintar de blanco cuando el mouse sale de la columna
                
                let filaDisponible = this.encontrarUltimaFilaDisponible(col);
                this.espacios[col][filaDisponible].setFill("#aaa"); // Pintar de gris para indicar donde caeria la ficha
                this.espacios[col][filaDisponible].draw();
                this.ultimoPintado = this.espacios[col][filaDisponible];
            
            }
        }
    }

}
