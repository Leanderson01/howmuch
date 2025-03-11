import React from 'react';
import { motion } from 'framer-motion';

interface FinalProps {
  onNavigatePrev: () => void;
  onRestart: () => void;
}

const Final: React.FC<FinalProps> = ({ onNavigatePrev, onRestart }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
      {/* Raios de luz */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 h-screen w-1 bg-white bg-opacity-20"
            style={{
              transformOrigin: 'top',
              rotate: `${i * 30}deg`,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.7, 0.5], scaleY: 1 }}
            transition={{ 
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
      
      {/* Cruz estilizada */}
      <motion.div
        className="absolute z-10 opacity-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="w-2 h-64 bg-white rounded-full" />
        <div className="w-40 h-2 bg-white rounded-full absolute top-16 left-1/2 -translate-x-1/2" />
      </motion.div>
      
      {/* Conteúdo principal */}
      <motion.div 
        className="z-20 text-center p-8 bg-black bg-opacity-40 rounded-lg max-w-3xl text-white backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Amor Infinito</h2>
        
        <motion.p 
          className="text-xl md:text-2xl italic mb-8 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          &ldquo;O homem deve amar sua mulher assim como Cristo amou a igreja 
          e se entregou por ela.&rdquo;
        </motion.p>
        
        <p className="text-lg md:text-xl mb-6">
          Assim como Cristo demonstrou o maior amor possível ao se entregar pela igreja,
          meu amor por você vai além de qualquer medida terrena ou cósmica.
          É um amor que transcende o universo, que não conhece limites,
          que se renova a cada dia e que durará para sempre.
        </p>
        
        <motion.p 
          className="text-xl md:text-2xl font-bold mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Eu te amo infinitamente.
        </motion.p>
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
          onClick={onRestart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Final; 