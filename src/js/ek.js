const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const minSpeedX = -0.3, maxSpeedX = 0.3; // Velocidad inicial horizontal
const minSpeedY = 0.2, maxSpeedY = 1; // Velocidad vertical
const maxSpeedXAbsolute = 0.7; // Velocidad máxima horizontal

let windDirection = 0; 
let windStrength = 0;  
let windAcceleration = 0.007; // Aceleración inicial
let petals = []; 
let isWindActive = true; // Para desactivar el viento en pantallas delgadas
let petalLimit = 40; 


function applyWind() {
  if (!isWindActive) return;

  petals.forEach(petal => {
    // Si no se ha alcanzado la velocidad máxima, se aplica aceleración
    if (Math.abs(petal.speedX) < maxSpeedXAbsolute) {
      petal.speedX += windDirection * windStrength;
    }

    if (Math.abs(petal.speedX) > maxSpeedXAbsolute) {
      petal.speedX = Math.sign(petal.speedX) * maxSpeedXAbsolute;
    }

    // Si los pétalos alcanzan la velocidad máxima, reducir aceleración
    if (Math.abs(petal.speedX) >= maxSpeedXAbsolute) {
      windStrength -= 0.001; 
      if (windStrength < 0) windStrength = 0; 
    }
  });

  requestAnimationFrame(applyWind);
}

function createPetal() {
  const petal = {
    x: Math.random() * canvas.width+30,
    y: -(Math.random() * 20 + 10),
    size: Math.random() * 8 + 8, 
    speedX: Math.random() * (maxSpeedX - minSpeedX) + minSpeedX, 
    speedY: Math.random() * (maxSpeedY - minSpeedY) + minSpeedY,
    rotation: Math.random() * 180, 
    rotationSpeed: Math.random() * 2 - 1,
    image: new Image()
  };
  petal.image.src = '../src/img/petal.png'; 

  petals.push(petal);
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

  // Eliminar y crear nuevos pétalos
  for (let i = petals.length - 1; i >= 0; i--) {
    const petal = petals[i];

    petal.x += petal.speedX;
    petal.y += petal.speedY;

    petal.rotation += petal.rotationSpeed; 

    ctx.save();
    ctx.translate(petal.x, petal.y); 
    ctx.rotate(petal.rotation * Math.PI / 180); 
    ctx.drawImage(petal.image, -petal.size / 2, -petal.size / 2, petal.size, petal.size);
    ctx.restore();

    // Eliminar los pétalos
    if (petal.y > canvas.height+30 || petal.x < -30 || petal.x > canvas.width+30) {
      petals.splice(i, 1);
    }
  }


  if (petals.length < petalLimit) { 
    createPetal(); 
  }

  requestAnimationFrame(animatePetals);
}


function startWind() {
  if (!isWindActive) return;

  windDirection = Math.random() < 0.5 ? 1 : -1; 
  windStrength = 0.05; 
  windAcceleration = 0.02; 

  applyWind();

  // Reiniciar el viento
  setTimeout(startWind, Math.random() * 6000 + 4000); // Tiempo
}

function checkScreenSize() {
  if (window.innerWidth < 700) {
    isWindActive = false; 
    petalLimit = 30; 
  } else {
    isWindActive = true; 
    petalLimit = 60; 
  }
}

window.addEventListener('resize', checkScreenSize);

checkScreenSize(); 
animatePetals();
startWind();


//NUBES
document.addEventListener('DOMContentLoaded', function () {
  const clouds = document.querySelectorAll('.cloud');

  clouds.forEach(function(cloud) {
    const randomPosition = Math.random() * 140; 
    cloud.style.left = `${randomPosition}%`;
  });
});


//MENSAJE
const message = document.getElementById('message');
const overlay = document.createElement('div');

overlay.id = 'message-overlay';
document.body.appendChild(overlay);

const clickableElements = document.querySelectorAll('.click');

clickableElements.forEach(element => {
  element.addEventListener('click', () => {
    overlay.style.display = 'block';
    message.style.display = 'block';
  });
});

function getDayOfWeek() {
  const daysOfWeek = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ];
  const today = new Date();
  const day = today.getDay(); 
  return daysOfWeek[day];
}


//NOCHE
document.addEventListener("DOMContentLoaded", function() {
  const dayOfWeek = getDayOfWeek();
  
  const lastMess = document.querySelector('.hidden-message');
  const lastMessage = document.querySelector('.hidden-message-2');
  
  if (isNightTime()) {   
    lastMess.innerHTML = `Que las estrellas iluminen tus sueños`;  
    lastMessage.innerHTML = `⭐ ¡Feliz ${dayOfWeek}! ⭐`;    
  }else{
    lastMess.innerHTML = `Que tu día esté lleno de bendiciones`;  
    lastMessage.innerHTML = `🌸 ¡Feliz ${dayOfWeek}! 🌸`;
  }
  
});
