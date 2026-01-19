import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { useMascot } from '@/app/contexts/MascotContext';
import { 
    getSpriteConfig, 
    getSpriteSheet, 
    type SpriteSet,
    type SpriteAnimation 
} from './SpriteSheet';
import './SpriteCharacter.css';

interface MascotSpriteProps {
  spriteSet?: SpriteSet;
  animation?: SpriteAnimation;
  direction?: 'left' | 'right';
  scale?: number;
  onAnimationComplete?: () => void;
  debug?: boolean;
}

const MascotSprite: React.FC<MascotSpriteProps> = ({
  spriteSet = 'pixel',
  animation = 'idle',
  direction = 'right',
  scale = 2,
  onAnimationComplete,
  debug = false
}) => {
    const { config } = useMascot();
    const [currentFrame, setCurrentFrame] = useState(0);
    const [spriteError, setSpriteError] = useState(false);
    const animationRef = useRef<NodeJS.Timeout>();
    const frameCountRef = useRef(0);

    const spriteConfig = getSpriteConfig(spriteSet, animation);
    const spriteSheet = getSpriteSheet(spriteSet, animation);
    
    useEffect(() => {
        if (!spriteConfig) return;

        const { frames, fps } = spriteConfig;
        const frameDuration = 1000 / fps;
        
        const animate = () => {
            setCurrentFrame(prev => {
                const nextFrame = (prev + 1) % frames;
                frameCountRef.current++;

                if (nextFrame === 0 && frameCountRef.current >= frames && onAnimationComplete) {
                    onAnimationComplete();
                }

                return nextFrame;
            });
            
            animationRef.current = setTimeout(animate, frameDuration);
        };

        animationRef.current = setTimeout(animate, frameDuration);
    
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, [animation, spriteConfig, onAnimationComplete]);

    useEffect(() => {
        setCurrentFrame(0);
        frameCountRef.current = 0;
    }, [animation]);

    const getSpriteStyle = (): CSSProperties => {
        if (!spriteConfig) return {};

        const { width, height, columns, rows } = spriteConfig;
        const frameWidth = width;
        const frameHeight = height;

        const col = currentFrame % columns;
        const row = Math.floor(currentFrame / columns);

        const backgroundPositionX = -(col * frameWidth * scale);
        const backgroundPositionY = -(row * frameHeight * scale);
        
        const totalWidth = columns * frameWidth * scale;
        const totalHeight = rows * frameHeight * scale;

        return {
            width: `${frameWidth * scale}px`,
            height: `${frameHeight * scale}px`,
            backgroundImage: `url(${spriteSheet})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
            backgroundSize: `${totalWidth}px ${totalHeight}px`,
            transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
            imageRendering: 'pixelated' as const,
            ...(debug && {
                outline: '1px solid red',
                backgroundColor: 'rgba(255,0,0,0.1)'
            })
        };
    };

    if (debug && spriteConfig) {
        const col = currentFrame % spriteConfig.columns;
        const row = Math.floor(currentFrame / spriteConfig.columns);
    }

    return (
        <div 
            className={`mascot-sprite sprite-${spriteSet} animation-${animation}`}
            style={getSpriteStyle()}
            onError={() => setSpriteError(true)}
            data-frame={currentFrame}
            data-animation={animation}
        />
    );
};

export default MascotSprite;