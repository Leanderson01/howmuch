import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NavigationButton from '../ui/NavigationButton';

interface EarthProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const Earth: React.FC<EarthProps> = ({ onNavigateNext, onNavigatePrev }) => {
  const earthRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animação de rotação contínua da Terra
    const earthElement = earthRef.current;
    const cloudElement = cloudRef.current;
    
    if (earthElement && cloudElement) {
      let earthRotation = 0;
      let cloudRotation = 0;
      
      const animateEarth = () => {
        earthRotation += 0.05;
        cloudRotation += 0.07;
        
        earthElement.style.transform = `rotate(${earthRotation}deg)`;
        cloudElement.style.transform = `rotate(${cloudRotation}deg)`;
        
        requestAnimationFrame(animateEarth);
      };
      
      const animationId = requestAnimationFrame(animateEarth);
      
      return () => {
        cancelAnimationFrame(animationId);
      };
    }
  }, []);

  // Função para abrir o link da lua
  const handleMoonClick = () => {
    window.open('https://sweet-gray.vercel.app/', '_blank');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-blue-800 to-black text-white relative overflow-hidden">
      {/* Estrelas de fundo */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
      </div>
      
      {/* Lua clicável */}
      <motion.div
        className="absolute z-10 cursor-pointer"
        style={{
          top: '20%',
          right: '15%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f5f5f5, #d0d0d0)',
          boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.4)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        onClick={handleMoonClick}
      >
        {/* Crateras da lua */}
        <div className="absolute w-3 h-3 rounded-full bg-gray-300 opacity-70" style={{ top: '20%', left: '25%' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-gray-300 opacity-70" style={{ top: '50%', left: '60%' }}></div>
        <div className="absolute w-2 h-2 rounded-full bg-gray-300 opacity-70" style={{ top: '70%', left: '30%' }}></div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Planeta Terra */}
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          {/* Oceanos */}
          <div 
            className="absolute inset-0 rounded-full bg-blue-500 shadow-[inset_-10px_-10px_40px_rgba(0,0,0,0.5),0_0_50px_rgba(0,100,255,0.3)]"
            style={{ 
              background: 'radial-gradient(circle at 30% 30%, #4299e1, #2b6cb0)'
            }}
          ></div>
          
          {/* Continentes */}
          <div 
            ref={earthRef}
            className="absolute inset-0 rounded-full"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath fill='%2348bb78' d='M50,50 Q70,40 80,60 T100,70 T130,90 T150,70 Q160,60 140,50 T120,30 T90,20 T60,30 Z' /%3E%3Cpath fill='%2348bb78' d='M120,120 Q140,110 150,130 T170,140 Q180,130 160,120 T140,100 Z' /%3E%3Cpath fill='%2348bb78' d='M30,100 Q50,90 60,110 T80,120 Q90,110 70,100 T50,80 Z' /%3E%3Cpath fill='%2348bb78' d='M80,150 Q100,140 110,160 T130,170 Q140,160 120,150 T100,130 Z' /%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              transform: 'rotate(0deg)',
              transition: 'transform 0.5s linear'
            }}
          ></div>
          
          {/* Nuvens */}
          <div 
            ref={cloudRef}
            className="absolute inset-0 rounded-full"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M40,40 Q60,30 70,50 T90,60 Q100,50 80,40 T60,20 Z' /%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M110,30 Q130,20 140,40 T160,50 Q170,40 150,30 T130,10 Z' /%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M30,90 Q50,80 60,100 T80,110 Q90,100 70,90 T50,70 Z' /%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M100,120 Q120,110 130,130 T150,140 Q160,130 140,120 T120,100 Z' /%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M50,150 Q70,140 80,160 T100,170 Q110,160 90,150 T70,130 Z' /%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              transform: 'rotate(0deg)',
              transition: 'transform 0.5s linear'
            }}
          ></div>
          
          {/* Brilho atmosférico */}
          <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 blur-md"></div>
        </div>
      </motion.div>
      
      {/* Satélite orbitando */}
      <motion.div
        className="absolute z-20 w-3 h-3 bg-gray-200 rounded-full shadow-lg"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformOrigin: 'center center',
          left: 'calc(50% - 1.5px)',
          top: 'calc(50% - 150px)'
        }}
      />
      
      <motion.div 
        className="z-30 text-center p-6 bg-black bg-opacity-30 rounded-lg max-w-2xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Escala Planetária</h2>
        <p className="text-lg md:text-xl">
          Meu amor por você é maior que toda a Terra. Cada continente, cada oceano, 
          cada montanha e vale são apenas o começo de como te amo. Assim como nosso 
          planeta abriga toda a vida que conhecemos, meu coração abriga um amor que 
          cresce a cada dia por você.
        </p>
      </motion.div>
      
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
      
      {/* Estilo para animação de brilho das estrelas */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Earth; 