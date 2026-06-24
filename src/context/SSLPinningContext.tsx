// src/context/SSLPinningContext.tsx
// AUTO-GENERATED — Do not edit manually.
// Update SSL_PIN_CONFIG below with real public-key hashes before shipping.

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  initializeSslPinning,
  isSslPinningAvailable,
  addSslPinningErrorListener,
} from 'react-native-ssl-public-key-pinning';

// PIN CONFIGURATION
// PLACEHOLDER — replace the hash strings with real values extracted from
// your server before shipping.
const SSL_PIN_CONFIG: Parameters<typeof initializeSslPinning>[0] = {
  YOUR_API_HOST_HERE: {
    includeSubdomains: false,
    publicKeyHashes: [
      'PASTE_LEAF_CERT_HASH_HERE=',
      'PASTE_INTERMEDIATE_CA_HASH_HERE=',
    ],
  },
};

interface SSLPinningContextValue {
  isPinningReady: boolean;
  pinningError: Error | null;
}

const SSLPinningContext = createContext<SSLPinningContextValue>({
  isPinningReady: false,
  pinningError: null,
});

export function SSLPinningProvider({ children }: { children: ReactNode }) {
  const [isPinningReady, setIsPinningReady] = useState(false);
  const [pinningError, setPinningError] = useState<Error | null>(null);

  const initialize = useCallback(async () => {
    if (!isSslPinningAvailable()) {
      if (__DEV__) {
        console.warn(
          '[SSLPinning] Native module not available — skipping in dev.',
        );
        setIsPinningReady(true);
      } else {
        setPinningError(new Error('SSL pinning native module is unavailable.'));
      }
      return;
    }

    try {
      await initializeSslPinning(SSL_PIN_CONFIG);
      setIsPinningReady(true);
      if (__DEV__) {
        console.log('[SSLPinning] Active for:', Object.keys(SSL_PIN_CONFIG));
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (__DEV__) {
        console.error('[SSLPinning] Initialisation failed:', error);
      }
      setPinningError(error);
    }
  }, []);

  useEffect(() => {
    initialize();

    const subscription = addSslPinningErrorListener(({ serverHostname }) => {
      if (__DEV__) {
        console.error(
          `[SSLPinning] Pin mismatch for "${serverHostname}". Possible MITM attack or stale pin after certificate rotation.`,
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, [initialize]);

  const sslValue = useMemo(
    () => ({ isPinningReady, pinningError }),
    [isPinningReady, pinningError],
  );

  return (
    <SSLPinningContext.Provider value={sslValue}>
      {children}
    </SSLPinningContext.Provider>
  );
}

export function useSSLPinning(): SSLPinningContextValue {
  return useContext(SSLPinningContext);
}
