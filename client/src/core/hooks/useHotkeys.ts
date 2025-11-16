import { useEffect } from 'react';

type HotkeyOptions = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

type Hotkey = {
  key: string;
  options?: HotkeyOptions;
  handler: (event: KeyboardEvent) => void;
};

export function useHotkeys(hotkeys: Hotkey[]) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      for (const { key, options = {}, handler } of hotkeys) {
        if (options.ctrl && !event.ctrlKey) continue;
        if (options.shift && !event.shiftKey) continue;
        if (options.alt && !event.altKey) continue;
        if (options.meta && !event.metaKey) continue;

        if (event.key.toLowerCase() === key.toLowerCase()) {
          handler(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [hotkeys]);
}
