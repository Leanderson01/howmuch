import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MilkyWayProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const MilkyWay: React.FC<MilkyWayProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Efeito para criar animação de estrelas
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
    
    // Cria estrelas
    const stars: { x: number; y: number; radius: number; speed: number; brightness: number }[] = [];
    for (let i = 0; i < 1000; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.05,
        brightness: Math.random()
      });
    }
    
    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenha o fundo da galáxia
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(75, 0, 130, 0.8)');
      gradient.addColorStop(0.5, 'rgba(25, 0, 60, 0.6)');
      gradient.addColorStop(1, 'rgba(0, 0, 20, 0.4)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Desenha as estrelas
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
        
        // Move as estrelas
        star.x += star.speed;
        
        // Reposiciona as estrelas que saem da tela
        if (star.x > canvas.width) {
          star.x = 0;
        }
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Via Láctea</h2>
        <p className="text-lg md:text-xl">
          Meu amor por você se estende por toda a Via Láctea. Bilhões de estrelas, 
          cada uma brilhando com a intensidade do que sinto por você. 
          Nossa galáxia inteira não é suficiente para conter este amor.
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

export default MilkyWay; 