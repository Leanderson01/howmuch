import React from 'react';
import { motion } from 'framer-motion';

interface NavigationButtonProps {
  direction: 'prev' | 'next' | 'restart';
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => {
  // Definir o ícone baseado na direção
  const renderIcon = () => {
    switch (direction) {
      case 'prev':
        return (
          // Seta para esquerda
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        );
      case 'next':
        return (
          // Seta para direita
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        );
      case 'restart':
        return (
          // Ícone de reiniciar
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.button
      className="flex items-center justify-center bg-black bg-opacity-40 p-3 rounded-full text-white shadow-lg backdrop-blur-sm cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {renderIcon()}
    </motion.button>
  );
};

export default NavigationButton; 