import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface UniverseProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const Universe: React.FC<UniverseProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Efeito para criar animação do universo com galáxias realistas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Fundo do universo
    const drawBackground = () => {
      if (!canvas || !ctx) return;
      
      // Limpa o canvas completamente
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Cria um gradiente para o fundo do espaço
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#000000');
      bgGradient.addColorStop(0.5, '#050523');
      bgGradient.addColorStop(1, '#0A0A2A');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Adiciona algumas estrelas distantes
      for (let i = 0; i < 800; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };
    
    // Ajusta o tamanho do canvas para preencher a tela
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redesenha o fundo quando o tamanho muda
      drawBackground();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Classe para galáxias
    class Galaxy {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      type: 'spiral' | 'elliptical' | 'irregular';
      arms: number;
      opacity: number;
      
      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.size = 0;
          this.rotation = 0;
          this.rotationSpeed = 0;
          this.color = '#FFFFFF';
          this.type = 'spiral';
          this.arms = 2;
          this.opacity = 0;
          return;
        }
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        
        // Cores possíveis para galáxias
        const colors = [
          '#FF9D00', // Laranja
          '#7B68EE', // Azul médio
          '#4169E1', // Azul real
          '#9370DB', // Roxo médio
          '#FF6347', // Vermelho tomate
          '#20B2AA'  // Verde-azulado claro
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Tipos de galáxias
        const types = ['spiral', 'elliptical', 'irregular'] as const;
        this.type = types[Math.floor(Math.random() * types.length)];
        
        // Número de braços para galáxias espirais
        this.arms = Math.floor(Math.random() * 3) + 2; // 2 a 4 braços
        
        // Opacidade
        this.opacity = Math.random() * 0.5 + 0.5;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.type === 'spiral') {
          this.drawSpiralGalaxy(ctx);
        } else if (this.type === 'elliptical') {
          this.drawEllipticalGalaxy(ctx);
        } else {
          this.drawIrregularGalaxy(ctx);
        }
        
        ctx.restore();
      }
      
      drawSpiralGalaxy(ctx: CanvasRenderingContext2D) {
        // Núcleo da galáxia
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size / 2);
        gradient.addColorStop(0, `${this.color}`);
        gradient.addColorStop(0.3, `${this.color}99`); // 60% de opacidade
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Braços espirais
        for (let i = 0; i < this.arms; i++) {
          const armAngle = (i / this.arms) * Math.PI * 2;
          
          ctx.save();
          ctx.rotate(armAngle);
          
          // Desenha o braço espiral
          ctx.beginPath();
          ctx.moveTo(0, 0);
          
          for (let r = 0; r < this.size; r += 2) {
            const angle = r * 0.03;
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            
            ctx.lineTo(x, y);
          }
          
          ctx.strokeStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = this.size / 15;
          ctx.stroke();
          
          // Adiciona estrelas ao longo do braço
          for (let r = 0; r < this.size; r += 5) {
            const angle = r * 0.03;
            const variance = Math.random() * 10 - 5;
            const x = r * Math.cos(angle) + variance;
            const y = r * Math.sin(angle) + variance;
            
            const starSize = Math.random() * 1.5 + 0.5;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
            ctx.beginPath();
            ctx.arc(x, y, starSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        }
      }
      
      drawEllipticalGalaxy(ctx: CanvasRenderingContext2D) {
        // Galáxia elíptica (basicamente um gradiente oval)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, `${this.color}`);
        gradient.addColorStop(0.3, `${this.color}99`); // 60% de opacidade
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        // Desenha uma elipse
        const ratio = 0.6 + Math.random() * 0.4; // Razão entre largura e altura
        ctx.ellipse(0, 0, this.size, this.size * ratio, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Adiciona algumas estrelas
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * this.size * 0.8;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance * ratio;
          
          const starSize = Math.random() * 1.2 + 0.3;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, starSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      drawIrregularGalaxy(ctx: CanvasRenderingContext2D) {
        // Galáxia irregular (forma mais aleatória)
        const numBlobs = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < numBlobs; i++) {
          const blobSize = this.size * (0.3 + Math.random() * 0.7);
          const distance = this.size * Math.random() * 0.5;
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, blobSize);
          gradient.addColorStop(0, `${this.color}`);
          gradient.addColorStop(0.6, `${this.color}66`); // 40% de opacidade
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, blobSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Adiciona estrelas
          for (let j = 0; j < 20; j++) {
            const starAngle = Math.random() * Math.PI * 2;
            const starDistance = Math.random() * blobSize * 0.8;
            const starX = x + Math.cos(starAngle) * starDistance;
            const starY = y + Math.sin(starAngle) * starDistance;
            
            const starSize = Math.random() * 1.5 + 0.5;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
            ctx.beginPath();
            ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      update() {
        if (!canvas) return;
        
        this.rotation += this.rotationSpeed;
        
        // Move lentamente as galáxias
        this.x += Math.cos(this.rotation) * 0.1;
        this.y += Math.sin(this.rotation) * 0.1;
        
        // Mantém as galáxias dentro da tela
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }
    }
    
    // Cria galáxias
    const galaxies: Galaxy[] = [];
    for (let i = 0; i < 15; i++) {
      galaxies.push(new Galaxy());
    }
    
    // Função de animação
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Limpa o canvas com um efeito de rastro
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Redesenha o fundo periodicamente para garantir que sempre haja estrelas
      if (Math.random() < 0.005) {
        drawBackground();
      }
      
      // Atualiza e desenha as galáxias
      galaxies.forEach(galaxy => {
        galaxy.update();
        galaxy.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    // Desenha o fundo inicial
    drawBackground();
    
    // Inicia a animação
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <motion.div 
        className="z-10 text-center p-6 bg-black bg-opacity-30 rounded-lg max-w-2xl text-white backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Universo</h2>
        <p className="text-lg md:text-xl">
          Meu amor por você é como o universo inteiro. Infinito, em constante expansão, 
          cheio de mistérios e maravilhas. Cada galáxia, cada nebulosa, cada partícula 
          cósmica é apenas um fragmento do que sinto por você.
        </p>
        <p className="text-sm mt-4 text-blue-300">
          Observe as galáxias girando... Assim como elas, meu amor por você está sempre em movimento, sempre crescendo.
        </p>
      </motion.div>
      
      <div className="absolute bottom-10 flex space-x-10 z-20">
        <motion.button
          className="bg-white bg-opacity-20 p-3 rounded-full text-white backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          onClick={onNavigatePrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </motion.button>
        
        <motion.button
          className="bg-white bg-opacity-20 p-3 rounded-full text-white backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          onClick={onNavigateNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Universe; 