import React from 'react';
import { motion } from 'framer-motion';

interface EarthProps {
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

const Earth: React.FC<EarthProps> = ({ onNavigateNext, onNavigatePrev }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-900 text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Placeholder para a imagem da Terra */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-500 bg-opacity-70 relative">
            {/* Aqui podemos adicionar detalhes do planeta como continentes */}
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="z-10 text-center p-6 bg-black bg-opacity-50 rounded-lg max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Escala Planetária</h2>
        <p className="text-lg md:text-xl">
          Meu amor por você é maior que toda a Terra. Cada continente, cada oceano, 
          cada montanha e vale são apenas o começo de como te amo.
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

export default Earth; 