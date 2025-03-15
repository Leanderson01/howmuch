import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NavigationButton from '../ui/NavigationButton';

interface MilkyWayProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const MilkyWay: React.FC<MilkyWayProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);
  
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
  
  // Efeito para criar estrelas cadentes
  useEffect(() => {
    const shootingStarsContainer = shootingStarsRef.current;
    if (!shootingStarsContainer) return;
    
    // Função para criar uma estrela cadente
    const createShootingStar = () => {
      // Limpa o container se tiver muitas estrelas cadentes
      if (shootingStarsContainer.children.length > 10) {
        shootingStarsContainer.innerHTML = '';
      }
      
      // Cria o elemento da estrela cadente
      const star = document.createElement('div');
      
      // Posição inicial aleatória no topo da tela
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight / 3); // Apenas no terço superior da tela
      
      // Tamanho aleatório
      const size = Math.random() * 3 + 2; // Aumentado para estrelas maiores
      
      // Duração aleatória
      const duration = Math.random() * 3 + 2; // Aumentado para duração maior
      
      // Distância aleatória
      const distance = Math.random() * 500 + 200; // Aumentado para distâncias maiores
      
      // Ângulo aleatório (principalmente para baixo e para a direita ou esquerda)
      const angle = (Math.random() * 60 + 30) * (Math.random() > 0.5 ? 1 : -1);
      
      // Calcula a posição final
      const endX = startX + distance * Math.sin(angle * Math.PI / 180);
      const endY = startY + distance * Math.cos(angle * Math.PI / 180);
      
      // Estilo da estrela cadente
      star.className = 'absolute bg-white rounded-full';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      
      // Cauda mais longa
      const tailLength = Math.random() * 100 + 50; // Comprimento da cauda
      star.style.boxShadow = `0 0 ${size * 2}px ${size}px rgba(255, 255, 255, 0.7), 
                             ${Math.sin(angle * Math.PI / 180) * -tailLength}px ${Math.cos(angle * Math.PI / 180) * -tailLength}px ${tailLength}px rgba(255, 255, 255, 0.3)`;
      star.style.opacity = '0';
      star.style.zIndex = '30';
      
      // Adiciona a estrela ao container
      shootingStarsContainer.appendChild(star);
      
      // Anima a estrela cadente
      setTimeout(() => {
        star.style.transition = `transform ${duration}s linear, opacity 0.3s ease-in, opacity 0.3s ease-out ${duration - 0.3}s`;
        star.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        star.style.opacity = '1';
        
        // Remove a estrela após a animação
        setTimeout(() => {
          star.remove();
        }, duration * 1000);
      }, 10);
    };
    
    // Cria estrelas cadentes em intervalos aleatórios
    const createShootingStars = () => {
      createShootingStar();
      
      // Intervalo aleatório entre 1 e 3 segundos (mais frequente)
      const nextInterval = Math.random() * 2000 + 1000;
      setTimeout(createShootingStars, nextInterval);
    };
    
    // Inicia a criação de estrelas cadentes
    createShootingStars();
    
    // Não é necessário limpar este efeito, pois ele será limpo quando o componente for desmontado
  }, []);
  
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Container para estrelas cadentes */}
      <div 
        ref={shootingStarsRef} 
        className="absolute inset-0 z-10 overflow-hidden"
      />
      
      <motion.div 
        className="z-20 text-center p-6 bg-black bg-opacity-30 rounded-lg max-w-2xl text-white backdrop-blur-sm"
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
        <p className="text-sm mt-4 text-blue-300">
          Observe as estrelas cadentes... Cada uma carrega um desejo meu por você.
        </p>
      </motion.div>
      
      <div className="absolute bottom-10 flex space-x-10 z-20">
        <NavigationButton
          direction="prev"
          onClick={onNavigatePrev}
        />
        
        <NavigationButton
          direction="next"
          onClick={onNavigateNext}
        />
      </div>
    </div>
  );
};

export default MilkyWay; 