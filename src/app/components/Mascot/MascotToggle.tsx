import React from 'react';
import { useMascot } from '@/app/contexts/MascotContext';

const MascotToggle: React.FC = () => {
  const { config, toggleMascot } = useMascot();
  
  return (
    <button
      className="mascot-toggle"
      onClick={toggleMascot}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        zIndex: 10000,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: config.enabled ? '#4a90e2' : '#666',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        transition: 'background-color 0.3s ease'
      }}
      title={config.enabled ? "Hide Mascot" : "Show Mascot"}
      aria-label={config.enabled ? "Hide mascot character" : "Show mascot character"}
    >
      {config.enabled ? '👤' : '👻'}
    </button>
  );
};

export default MascotToggle;