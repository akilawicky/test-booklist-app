import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { signInWithEmailPassword100Service } from '../services/SignInWithEmailPassword100Service';
import { keychainData, setKeychainData } from '@/utils/secureStorage';

interface SignInWithEmailPassword100Params {
  email: string;
  password: string;
}
type SignInWithEmailPassword100ContextValue = {
  signInUserLoading: boolean;
  signInWithEmailPassword100: (
    params: SignInWithEmailPassword100Params,
  ) => Promise<unknown>;
  accessToken: unknown;
  refreshToken: unknown;
  userId: unknown;
  email: unknown;
  phone: unknown;
  user: unknown;
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

// Create the SignInWithEmailPassword100 context
const SignInWithEmailPassword100Context = createContext<
  SignInWithEmailPassword100ContextValue | undefined
>(undefined);

export const SignInWithEmailPassword100Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [signInUserLoading, setSignInUserLoading] = useState<boolean>(false);

  const signInWithEmailPassword100 = useCallback(
    async (params: SignInWithEmailPassword100Params) => {
      setSignInUserLoading(true);
      try {
        // Call your service function here
        const result =
          await signInWithEmailPassword100Service.signInWithEmailPassword100(
            params,
          );

        await writeSecureCache('accessToken', result.accessToken);
        await writeSecureCache('refreshToken', result.refreshToken);
        await writeSecureCache('userId', result.userId);
        await writeSecureCache('email', result.email);
        await writeSecureCache('phone', result.phone);
        await writeSecureCache('user', result.user);

        // Handle state update

        setSignInUserLoading(false);

        return result;
      } catch (error) {
        setSignInUserLoading(false);
        if (__DEV__) {
          console.error(
            '[SignInWithEmailPassword100] Error:',
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
      signInUserLoading,
      signInWithEmailPassword100,
      accessToken: null,
      refreshToken: null,
      userId: null,
      email: null,
      phone: null,
      user: null,
    }),
    [signInUserLoading, signInWithEmailPassword100],
  );

  return (
    <SignInWithEmailPassword100Context.Provider value={contextValue}>
      {children}
    </SignInWithEmailPassword100Context.Provider>
  );
};

export const useSignInWithEmailPassword100 = () => {
  const context = useContext(SignInWithEmailPassword100Context);
  if (context === undefined) {
    throw new Error(
      'useSignInWithEmailPassword100 must be used within an SignInWithEmailPassword100Provider',
    );
  }

  const accessToken = useSecureValue('accessToken');
  const refreshToken = useSecureValue('refreshToken');
  const userId = useSecureValue('userId');
  const email = useSecureValue('email');
  const phone = useSecureValue('phone');
  const user = useSecureValue('user');

  return {
    ...context,
    accessToken,
    refreshToken,
    userId,
    email,
    phone,
    user,
  };
};
