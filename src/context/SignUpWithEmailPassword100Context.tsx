import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { signUpWithEmailPassword100Service } from '../services/SignUpWithEmailPassword100Service';
import { keychainData, setKeychainData } from '@/utils/secureStorage';

interface SignUpWithEmailPassword100Params {
  email: string;
  password: string;
}
type SignUpWithEmailPassword100ContextValue = {
  signUpUserLoading: boolean;
  signUpWithEmailPassword100: (
    params: SignUpWithEmailPassword100Params,
  ) => Promise<unknown>;
  signUpWithEmailPasswordUser: unknown;
};

// --- Secure cache: plain JS Map, never in React state ---
const secureCache = new Map<string, string | null>();
const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notifyListeners = () => {
  listeners.forEach((l) => l());
};

const refreshSecureCache = async (key: string) => {
  const value = await keychainData(key);
  secureCache.set(key, value);
  notifyListeners();
};

const writeSecureCache = async (key: string, value: unknown) => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  const didPersist = await setKeychainData(key, stringValue);
  if (!didPersist) {
    throw new Error(`Failed to persist secure cache value for key "${key}"`);
  }
  secureCache.set(key, stringValue);
  notifyListeners();
};

const useSecureValue = (key: string): string | null => {
  if (!secureCache.has(key)) {
    secureCache.set(key, null);
    refreshSecureCache(key);
  }
  return useSyncExternalStore(subscribe, () => secureCache.get(key) ?? null);
};

// Create the SignUpWithEmailPassword100 context
const SignUpWithEmailPassword100Context = createContext<
  SignUpWithEmailPassword100ContextValue | undefined
>(undefined);

export const SignUpWithEmailPassword100Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [signUpUserLoading, setSignUpUserLoading] = useState<boolean>(false);

  const signUpWithEmailPassword100 = useCallback(
    async (params: SignUpWithEmailPassword100Params) => {
      setSignUpUserLoading(true);
      try {
        // Call your service function here
        const result =
          await signUpWithEmailPassword100Service.signUpWithEmailPassword100(
            params,
          );

        await writeSecureCache(
          'signUpWithEmailPasswordUser',
          result.signUpWithEmailPasswordUser,
        );

        // Handle state update

        setSignUpUserLoading(false);

        return result;
      } catch (error) {
        setSignUpUserLoading(false);
        if (__DEV__) {
          console.error(
            '[SignUpWithEmailPassword100] Error:',
            (error as Error).message,
          );
        }
        throw error;
      }
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      signUpUserLoading,
      signUpWithEmailPassword100,
      signUpWithEmailPasswordUser: null,
    }),
    [signUpUserLoading, signUpWithEmailPassword100],
  );

  return (
    <SignUpWithEmailPassword100Context.Provider value={contextValue}>
      {children}
    </SignUpWithEmailPassword100Context.Provider>
  );
};

export const useSignUpWithEmailPassword100 = () => {
  const context = useContext(SignUpWithEmailPassword100Context);
  if (context === undefined) {
    throw new Error(
      'useSignUpWithEmailPassword100 must be used within an SignUpWithEmailPassword100Provider',
    );
  }

  const signUpWithEmailPasswordUser = useSecureValue(
    'signUpWithEmailPasswordUser',
  );

  return {
    ...context,
    signUpWithEmailPasswordUser,
  };
};
