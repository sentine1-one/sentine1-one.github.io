document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Add canvas to home section
    const homeSection = document.querySelector('section[data-id="home"]');
    if (homeSection) {
      homeSection.querySelector('.section-content').appendChild(canvas);
      
      // Make sure title is above particles
      const titleBlock = homeSection.querySelector('.title-block');
      if (titleBlock) {
        titleBlock.style.position = 'relative';
        titleBlock.style.zIndex = '2';
      }
      
      // Initialize particles
      initParticles();
    }
    
    function initParticles() {
      const canvas = document.getElementById('particles-canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Particle class
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 2 - 1;
          this.speedY = Math.random() * 2 - 1;
          this.color = this.getRandomColor();
        }
        
        getRandomColor() {
          const colors = [
            'rgba(231, 76, 60, 0.7)',  // Red
            'rgba(52, 152, 219, 0.7)', // Blue
            'rgba(46, 204, 113, 0.7)', // Green
            'rgba(155, 89, 182, 0.7)', // Purple
            'rgba(241, 196, 15, 0.7)'  // Yellow
          ];
          return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Bounce off edges
          if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
          }
          
          if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
          }
        }
        
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Create particles
      const particles = [];
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
        
        // Draw connections
        connectParticles();
        
        requestAnimationFrame(animate);
      }
      
      // Connect particles with lines
      function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
              // Set line opacity based on distance
              const opacity = 1 - (distance / maxDistance);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Start animation
      animate();
    }
  }); 