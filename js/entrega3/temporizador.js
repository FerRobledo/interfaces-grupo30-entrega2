let timerInterval;
let timeElapsed = 120; // tiempo en segundos

document.addEventListener('DOMContentLoaded', startTimer);
document.getElementById("btn-reiniciar").addEventListener("click", startTimer);

function startTimer() {
    clearInterval(timerInterval); // Detiene el temporizador si ya está corriendo
    timeElapsed = 120; // Reinicia el tiempo

    timerInterval = setInterval(() => {
        if (timeElapsed <= 0) {
            clearInterval(timerInterval); // Detiene el temporizador si llega a 0
            document.getElementById("timer").textContent = "00:00"; // Muestra 00:00 al final
            return;
        }

        timeElapsed--; // Decrementa el tiempo en 1 segundo

        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;

        // Formatea los minutos y segundos
        document.getElementById("timer").textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}
