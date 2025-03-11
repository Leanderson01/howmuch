import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Importando os componentes de cena
import Opening from '../scenes/Opening';
import Earth from '../scenes/Earth';
import SolarSystem from '../scenes/SolarSystem';
import MilkyWay from '../scenes/MilkyWay';
import Universe from '../scenes/Universe';
import Final from '../scenes/Final';

// Enum para os tipos de cena
export enum SceneType {
  OPENING = 'opening',
  EARTH = 'earth',
  SOLAR_SYSTEM = 'solar_system',
  MILKY_WAY = 'milky_way',
  UNIVERSE = 'universe',
  FINAL = 'final'
}

// Ordem das cenas
const sceneOrder = [
  SceneType.OPENING,
  SceneType.EARTH,
  SceneType.SOLAR_SYSTEM,
  SceneType.MILKY_WAY,
  SceneType.UNIVERSE,
  SceneType.FINAL
];

const SceneController: React.FC = () => {
  // Estado para controlar a cena atual
  const [currentScene, setCurrentScene] = useState<SceneType>(SceneType.OPENING);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  // Função para navegar para a próxima cena
  const navigateNext = () => {
    const currentIndex = sceneOrder.indexOf(currentScene);
    if (currentIndex < sceneOrder.length - 1) {
      setDirection('next');
      setCurrentScene(sceneOrder[currentIndex + 1]);
    }
  };
  
  // Função para navegar para a cena anterior
  const navigatePrev = () => {
    const currentIndex = sceneOrder.indexOf(currentScene);
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentScene(sceneOrder[currentIndex - 1]);
    }
  };
  
  // Função para reiniciar a jornada
  const restart = () => {
    setDirection('prev');
    setCurrentScene(SceneType.OPENING);
  };
  
  // Efeito para tocar sons quando a cena muda
  useEffect(() => {
    // Aqui podemos adicionar lógica para tocar sons específicos para cada cena
    // Exemplo: playSound(currentScene);
    
    // Também podemos adicionar lógica para pré-carregar recursos da próxima cena
  }, [currentScene]);
  
  // Variantes de animação para transições
  const variants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0
    })
  };
  
  // Renderiza a cena atual
  const renderScene = () => {
    switch (currentScene) {
      case SceneType.OPENING:
        return <Opening onNavigateNext={navigateNext} />;
      case SceneType.EARTH:
        return <Earth onNavigateNext={navigateNext} onNavigatePrev={navigatePrev} />;
      case SceneType.SOLAR_SYSTEM:
        return <SolarSystem onNavigateNext={navigateNext} onNavigatePrev={navigatePrev} />;
      case SceneType.MILKY_WAY:
        return <MilkyWay onNavigateNext={navigateNext} onNavigatePrev={navigatePrev} />;
      case SceneType.UNIVERSE:
        return <Universe onNavigateNext={navigateNext} onNavigatePrev={navigatePrev} />;
      case SceneType.FINAL:
        return <Final onNavigatePrev={navigatePrev} onRestart={restart} />;
      default:
        return <Opening onNavigateNext={navigateNext} />;
    }
  };
  
  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="w-full h-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SceneController; 