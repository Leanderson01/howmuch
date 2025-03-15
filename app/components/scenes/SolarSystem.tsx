import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NavigationButton from '../ui/NavigationButton';

interface SolarSystemProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const starsRef = useRef<HTMLDivElement>(null);
  
  // Array com dados dos planetas
  const planets = [
    { name: 'Sol', size: 60, color: 'bg-yellow-500', distance: 0, orbitDuration: 0, hasRing: false },
    { name: 'Mercúrio', size: 8, color: 'bg-gray-400', distance: 100, orbitDuration: 88, hasRing: false },
    { name: 'Vênus', size: 12, color: 'bg-yellow-200', distance: 130, orbitDuration: 225, hasRing: false },
    { name: 'Terra', size: 12, color: 'bg-blue-500', distance: 170, orbitDuration: 365, hasRing: false },
    { name: 'Marte', size: 10, color: 'bg-red-500', distance: 210, orbitDuration: 687, hasRing: false },
    { name: 'Júpiter', size: 30, color: 'bg-yellow-600', distance: 270, orbitDuration: 4333, hasRing: false },
    { name: 'Saturno', size: 25, color: 'bg-yellow-300', distance: 340, orbitDuration: 10759, hasRing: true },
    { name: 'Urano', size: 18, color: 'bg-blue-300', distance: 400, orbitDuration: 30687, hasRing: false },
    { name: 'Netuno', size: 18, color: 'bg-blue-700', distance: 450, orbitDuration: 60190, hasRing: false }
  ];
  
  // Efeito para mover as estrelas
  useEffect(() => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;
    
    let animationFrameId: number;
    const starPositions: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];
    
    // Inicializa as posições das estrelas
    for (let i = 0; i < 200; i++) {
      starPositions.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    // Função para animar as estrelas
    const animateStars = () => {
      if (!starsContainer) return;
      
      starsContainer.innerHTML = '';
      
      starPositions.forEach((star) => {
        // Move a estrela
        star.x -= star.speed;
        
        // Reposiciona a estrela se sair da tela
        if (star.x < 0) {
          star.x = window.innerWidth;
          star.y = Math.random() * window.innerHeight;
        }
        
        // Cria o elemento da estrela
        const starElement = document.createElement('div');
        starElement.className = 'absolute rounded-full bg-white';
        starElement.style.width = `${star.size}px`;
        starElement.style.height = `${star.size}px`;
        starElement.style.left = `${star.x}px`;
        starElement.style.top = `${star.y}px`;
        starElement.style.opacity = star.opacity.toString();
        
        starsContainer.appendChild(starElement);
      });
      
      animationFrameId = requestAnimationFrame(animateStars);
    };
    
    animateStars();
    
    // Limpa a animação quando o componente é desmontado
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Função para abrir o link da lua
  const handleMoonClick = () => {
    window.open('https://sweet-gray.vercel.app/', '_blank');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Estrelas de fundo */}
      <div ref={starsRef} className="absolute inset-0 z-0"></div>
      
      {/* Sistema Solar */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Órbitas */}
        {planets.slice(1).map((planet) => (
          <div 
            key={`orbit-${planet.name}`}
            className="absolute border border-gray-700 rounded-full"
            style={{
              width: planet.distance * 2,
              height: planet.distance * 2,
              opacity: 0.3
            }}
          />
        ))}
        
        {/* Sol */}
        <div 
          className={`absolute rounded-full ${planets[0].color} z-20`}
          style={{
            width: planets[0].size,
            height: planets[0].size,
            boxShadow: '0 0 50px 10px rgba(255, 200, 0, 0.5)'
          }}
        >
          {/* Efeito de brilho solar */}
          <div className="absolute inset-0 rounded-full bg-yellow-300 animate-pulse opacity-70"></div>
        </div>
        
        {/* Planetas */}
        {planets.slice(1).map((planet) => (
          <motion.div
            key={planet.name}
            className="absolute"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: planet.orbitDuration / 50, // Velocidade baseada no período orbital real
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: planet.distance * 2,
              height: planet.distance * 2,
              transformOrigin: 'center center',
            }}
          >
            <div 
              className={`absolute rounded-full ${planet.color} z-20`}
              style={{
                width: planet.size,
                height: planet.size,
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: planet.name === 'Terra' ? '0 0 10px 2px rgba(100, 200, 255, 0.5)' : ''
              }}
            >
              {/* Anéis de Saturno */}
              {planet.hasRing && (
                <div 
                  className="absolute bg-yellow-200 opacity-80"
                  style={{
                    width: planet.size * 1.8,
                    height: planet.size * 0.3,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(30deg)',
                    borderRadius: '50%'
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Lua clicável */}
        <motion.div
          className="absolute cursor-pointer z-30"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 27.3, // Período orbital da lua
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: 190, // Um pouco maior que a órbita da Terra
            height: 190,
            transformOrigin: 'center center',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div 
            onClick={handleMoonClick}
            className="absolute rounded-full bg-gray-300 z-20"
            style={{
              width: 6,
              height: 6,
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 5px 1px rgba(255, 255, 255, 0.5)'
            }}
            title="Clique para uma surpresa especial"
          />
        </motion.div>
      </div>
      
      {/* Conteúdo */}
      <div className="flex flex-col items-center justify-center h-full z-20">
        <div className="flex-1"></div> {/* Espaçador para empurrar o conteúdo para baixo */}
        
        <motion.div 
          className="z-30 text-center p-6 bg-black bg-opacity-70 rounded-lg max-w-2xl backdrop-blur-sm mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Sistema Solar</h2>
          <p className="text-lg md:text-xl">
            Meu amor por você é como todo o sistema solar. Cada planeta, cada órbita, 
            cada movimento celeste é apenas uma fração do que sinto por você. 
            Assim como o Sol ilumina e dá vida a todos os planetas, você ilumina e dá vida aos meus dias.
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 flex space-x-10 z-40">
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

export default SolarSystem; 