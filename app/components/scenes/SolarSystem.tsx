import React from 'react';
import { motion } from 'framer-motion';

interface SolarSystemProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onNavigateNext, onNavigatePrev }) => {
  // Array com dados dos planetas
  const planets = [
    { name: 'Sol', size: 40, color: 'bg-yellow-500', distance: 0 },
    { name: 'Mercúrio', size: 4, color: 'bg-gray-400', distance: 60 },
    { name: 'Vênus', size: 6, color: 'bg-yellow-200', distance: 80 },
    { name: 'Terra', size: 6, color: 'bg-blue-500', distance: 100 },
    { name: 'Marte', size: 5, color: 'bg-red-500', distance: 120 },
    { name: 'Júpiter', size: 20, color: 'bg-yellow-600', distance: 160 },
    { name: 'Saturno', size: 18, color: 'bg-yellow-300', distance: 200 },
    { name: 'Urano', size: 12, color: 'bg-blue-300', distance: 240 },
    { name: 'Netuno', size: 12, color: 'bg-blue-700', distance: 280 }
  ];

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Estrelas de fundo */}
        <div className="absolute inset-0 bg-black">
          {Array.from({ length: 200 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Sistema Solar */}
        <div className="absolute inset-0 flex items-center justify-center">
          {planets.map((planet, index) => (
            <motion.div
              key={planet.name}
              className="absolute rounded-full"
              style={{
                width: planet.size,
                height: planet.size,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: planet.distance,
              }}
              transition={{ 
                delay: index * 0.2,
                duration: 1 
              }}
            >
              <div className={`w-full h-full rounded-full ${planet.color}`} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="z-10 text-center p-6 bg-black bg-opacity-50 rounded-lg max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Sistema Solar</h2>
        <p className="text-lg md:text-xl">
          Meu amor por você é como todo o sistema solar. Cada planeta, cada órbita, 
          cada movimento celeste é apenas uma fração do que sinto por você.
        </p>
      </motion.div>
      
      <div className="absolute bottom-10 flex space-x-10">
        <motion.button
          className="bg-white bg-opacity-20 p-3 rounded-full"
          whileHover={{ scale: 1.1 }}
          onClick={onNavigatePrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </motion.button>
        
        <motion.button
          className="bg-white bg-opacity-20 p-3 rounded-full"
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

export default SolarSystem; 