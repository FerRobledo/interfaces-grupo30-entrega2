import { Circulo } from './circulo.js';

export class Tablero {
    constructor(ctx, rows, cols, cellSize, canvas, condVictoria, arrowContainer) {
        this.ctx = ctx;
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.margin = 10;
        this.startX = (canvas.width - (cols * (this.cellSize + this.margin))) / 2;
        this.startY = (canvas.height - (rows * (this.cellSize + this.margin))) / 2 + 50;
        this.espacios = [];  // Agrega esta línea para inicializar los espacios
        this.ocupados = [];
        this.ultimoPintado = null;
        this.columnaPintada = null;
        this.condVictoria = condVictoria;
        this.arrowContainer = arrowContainer;
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    crearTablero() {

        if (this.espacios.length === 0) {

            for (let col = 0; col < this.cols; col++) {
                let colCircles = [];
                for (let row = 0; row < this.rows; row++) {
                    let posX = this.startX + col * (this.cellSize + this.margin) + this.cellSize / 2;
                    let posY = this.startY + row * (this.cellSize + this.margin) + this.cellSize / 2;
                    let circle = new Circulo(posX, posY, posX, posY, this.cellSize / 2, '#fafafa', this.ctx);
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

    dibujarTablero() {
        // Dibuja los casilleros primero
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                let posX = this.startX + col * (this.cellSize + this.margin) + this.cellSize / 2;
                let posY = this.startY + row * (this.cellSize + this.margin) + this.cellSize / 2;
                this.ctx.fillStyle = '#10adc5'; // Color del casillero
                this.ctx.fillRect(
                    posX - this.cellSize / 2 - this.margin / 2,
                    posY - this.cellSize / 2 - this.margin / 2,
                    this.cellSize + this.margin,
                    this.cellSize + this.margin
                );
            }
        }

        // Luego dibuja los círculos encima de los casilleros
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                this.espacios[col][row].draw();
            }
        }
    }

    dibujarFlechas() {
        this.arrowContainer.innerHTML = ""; // Limpiar cualquier flecha anterior

        for (let col = 0; col < this.cols; col++) {
            const arrow = document.createElement("img");
            arrow.src = "./images/arrow.gif"; // Ruta de la imagen de la flecha
            arrow.style.position = "absolute";
            arrow.style.width = "50px"; // Ajustar según sea necesario
            arrow.style.height = "50px"; // Ajustar según sea necesario
            arrow.style.zIndex = 1;
            // Calcular la posición de la flecha
            let posX = this.startX + col * (this.cellSize + this.margin) + this.cellSize / 2 - 25;
            let posY = this.startY - 55; // Ajustar la posición Y para que esté justo encima del tablero

            arrow.style.left = `${posX}px`;
            arrow.style.top = `${posY}px`;

            // Agregar la flecha al contenedor
            this.arrowContainer.appendChild(arrow);
        }
    }

    esconderFlechas() {
        this.arrowContainer.innerHTML = "";
    }

    reiniciarTablero() {
        this.ocupados.fill(0); //Se llena todo el arreglo de ocupados con 0
        this.espacios = []; //Limpiamos espacios
        this.ocupados = []; //Limpiamos ocupados
        this.ultimoPintado = null;
        this.columnaPintada = null;

    }

    instanciarOcupados() {
        for (let i = 0; i < this.espacios.length; i++) {
            this.ocupados[i] = 0;
        }
    }

    encontrarUltimaFilaDisponible(col) { //RECORRE CADA FILA DE LA COLUMNA Y PREGUNTA SI ESTA OCUPADA (RECORRE DESDE ABAJO HACIA ARRIBA)
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.espacios[col][row].estaOcupada()) { // Si el espacio está libre
                return row;
            }
        }
        return null; // Si la columna está llena
    }


    buscarColumna(posX, posY) {
        let encontrada = false;
        for (let col = 0; col < this.cols; col++) { //Recorre todas las columnas del tablero
            let circle = this.espacios[col][0];
            if (circle.comprobarColumna(posX) && this.estaEnPosicion(circle, posY) && this.encontrarUltimaFilaDisponible(col) != null) { // Comprueba si la posicion del mouse en X coincide con la posicion en X de la columna
                encontrada = true;
                this.indicarDondeCae(col); // Pintar de gris el espacio en donde cae
                this.columnaPintada = col;
            }
        }

        if (!encontrada) { // Si no encuentra ninguna ficha despintar
            this.despintarUltimoPintado();
        };

        return encontrada;
    }

    // Comprueba que la ficha este por encima del tablero
    estaEnPosicion(circle, pos) {
        if (circle.getPosY() > pos && circle.getPosY() < pos + 100) {
            return true;
        }

        return false;
    }

    despintarUltimoPintado() {
        if (this.ultimoPintado != null) {

            this.ultimoPintado.setFill("#fff");
            this.ultimoPintado = null;

        }

        this.columnaPintada = null;
    }

    indicarDondeCae(col) {
        if (this.ultimoPintado != null)
            this.ultimoPintado.setFill("#fff"); // Pintar de blanco cuando el mouse sale de la columna

        let filaDisponible = this.encontrarUltimaFilaDisponible(col);
        this.espacios[col][filaDisponible].setFill("#a6d87c"); // Pintar de gris para indicar donde caeria la ficha
        this.espacios[col][filaDisponible].draw();
        this.ultimoPintado = this.espacios[col][filaDisponible];
    }

    actualizarColumna() {
        this.ocupados[this.columnaPintada]++;
    }

    getUltimoPintado() {
        return this.ultimoPintado;
    }

    hayGanador(ultimaFicha) {

        let jugadorActual = ultimaFicha.getEquipo();
        let columna = this.columnaPintada;
        let fila = this.encontrarUltimaFilaDisponible(this.columnaPintada);

        // Verificación horizontal
        let count = 1; // Contamos la última ficha
        // Hacia la izquierda
        for (let c = columna - 1; c >= 0; c--) {
            if (this.espacios[c][fila].getEquipo() === jugadorActual) {
                count++;
                if (count >= this.condVictoria) {
                    return true; // Ganador encontrado
                }
            } else {
                break; // Salimos si encontramos un espacio vacío
            }
        }
        // Hacia la derecha
        for (let c = columna + 1; c < this.cols; c++) {
            if (this.espacios[c][fila].getEquipo() === jugadorActual) {
                count++;
                if (count >= this.condVictoria) {
                    return true; // Ganador encontrado
                }
            } else {
                break; // Salimos si encontramos un espacio vacío
            }
        }

        // Verificación vertical
        count = 1; // Reiniciamos el conteo
        for (let f = fila + 1; f < this.rows; f++) {
            if (this.espacios[columna][f].getEquipo() === jugadorActual) {
                count++;
                if (count >= this.condVictoria) {
                    return true; // Ganador encontrado
                }
            } else {
                break; // Salimos si encontramos un espacio vacío
            }
        }

    }



    comprobarGanador(ultimaFicha) {
        let columna = this.columnaPintada;
        let fila = this.encontrarUltimaFilaDisponible(this.columnaPintada);
        let jugadorActual = ultimaFicha.getEquipo();
    
        // Método para recorrer una dirección específica
        let recorrer = (c, f, indiceCol, indiceRow) => {
            let count = 1; // La ficha actual cuenta como la primera
            for (let i = 1; i < this.condVictoria; i++) {
                let newCol = c + i * indiceCol;
                let newRow = f + i * indiceRow;
    
                // Verifica que esté dentro del tablero y que sea del mismo equipo
                if (
                    newCol < 0 || newCol >= this.cols ||
                    newRow < 0 || newRow >= this.rows ||
                    !this.espacios[newCol][newRow].estaOcupada() ||
                    this.espacios[newCol][newRow].getEquipo() !== jugadorActual
                ) {
                    break;
                }
                count++;
            }
            
            // Verificar en dirección opuesta
            for (let i = 1; i < this.condVictoria; i++) {
                let newCol = c - i * indiceCol;
                let newRow = f - i * indiceRow;
    
                if (
                    newCol < 0 || newCol >= this.cols ||
                    newRow < 0 || newRow >= this.rows ||
                    !this.espacios[newCol][newRow].estaOcupada() ||
                    this.espacios[newCol][newRow].getEquipo() !== jugadorActual
                ) {
                    break;
                }
                count++;
            }
    
            return count >= this.condVictoria;
        };
    
        // Verificar todas las direcciones
        return (
            recorrer(columna, fila, 1, 0) ||   // Horizontal
            recorrer(columna, fila, 0, 1) ||   // Vertical
            recorrer(columna, fila, 1, 1) ||   // Diagonal ↘️
            recorrer(columna, fila, 1, -1)     // Diagonal ↙️
        );
    }
}