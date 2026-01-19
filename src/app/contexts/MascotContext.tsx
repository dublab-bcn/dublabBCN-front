import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SPRITE_CONFIGS } from '../components/Mascot/SpriteSheet';


type MascotAnimation = 'idle' | 'walk' | 'dance' | 'sing';

export type SpriteSet = keyof typeof SPRITE_CONFIGS;
export type MascotType = 'mascot';

type SpriteConfig = typeof SPRITE_CONFIGS[keyof typeof SPRITE_CONFIGS];
type AnimationKeys = keyof SpriteConfig;
export type SpriteAnimation = AnimationKeys extends string ? AnimationKeys : never;


interface MascotConfig {
  enabled: boolean;
  spriteSet: keyof typeof SPRITE_CONFIGS;
  type: MascotType;
  speed: number;
  autoRoam: boolean;
  showControls: boolean;
  startPosition: { x: number; y: number };
  scale: number;
  customSpriteUrl?: string;
}

interface MascotInteraction {
  type: string;
  element: HTMLElement | null;
  position: { x: number; y: number };
  timestamp: string;
}

interface MascotContextType {
  config: MascotConfig;
  interactions: MascotInteraction[];
  toggleMascot: () => void;
  updateConfig: (updates: Partial<MascotConfig>) => void;
  addInteraction: (interaction: MascotInteraction) => void;
  clearInteractions: () => void;
  setAnimation: (animation: SpriteAnimation) => void;
  currentAnimation: SpriteAnimation;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export const useMascot = () => {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error('useMascot must be used within MascotProvider');
  }
  return context;
};

interface MascotProviderProps {
  children: ReactNode;
  initialConfig?: Partial<MascotConfig>;
}

export const MascotProvider: React.FC<MascotProviderProps> = ({ 
  children, 
  initialConfig = {} 
}) => {

  const getDefaultStartPosition = () => {
    if (typeof window !== 'undefined') {
      return { 
        x: Math.max(window.innerWidth - 100, 50), 
        y: Math.max(window.innerHeight - 150, 50) 
      };
    }
    return { x: 50, y: 50 };
  };

  const getInitialConfig = (): MascotConfig => {
    const availableSpriteSets = Object.keys(SPRITE_CONFIGS) as SpriteSet[];
    const defaultSpriteSet = availableSpriteSets.includes('pixel') ? 'pixel' : availableSpriteSets[0];
    
    return {
      enabled: false,
      type: 'mascot',
      spriteSet: defaultSpriteSet,
      speed: 5,
      autoRoam: false,
      showControls: true,
      startPosition: getDefaultStartPosition(),
      scale: 2,
      ...initialConfig
    };
  };

  const [config, setConfig] = useState<MascotConfig>(getInitialConfig);
  const [interactions, setInteractions] = useState<MascotInteraction[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState<SpriteAnimation>('idle');

  useEffect(() => {
    localStorage.setItem('mascot-config', JSON.stringify(config));
  }, [config]);


  const toggleMascot = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const updateConfig = (updates: Partial<MascotConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const addInteraction = (interaction: MascotInteraction) => {
    setInteractions(prev => [...prev.slice(-9), interaction]);
  };

  const clearInteractions = () => {
    setInteractions([]);
  };

  return (
    <MascotContext.Provider value={{
      config,
      interactions,
      toggleMascot,
      updateConfig,
      addInteraction,
      clearInteractions,
      setAnimation: setCurrentAnimation,
      currentAnimation
    }}>
      {children}
    </MascotContext.Provider>
  );
};
