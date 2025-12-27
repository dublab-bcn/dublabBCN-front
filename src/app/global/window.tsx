declare global {
  interface Window {
    Mixcloud?: {
      PlayerWidget: (element: HTMLIFrameElement) => {
        ready: Promise<void>;
        events: {
          ended: {
            on: (callback: () => void) => void;
          };
        };
      };
    };
  }
}

export {};