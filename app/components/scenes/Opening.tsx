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
        className="mt-16 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={onNavigateNext}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default Opening; 