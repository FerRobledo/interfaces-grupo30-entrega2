let timerInterval;
let timeElapsed = 0; // tiempo en segundos

document.addEventListener('DOMContentLoaded', startTimer);
document.getElementById("btn-reiniciar").addEventListener("click", startTimer);

function startTimer() {
    clearInterval(timerInterval); // Detiene el temporizador si ya está corriendo
    timeElapsed = 0; // Reinicia el tiempo

    timerInterval = setInterval(() => {
        timeElapsed++; // Incrementa el tiempo en 1 segundo

        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;

        // Formatea los minutos y segundos
        document.getElementById("timer").textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}
