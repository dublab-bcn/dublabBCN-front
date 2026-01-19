import React, { useRef, useEffect, useState } from 'react';
import { useMascot } from '@/app/contexts/MascotContext';
import useAirtimeApi from '@/app/lib/hooks/useAirtimeApi';
import { SPRITE_CONFIGS, type SpriteSet } from './SpriteSheet';
import './MascotControls.css';

const MascotControls: React.FC = () => {
  const { config, updateConfig, toggleMascot, currentAnimation, setAnimation } = useMascot();
    const { getLiveRadioData } = useAirtimeApi();
    const [isCheckingRadio, setIsCheckingRadio] = useState(false);
  const [radioStatus, setRadioStatus] = useState<'unknown' | 'live' | 'offline'>('unknown');
  
  if (!config.showControls) return null;

  const spriteSets = Object.keys(SPRITE_CONFIGS) as SpriteSet[];
  const speedRangeRef = useRef<HTMLInputElement>(null);
  const scaleRangeRef = useRef<HTMLInputElement>(null);

  const handleRadioCheck = async () => {
    setIsCheckingRadio(true);
    try {
      const radioData = await getLiveRadioData();
      setRadioStatus('live');
      setAnimation('dj');
      console.log('Radio is live:', radioData);
    } catch (error) {
      setRadioStatus('offline');
      setAnimation('idle');
      console.log('Radio is offline');
    } finally {
      setIsCheckingRadio(false);
    }
  };

  const handleDjToggle = async () => {
    if (currentAnimation === 'idle') {
      await handleRadioCheck();
    } else {
      setAnimation('dj');
      setRadioStatus('unknown');
    }
  };

    const getStatusIndicator = () => {
    switch(radioStatus) {
      case 'live': return '🟢';
      case 'offline': return '🔴';
      case 'unknown': return '⚪';
      default: return '⚪';
    }
  };

  useEffect(() => {
    const updateRangeProgress = (input: HTMLInputElement) => {
      const value = parseFloat(input.value);
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const percent = ((value - min) / (max - min)) * 100;
      
      input.style.setProperty('--range-progress', `${percent}%`);
      input.style.setProperty('--value', `${value}`);
      input.style.setProperty('--min', `${min}`);
      input.style.setProperty('--max', `${max}`);
    };

    if (speedRangeRef.current) {
      updateRangeProgress(speedRangeRef.current);
      speedRangeRef.current.addEventListener('input', () => {
        updateRangeProgress(speedRangeRef.current!);
      });
    }

    if (scaleRangeRef.current) {
      updateRangeProgress(scaleRangeRef.current);
      scaleRangeRef.current.addEventListener('input', () => {
        updateRangeProgress(scaleRangeRef.current!);
      });
    }

    return () => {
      if (speedRangeRef.current) {
        speedRangeRef.current.removeEventListener('input', () => {});
      }
      if (scaleRangeRef.current) {
        scaleRangeRef.current.removeEventListener('input', () => {});
      }
    };
  }, []);

  return (
    <div className="mascot-controls">
      <div className="control-group">
        <h4>🎭 Mascot Controls</h4>
        
        <button 
          onClick={toggleMascot}
          className="mascot-toggle-btn"
          style={{
            background: config.enabled ? 'linear-gradient(135deg, #ff6b6b, #ff8e8e)' : 'linear-gradient(135deg, #666, #888)'
          }}
        >
          {config.enabled ? (
            <>
              <span>❌</span> Hide Mascot
            </>
          ) : (
            <>
              <span>👤</span> Show Mascot
            </>
          )}
        </button>
      </div>
      
      <div className="control-group">
        <label htmlFor="sprite-set">
          Sprite Set:
        </label>
        <select 
          id="sprite-set"
          value={config.spriteSet}
          onChange={(e) => updateConfig({ spriteSet: e.target.value as SpriteSet })}
        >
          {spriteSets.map(set => (
            <option key={set} value={set}>
              {set.charAt(0).toUpperCase() + set.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="speed-range">
          Speed: <span className="range-value">{config.speed}</span>
        </label>
        <input
          ref={speedRangeRef}
          id="speed-range"
          type="range"
          min="1"
          max="10"
          value={config.speed}
          onChange={(e) => updateConfig({ speed: parseInt(e.target.value) })}
        />
      </div>
      
      <div className="control-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={config.autoRoam}
            onChange={(e) => updateConfig({ autoRoam: e.target.checked })}
          />
          Auto Roam
        </label>
      </div>

      <div className="control-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={currentAnimation !== 'idle'}
            onChange={handleDjToggle}
            disabled={isCheckingRadio}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>DJ Mode</span>
            {isCheckingRadio && <span className="spinner">⏳</span>}
            {!isCheckingRadio && <span>{getStatusIndicator()}</span>}
          </div>
        </label>
        {radioStatus !== 'unknown' && !isCheckingRadio && (
          <div style={{ 
            fontSize: '11px', 
            color: radioStatus === 'live' ? '#4CAF50' : '#FF6B6B',
            marginTop: '4px'
          }}>
            Radio is {radioStatus === 'live' ? 'Live' : 'Offline'}
          </div>
        )}
      </div>
      
      <div className="control-group">
        <label htmlFor="scale-range">
          Scale: <span className="range-value">{config.scale}x</span>
        </label>
        <input
          ref={scaleRangeRef}
          id="scale-range"
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={config.scale}
          onChange={(e) => updateConfig({ scale: parseFloat(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default MascotControls;