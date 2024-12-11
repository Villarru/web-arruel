const canvas2 = document.getElementById('luz');
const ctx2 = canvas2.getContext('2d');

// Ajustar el tamaño del canvas2
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

// Ajustar la cantidad de luciérnagas según el tamaño de la pantalla
const numFireflies = window.innerWidth < 700 ? 50 : 100;  // Reducir a la mitad en pantallas más pequeñas

// Definir los parámetros de la elipse
const cx = canvas2.width / 2; // Centro X de la elipse (en el medio del canvas)
const cy = canvas2.height / 2; // Centro Y de la elipse (en el medio del canvas)
const a = canvas2.width / 3; // Radio horizontal (más ancho)
const b = canvas2.height / 4; // Radio vertical (más estrecho)

// Arreglo para almacenar las luciérnagas
let fireflies = [];

// Clase para las luciérnagas
class Firefly {
  constructor() {
    this.x = Math.random() * canvas2.width;
    this.y = Math.random() * canvas2.height;
    this.size = Math.random() * 2 + 1; // Tamaño del punto (más pequeño)
    this.alpha = Math.random() * 0.5 + 0.5; // Opacidad del punto
    this.speed = Math.random() * 1 + 0.4; // Velocidad aleatoria

    // Inicializamos la dirección aleatoria
    this.angle = Math.random() * Math.PI * 2; // Dirección en el espacio angular

    this.glowSize = Math.random() * 2 + 10; // Tamaño inicial del resplandor
    this.glowAlpha = Math.random() * 0.5 + 0.2; // Opacidad inicial del resplandor
  }

  // Método para dibujar la luciérnaga
  draw() {
    // Crear un gradiente radial para el resplandor (como una sombra brillante)
    const gradient = ctx2.createRadialGradient(
      this.x, this.y, 0, // Centro (punto de la luciérnaga)
      this.x, this.y, this.glowSize // El tamaño del resplandor
    );
    
    // Definir los colores del gradiente: el centro (más opaco) y la periferia (más difuso)
    gradient.addColorStop(0, `rgba(255, 255, 0, ${this.glowAlpha})`);
    gradient.addColorStop(1, 'rgba(255, 255, 0, 0)'); // Transparente en el borde

    // Dibujar el resplandor difuso
    ctx2.beginPath();
    ctx2.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
    ctx2.fillStyle = gradient;
    ctx2.fill();

    // Dibujar el centro (punto amarillo)
    ctx2.beginPath();
    ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx2.fillStyle = `rgba(255, 255, 0, ${this.alpha})`; 
    ctx2.fill();
  }

  // Método para mover la luciérnaga
  update() {
    // Convertir la dirección a coordenadas X e Y
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Verificar si la luciérnaga está fuera de la elipse
    const distanceFromCenter = Math.pow(this.x - cx, 2) / Math.pow(a, 2) + Math.pow(this.y - cy, 2) / Math.pow(b, 2);
    
    // Si está fuera de la elipse, cambiar la dirección
    if (distanceFromCenter > 1) {
      this.angle += Math.PI; // Cambiar la dirección (dar vuelta)
    }

    // Hacer que el resplandor cambie suavemente
    if (Math.random() > 0.995) {
      this.targetGlowSize = Math.random() * 10 + 10;
      this.targetGlowAlpha = 1 - (this.targetGlowSize / 20); // A mayor tamaño, menor opacidad
    }

    // Suavizar la transición de tamaño y opacidad
    this.glowSize += (this.targetGlowSize - this.glowSize) * this.glowSizeSpeed;
    this.glowAlpha += (this.targetGlowAlpha - this.glowAlpha) * this.glowAlphaSpeed;
  }
}

// Crear las luciérnagas
for (let i = 0; i < numFireflies; i++) {
  fireflies.push(new Firefly());
}

// Animación
function animate() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Limpiar el canvas2

  // Actualizar y dibujar las luciérnagas
  for (let firefly of fireflies) {
    firefly.update();
    firefly.draw();
  }

  requestAnimationFrame(animate); // Llamar a la función de animación de nuevo
}

// Iniciar la animación
animate();
