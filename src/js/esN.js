function isNightTime() {
    const now = new Date();
    const hour = now.getHours();
    // Descomenta la siguiente línea si prefieres usar el horario basado en 6 pm a 6 am.
    return hour >= 18 || hour < 6; 
}

// Función para aplicar el estilo correspondiente
function applyTimeBasedStyles() {
    const body = document.body;
    const sky = document.querySelector('.sky');
    const petals = document.getElementById('petals');
    const clouds = document.querySelector('.clouds-container');
    const clouds2 = document.querySelector('.clouds-container2');
    const tree = document.querySelector('.tree');
    const svg = document.querySelector('svg'); // Seleccionamos el SVG directamente
    const luz = document.getElementById('luz'); // Seleccionamos el canvas de luciérnagas
  
    if (isNightTime()) {
      // Estilo nocturno
      body.classList.add('night-mode');
      sky.classList.remove('sky');
      sky.classList.add('sky-night');
      if (petals) petals.style.display = 'none';
      if (clouds) clouds.style.display = 'none';
      if (clouds2) clouds2.style.display = 'none';
      if (tree) tree.classList.add('night'); // Activar clase nocturna en el árbol
      if (svg) svg.classList.add('night'); // Activar tema nocturno en SVG
      if (luz) luz.style.display = 'block'; // Mostrar el canvas de luciérnagas
      
    } else {
      // Estilo diurno
      body.classList.remove('night-mode');
      sky.classList.remove('sky-night');
      sky.classList.add('sky');
      if (petals) petals.style.display = 'block';
      if (clouds) clouds.style.display = 'block';
      if (clouds2) clouds2.style.display = 'block';
      if (tree) tree.classList.remove('night'); // Remover clase nocturna en el árbol
      if (svg) svg.classList.remove('night'); // Activar tema diurno en SVG
      if (luz) luz.style.display = 'none'; // Ocultar el canvas de luciérnagas
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyTimeBasedStyles();
});
