const canvas2 = document.getElementById('luz');
const ctx2 = canvas2.getContext('2d');

canvas2.width = window.innerWidth; 
canvas2.height = window.innerWidth < 1000 ? (window.innerHeight*0.6) : window.innerHeight; ;

const numFireflies = window.innerWidth < 700 ? 20 : 60;  

let fireflies = [];

class Firefly {
    constructor() {
      this.x = Math.random() * canvas2.width;
      this.y = Math.random() * canvas2.height; 
      this.size = Math.random() * 2 + 1; 
      this.alpha = Math.random() * 0.5 + 0.5; 
      this.speed = Math.random() * 1 + 0.4; 
  
      
      this.direction = (Math.random() * Math.PI / 4) - Math.PI / 8;
  
      
      if (Math.random() > 0.5) {
        this.direction += Math.PI; 
      }
  
      this.glowSize = Math.random() * 2 + 10; 
      this.glowAlpha = Math.random() * 0.5 + 0.2; 
  
      
      this.targetGlowSize = this.glowSize;
      this.targetGlowAlpha = this.glowAlpha;
      this.glowSizeSpeed = 0.05;  
      this.glowAlphaSpeed = 0.02; 
    }
  
    
    draw() {
      const gradient = ctx2.createRadialGradient(
        this.x, this.y, 0, 
        this.x, this.y, this.glowSize
      );
      gradient.addColorStop(0, `rgba(255, 255, 0, ${this.glowAlpha})`);
      gradient.addColorStop(1, 'rgba(255, 255, 0, 0)'); 
  
      ctx2.beginPath();
      ctx2.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      ctx2.fillStyle = gradient;
      ctx2.fill();
  
      ctx2.beginPath();
      ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx2.fillStyle = `rgba(255, 255, 0, ${this.alpha})`; 
      ctx2.fill();
    }
  
    
    update() {
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;
  
      if (this.x < 0 || this.x > canvas2.width) this.direction = Math.PI - this.direction;
  
      if (this.y <= 0) {
        this.y = 0; 
        this.direction = -this.direction; 
      }
     
      if (this.y >= canvas2.height) {
          this.y = canvas2.height;
          this.direction = -this.direction;
      }
  
      if (Math.random() > 0.995) {
        this.targetGlowSize = Math.random() * 10 + 10;
        this.targetGlowAlpha = 1 - (this.targetGlowSize / 20);
      }
  
      this.glowSize += (this.targetGlowSize - this.glowSize) * this.glowSizeSpeed;
      this.glowAlpha += (this.targetGlowAlpha - this.glowAlpha) * this.glowAlphaSpeed;
    }
  }
  


for (let i = 0; i < numFireflies; i++) {
  fireflies.push(new Firefly());
}

function animate() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height); 

  
  for (let firefly of fireflies) {
    firefly.update();
    firefly.draw();
  }

  requestAnimationFrame(animate); 
}

animate();
