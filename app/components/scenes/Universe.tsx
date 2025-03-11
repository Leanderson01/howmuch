import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface UniverseProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const Universe: React.FC<UniverseProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Efeito para criar animação do universo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajusta o tamanho do canvas para preencher a tela
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Cria galáxias e nebulosas
    const galaxies: { x: number; y: number; size: number; rotation: number; color: string; speed: number }[] = [];
    const colors = ['#FF5E5E', '#5E8AFF', '#5EFFFF', '#5EFF8A', '#FFFF5E', '#FF5EFF'];
    
    for (let i = 0; i < 20; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: (Math.random() - 0.5) * 0.2
      });
    }
    
    // Função de animação
    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Desenha as galáxias
      galaxies.forEach(galaxy => {
        ctx.save();
        ctx.translate(galaxy.x, galaxy.y);
        ctx.rotate(galaxy.rotation + time * galaxy.speed);
        
        // Cria um gradiente para a galáxia
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size);
        gradient.addColorStop(0, `${galaxy.color}`);
        gradient.addColorStop(0.5, `${galaxy.color}80`); // 50% de opacidade
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, galaxy.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Adiciona alguns pontos brilhantes (estrelas)
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * galaxy.size * 0.8;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
        
        // Move as galáxias lentamente
        galaxy.x += galaxy.speed;
        galaxy.y += galaxy.speed * 0.5;
        
        // Reposiciona as galáxias que saem da tela
        if (galaxy.x < -galaxy.size) galaxy.x = canvas.width + galaxy.size;
        if (galaxy.x > canvas.width + galaxy.size) galaxy.x = -galaxy.size;
        if (galaxy.y < -galaxy.size) galaxy.y = canvas.height + galaxy.size;
        if (galaxy.y > canvas.height + galaxy.size) galaxy.y = -galaxy.size;
      });
      
      requestAnimationFrame(animate);
    };
    
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
        className="z-10 text-center p-6 bg-black bg-opacity-50 rounded-lg max-w-2xl text-white"
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
      </motion.div>
      
      <div className="absolute bottom-10 flex space-x-10 z-20">
        <motion.button
          className="bg-white bg-opacity-20 p-3 rounded-full text-white"
          whileHover={{ scale: 1.1 }}
          onClick={onNavigatePrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </motion.button>
        
        <motion.button
          className="bg-white bg-opacity-20 p-3 rounded-full text-white"
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