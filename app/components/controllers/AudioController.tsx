import React, { createContext, useContext, useState, useEffect } from 'react';
import { Howl } from 'howler';
import { SceneType } from './SceneController';

// Interface para o contexto de áudio
interface AudioContextType {
  playSceneSound: (scene: SceneType) => void;
  playClickSound: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

// Criando o contexto
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Hook personalizado para usar o contexto de áudio
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio deve ser usado dentro de um AudioProvider');
  }
  return context;
};

// Propriedades do provedor de áudio
interface AudioProviderProps {
  children: React.ReactNode;
}

// Componente provedor de áudio
export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [sounds, setSounds] = useState<Record<string, Howl>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Efeito para carregar os sons
  useEffect(() => {
    // Definindo os sons para cada cena
    const sceneSounds = {
      [SceneType.OPENING]: new Howl({
        src: ['/assets/sounds/opening.mp3'],
        volume: 0.5,
        loop: true,
        preload: true,
      }),
      [SceneType.EARTH]: new Howl({
        src: ['/assets/sounds/earth.mp3'],
        volume: 0.5,
        loop: true,
        preload: true,
      }),
      [SceneType.SOLAR_SYSTEM]: new Howl({
        src: ['/assets/sounds/solar-system.mp3'],
        volume: 0.5,
        loop: true,
        preload: true,
      }),
      [SceneType.MILKY_WAY]: new Howl({
        src: ['/assets/sounds/milky-way.mp3'],
        volume: 0.5,
        loop: true,
        preload: true,
      }),
      [SceneType.UNIVERSE]: new Howl({
        src: ['/assets/sounds/universe.mp3'],
        volume: 0.5,
        loop: true,
        preload: true,
      }),
      [SceneType.FINAL]: new Howl({
        src: ['/assets/sounds/final.mp3'],
        volume: 0.5,
        loop: true,
        preload: true,
      }),
      click: new Howl({
        src: ['/assets/sounds/click.mp3'],
        volume: 0.3,
        preload: true,
      }),
    };

    setSounds(sceneSounds);
    setIsLoaded(true);

    // Limpeza ao desmontar
    return () => {
      Object.values(sceneSounds).forEach(sound => {
        sound.stop();
      });
    };
  }, []);

  // Função para tocar o som de uma cena
  const playSceneSound = (scene: SceneType) => {
    if (!isLoaded || isMuted) return;

    // Para todos os sons de cena
    Object.entries(sounds).forEach(([key, sound]) => {
      if (key !== 'click' && key !== scene) {
        sound.stop();
      }
    });

    // Toca o som da cena atual
    const sceneSound = sounds[scene];
    if (sceneSound && !sceneSound.playing()) {
      sceneSound.play();
    }
  };

  // Função para tocar o som de clique
  const playClickSound = () => {
    if (!isLoaded || isMuted) return;
    
    const clickSound = sounds.click;
    if (clickSound) {
      clickSound.play();
    }
  };

  // Função para alternar o estado de mudo
  const toggleMute = () => {
    setIsMuted(prev => {
      const newMuted = !prev;
      
      // Atualiza o estado de todos os sons
      Object.values(sounds).forEach(sound => {
        sound.mute(newMuted);
      });
      
      return newMuted;
    });
  };

  // Valor do contexto
  const value = {
    playSceneSound,
    playClickSound,
    toggleMute,
    isMuted,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

// Componente de controle de áudio
export const AudioControl: React.FC = () => {
  const { toggleMute, isMuted } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-2 bg-black bg-opacity-50 rounded-full text-white"
      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )}
    </button>
  );
};

export default AudioProvider; 