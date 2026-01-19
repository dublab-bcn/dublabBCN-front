
export const SPRITE_CONFIGS = {
    pixel: {
        idle: { 
            frames: 4, 
            fps: 4, 
            width: 40, 
            height: 40, 
            columns: 2, 
            rows: 2 
        },
        dj: { 
            frames: 2, 
            fps: 2, 
            width: 40, 
            height: 40, 
            columns: 1, 
            rows: 2 
        },
    }
} as const;

export const SPRITE_SHEETS = {
  pixel: {
    idle: '/sprites/idle.png',
    dj: '/sprites/dj.png',
  }
} as const;

export type SpriteSet = keyof typeof SPRITE_CONFIGS;
export type SpriteAnimation = keyof typeof SPRITE_CONFIGS[SpriteSet];

export const getSpriteConfig = (spriteSet: SpriteSet, animation: SpriteAnimation) => {
    return SPRITE_CONFIGS[spriteSet][animation];
};

export const getSpriteSheet = (spriteSet: SpriteSet, animation: SpriteAnimation) => {
    return SPRITE_SHEETS[spriteSet][animation];
};