const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const minSpeedX = -0.3, maxSpeedX = 0.3; // Velocidad horizontal
const minSpeedY = 0.2, maxSpeedY = 1; // Velocidad vertical
const maxSpeedXAbsolute = 0.5; // Velocidad máxima horizontal

let windDirection = 0; // Dirección del viento (0 significa sin viento)
let windStrength = 0;  // Fuerza del viento
let windAcceleration = 0.002; // Aceleración inicial del viento
let petals = []; // Array de los pétalos
let isWindActive = true; // Bandera para activar o desactivar el viento según el tamaño de la pantalla
let petalLimit = 50; // Límite de pétalos

// Función para aplicar el viento progresivo
function applyWind() {
  if (!isWindActive) return; // Si el viento está desactivado, no aplicar nada

  petals.forEach(petal => {
    // Si no se ha alcanzado la velocidad máxima, se aplica la aceleración del viento
    if (Math.abs(petal.speedX) < maxSpeedXAbsolute) {
      petal.speedX += windDirection * windStrength;
    }

    // Limitar la velocidad horizontal a la velocidad máxima
    if (Math.abs(petal.speedX) > maxSpeedXAbsolute) {
      petal.speedX = Math.sign(petal.speedX) * maxSpeedXAbsolute;
    }

    // Si los pétalos alcanzan la velocidad máxima, reducimos progresivamente la aceleración del viento
    if (Math.abs(petal.speedX) >= maxSpeedXAbsolute) {
      windStrength -= 0.001; // Reducir la fuerza del viento
      if (windStrength < 0) windStrength = 0; // Asegurarse de que el viento no sea negativo
    }
  });

  // Continuar con la función de viento si está activo
  requestAnimationFrame(applyWind);
}

// Función para crear un nuevo pétalo
function createPetal() {
  const petal = {
    x: Math.random() * canvas.width, // Posición aleatoria en el eje X
    y: -(Math.random() * 20 + 10), // Comienza desde arriba
    size: Math.random() * 3 + 8, // Tamaño aleatorio
    speedX: Math.random() * (maxSpeedX - minSpeedX) + minSpeedX, // Velocidad horizontal
    speedY: Math.random() * (maxSpeedY - minSpeedY) + minSpeedY, // Velocidad vertical
    rotation: Math.random() * 180, // Rotación aleatoria
    rotationSpeed: Math.random() * 2 - 1, // Velocidad de rotación
    image: new Image() // Imagen del pétalo
  };
  petal.image.src = '../src/img/petal.png';  // Ruta de la imagen

  petals.push(petal);
}

// Función para animar los pétalos
function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

  // Eliminar y crear nuevos pétalos
  for (let i = petals.length - 1; i >= 0; i--) {
    const petal = petals[i];

    petal.x += petal.speedX; // Movimiento horizontal
    petal.y += petal.speedY; // Movimiento vertical

    petal.rotation += petal.rotationSpeed; // Rotación

    ctx.save();
    ctx.translate(petal.x, petal.y); // Mover al centro del pétalo
    ctx.rotate(petal.rotation * Math.PI / 180); // Convertir grados a radianes
    ctx.drawImage(petal.image, -petal.size / 2, -petal.size / 2, petal.size, petal.size); // Dibujar
    ctx.restore();

    // Eliminar los pétalos que salen del canvas
    if (petal.y > canvas.height || petal.x < 0 || petal.x > canvas.width) {
      petals.splice(i, 1); // Eliminar el pétalo
    }
  }

  // Limitar el número de pétalos y generar nuevos de forma gradual
  if (petals.length < petalLimit) {  // Cambia el límite según el tamaño de la pantalla
    createPetal(); // Crear un nuevo pétalo si hay espacio
  }

  // Continuar la animación
  requestAnimationFrame(animatePetals);
}

// Función para activar el viento
function startWind() {
  if (!isWindActive) return; // Si el viento está desactivado, no activarlo

  // Activar el viento
  windDirection = Math.random() < 0.5 ? 1 : -1; // Dirección aleatoria
  windStrength = 0.05; // Fuerza inicial del viento
  windAcceleration = 0.02; // Aceleración inicial

  // Continuar con la animación del viento
  applyWind();

  // Reiniciar el viento cada 4-10 segundos
  setTimeout(startWind, Math.random() * 6000 + 4000); // Viento cada 4-10 segundos
}

// Función para detectar el tamaño de la pantalla
function checkScreenSize() {
  if (window.innerWidth < 700) {
    isWindActive = false; // Desactivar el viento en pantallas pequeñas
    petalLimit = 60; // Límite de pétalos para pantallas pequeñas
  } else {
    isWindActive = true; // Activar el viento en pantallas grandes
    petalLimit = 150; // Límite de pétalos para pantallas grandes
  }
}

// Llamar a la función de verificación de tamaño de pantalla cuando la ventana cambie de tamaño
window.addEventListener('resize', checkScreenSize);

// Inicializar la animación y el viento
checkScreenSize(); // Verificar el tamaño de la pantalla inicialmente
animatePetals();
startWind();


//NUBES
document.addEventListener('DOMContentLoaded', function () {
  const clouds = document.querySelectorAll('.cloud');

  clouds.forEach(function(cloud) {
    // Generar una posición aleatoria entre 0% y 100%
    const randomPosition = Math.random() * 100; // Genera un número entre 0 y 100
    cloud.style.left = `${randomPosition}%`; // Asigna esa posición a la propiedad 'left'
  });
});
