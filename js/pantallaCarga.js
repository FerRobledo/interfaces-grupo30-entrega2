document.addEventListener('DOMContentLoaded', function () {
    const contador = document.getElementById('contador');
    let progreso = 1;
    const tiempoIntervalo = 5000 / 100;
    document.body.style.overflow = 'hidden';
  
    const interval = setInterval(() => {
      contador.textContent = `${progreso}%`;
      progreso++;
      
      if (progreso > 100) {
        clearInterval(interval);
        document.getElementById('pantalla-carga').style.display = 'none';
        document.querySelector('main').style.display = 'block';
        document.body.style.overflow = 'auto';

      }
    }, tiempoIntervalo);
  }); 

