import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMascot } from '@/app/contexts/MascotContext';
import { useGameLoop } from '@/app/lib/hooks/useGameLoop';
import MascotSprite from './MascotSprite';
import './Mascot.css';

interface MascotProps {
  onInteraction?: (data: any) => void;
  debug?: boolean;
}

const Mascot: React.FC<MascotProps> = ({ onInteraction, debug = false }) => {
  const { config, currentAnimation, setAnimation, addInteraction } = useMascot();
  const [position, setPosition] = useState(config.startPosition);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMoving, setIsMoving] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const mascotRef = useRef<HTMLDivElement>(null);

  const movementStateRef = useRef({
    speed: config.speed,
    position: { ...config.startPosition },
    target: null as { x: number; y: number } | null,
    isMoving: false,
    direction: 'right' as 'left' | 'right'
  });

  useEffect(() => {
    movementStateRef.current.speed = config.speed;
  }, [config.speed]);

    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!config.enabled) return;
        
        e.preventDefault();
        setIsDragging(true);
        setAnimation('dj');
        
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        
        const spriteWidth = 40 * config.scale;
        const spriteHeight = 40 * config.scale;
        
        const offsetX = clientX - position.x - spriteWidth / 2;
        const offsetY = clientY - position.y - spriteHeight / 2;
        setDragOffset({ x: offsetX, y: offsetY });
        
        setIsMoving(false);
        movementStateRef.current.isMoving = false;
        setTargetPosition(null);
    }, [config.enabled, config.scale, position, setAnimation]);


    const handleDrag = useCallback((clientX: number, clientY: number) => {
        if (!isDragging) return;
        
        const spriteWidth = 40 * config.scale;
        const spriteHeight = 40 * config.scale;
        
        const newX = clientX - dragOffset.x - spriteWidth / 2;
        const newY = clientY - dragOffset.y - spriteHeight / 2;
        
        if (newX !== position.x) {
            setDirection(newX < position.x ? 'left' : 'right');
            movementStateRef.current.direction = newX < position.x ? 'left' : 'right';
        }
        
        const newPos = { x: newX, y: newY };
        setPosition(newPos);
        movementStateRef.current.position = newPos;
        
        console.log('Dragging to:', newX, newY);
    }, [isDragging, dragOffset, config.scale, position.x, position.y]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;
        
        setIsDragging(false);
        setAnimation('idle');
    }, [isDragging, position, setAnimation]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        handleDrag(e.clientX, e.clientY);
    }, [handleDrag]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (e.touches.length > 0) {
            e.preventDefault();
            handleDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, [handleDrag]);

    useEffect(() => {
        if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

    const handleClick = useCallback((e: MouseEvent) => {
    if (!config.enabled) return;
    
    const target = e.target as HTMLElement;
    if (target.closest('.mascot-container') || target.closest('.mascot-controls')) {
      return;
    }
    
    const spriteWidth = 40 * config.scale;
    const spriteHeight = 40 * config.scale;
    
    const newTarget = {
        x: e.clientX - spriteWidth / 2,
        y: e.clientY - spriteHeight / 2
    };
    
    setTargetPosition(newTarget);
    setIsMoving(true);
    setAnimation('idle');
    
    movementStateRef.current.target = newTarget;
    movementStateRef.current.isMoving = true;
    
    const newDirection = newTarget.x < position.x ? 'left' : 'right';
    setDirection(newDirection);
    movementStateRef.current.direction = newDirection;
    
  }, [config.enabled, config.scale, position.x, setAnimation]);

  useGameLoop({
    onUpdate: (deltaTime: number) => {
      if (isDragging || !movementStateRef.current.isMoving || !movementStateRef.current.target) {
        return;
      }
      
      const { position: currentPos, target, speed } = movementStateRef.current;
      
      const pixelsPerSecond = speed * 50;
      const moveDistance = (pixelsPerSecond * deltaTime) / 1000;
      
      const dx = target.x - currentPos.x;
      const dy = target.y - currentPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 2) {
        movementStateRef.current.isMoving = false;
        movementStateRef.current.position = { ...target };
        
        requestAnimationFrame(() => {
          setIsMoving(false);
          setPosition(target);
          setAnimation('idle');
        });
        
        return;
      }
      
      const moveX = (dx / distance) * Math.min(moveDistance, distance);
      const moveY = (dy / distance) * Math.min(moveDistance, distance);
      
      const newPos = {
        x: currentPos.x + moveX,
        y: currentPos.y + moveY
      };
      
      if (Math.abs(moveX) > 0.1) {
        const newDirection = moveX < 0 ? 'left' : 'right';
        if (newDirection !== movementStateRef.current.direction) {
          movementStateRef.current.direction = newDirection;
          requestAnimationFrame(() => {
            setDirection(newDirection);
          });
        }
      }
      
      movementStateRef.current.position = newPos;
      
      requestAnimationFrame(() => {
        setPosition(newPos);
      });
      
      if (debug && Math.random() < 0.01) {
      }
    },
    onRender: () => {
    },
    isPlaying: config.enabled && !isDragging,
    maxFPS: 60,
    useFixedTimestep: true
  });

  useEffect(() => {
    if (!config.autoRoam || isMoving || isDragging) return;
    
    const roamInterval = setInterval(() => {
      if (Math.random() > 0.1) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const spriteWidth = 40 * config.scale;
        const spriteHeight = 40 * config.scale;
        
        const newTarget = {
          x: Math.random() * (viewportWidth - spriteWidth),
          y: Math.random() * (viewportHeight - spriteHeight)
        };
        
        setTargetPosition(newTarget);
        setIsMoving(true);
        movementStateRef.current.target = newTarget;
        movementStateRef.current.isMoving = true;
        
        setAnimation('idle');
        
        const newDirection = newTarget.x < position.x ? 'left' : 'right';
        setDirection(newDirection);
        movementStateRef.current.direction = newDirection;
        
      }
    }, 5000);
    
    return () => clearInterval(roamInterval);
  }, [config.autoRoam, isMoving, config.scale, position.x, setAnimation]);

  useEffect(() => {
    if (!config.enabled || isDragging) return;
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [config.enabled, handleClick, isDragging]);

  useEffect(() => {
    movementStateRef.current.position = { ...position };
  }, [position]);

  if (!config.enabled) return null;

  return (
    <>
      <div 
        ref={mascotRef}
        className="mascot-container"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          willChange: isMoving && !isDragging ? 'left, top' : 'auto',
          transition: isMoving && !isDragging ? 'left 0.1s linear, top 0.1s linear' : 'none',
          touchAction: 'none'
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div 
          className="mascot-shadow"
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${30 * config.scale}px`,
            height: `${10 * config.scale}px`,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            zIndex: -1
          }}
        />
        
        <MascotSprite
          spriteSet={config.spriteSet}
          animation={currentAnimation}
          direction={direction}
          scale={config.scale}
          debug={debug}
        />
        
        {debug && (
          <div style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '2px 6px',
            fontSize: '10px',
            borderRadius: '3px',
            whiteSpace: 'nowrap'
          }}>
            {Math.round(position.x)}, {Math.round(position.y)} {isMoving ? '→' : '●'}
          </div>
        )}
      </div>
      
      {debug && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          fontSize: '12px',
          borderRadius: '5px',
          zIndex: 10000
        }}>
          <div><strong>Mascot Debug</strong></div>
          <div>Position: {Math.round(position.x)}, {Math.round(position.y)}</div>
          <div>Target: {targetPosition ? `${Math.round(targetPosition.x)}, ${Math.round(targetPosition.y)}` : 'None'}</div>
          <div>Animation: {currentAnimation}</div>
          <div>Direction: {direction}</div>
          <div>Moving: {isMoving ? 'Yes' : 'No'}</div>
          <div>Speed: {config.speed}</div>
          <div>Scale: {config.scale}x</div>
        </div>
      )}
    </>
  );
};

export default Mascot;