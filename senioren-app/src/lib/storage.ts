import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Kleiner Wrapper um AsyncStorage. Alle Fehler werden abgefangen:
 * Wenn der Speicher nicht verfügbar ist, funktioniert die App trotzdem
 * weiter – dann eben ohne gespeicherte Daten.
 */
export async function loadJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function saveJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Speichern nicht möglich – bewusst ignoriert.
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignorieren
  }
}
