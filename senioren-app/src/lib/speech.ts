import { useCallback, useEffect, useState } from 'react';
import * as Speech from 'expo-speech';

/**
 * Vorlesefunktion. Liest deutschen Text vor und stoppt automatisch,
 * wenn die Seite verlassen wird.
 */
export function useVorlesen() {
  const [spricht, setSpricht] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setSpricht(false);
  }, []);

  const sprich = useCallback(
    (text: string) => {
      const sauber = text.trim();
      if (!sauber) return;
      Speech.stop();
      setSpricht(true);
      Speech.speak(sauber, {
        language: 'de-DE',
        rate: 0.92,
        onDone: () => setSpricht(false),
        onStopped: () => setSpricht(false),
        onError: () => setSpricht(false),
      });
    },
    []
  );

  const umschalten = useCallback(
    (text: string) => {
      if (spricht) {
        stop();
      } else {
        sprich(text);
      }
    },
    [spricht, sprich, stop]
  );

  return { spricht, sprich, stop, umschalten };
}
