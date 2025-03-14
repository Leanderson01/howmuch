import React from 'react';
import { motion } from 'framer-motion';

interface OpeningProps {
  onNavigateNext: () => void;
}

const Opening: React.FC<OpeningProps> = ({ onNavigateNext }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
      <motion.h1 
        className="text-5xl md:text-7xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Quanto Eu Te Amo?
      </motion.h1>
      
      <motion.div
        className="mt-16 flex items-center justify-center cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={onNavigateNext}
      >
        <div className="bg-black bg-opacity-40 p-3 rounded-full text-white shadow-lg animate-bounce backdrop-blur-sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Opening; 