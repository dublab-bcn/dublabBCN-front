// components/ThreeShaderOverlay.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeShaderOverlayProps {
  zIndex?: number;
  opacity?: number;
  effect?: 'gradient' | 'wave' | 'noise' | 'glow';
  mascotPosition?: { x: number; y: number };
  isDragging?: boolean;
}

const ThreeShaderOverlay: React.FC<ThreeShaderOverlayProps> = ({
  zIndex = 9998,
  opacity = 0.7,
  effect = 'gradient',
  mascotPosition,
  isDragging = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const idleTexture = loader.load('/assets/mascot/mascot.png');
    
    const mascot = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color:'#ffff', transparent: true, opacity: 0 })
    );
    mascot.position.set(1,1,1);
    scene.add(mascot);

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = 1.0 - (event.clientY / window.innerHeight);
      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.set(x, y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = (time: number) => {      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [effect, opacity, isDragging, mascotPosition]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex, 
        pointerEvents: 'none',
        background: 'transparent'
      }} 
    />
  );
};

export default ThreeShaderOverlay;