import { useRef, useEffect, useCallback } from 'react';

interface UseGameLoopOptions {
  onUpdate: (deltaTime: number) => void;
  onRender?: () => void;
  isPlaying?: boolean;
  maxFPS?: number;
  useFixedTimestep?: boolean;
  fixedDeltaTime?: number;
}

export const useGameLoop = ({
  onUpdate,
  onRender,
  isPlaying = true,
  maxFPS = 60,
  useFixedTimestep = true,
  fixedDeltaTime = 1000 / 60 
}: UseGameLoopOptions) => {
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  
  const loop = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    const clampedDeltaTime = Math.min(deltaTime, 1000);
    
    if (useFixedTimestep) {
      accumulatedTimeRef.current += clampedDeltaTime;
      
      while (accumulatedTimeRef.current >= fixedDeltaTime) {
        onUpdate(fixedDeltaTime);
        accumulatedTimeRef.current -= fixedDeltaTime;
      }
    } else {
      onUpdate(clampedDeltaTime);
    }
    
    if (onRender) {
      onRender();
    }
    
    if (isPlaying) {
      frameRef.current = requestAnimationFrame(loop);
    }
  }, [onUpdate, onRender, isPlaying, useFixedTimestep, fixedDeltaTime]);
  
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      accumulatedTimeRef.current = 0;
      frameRef.current = requestAnimationFrame(loop);
    }
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isPlaying, loop]);
};