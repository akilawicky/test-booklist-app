import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { signInWithEmailPasswordV101101Service } from '../services/SignInWithEmailPasswordV101101Service';
import { keychainData, setKeychainData } from '@/utils/secureStorage';

interface SignInWithEmailPasswordV101101Params {
  email: string;
  password: string;
}
type SignInWithEmailPasswordV101101ContextValue = {
  signInUserLoading: boolean;
  signInWithEmailPasswordV101101: (
    params: SignInWithEmailPasswordV101101Params,
  ) => Promise<unknown>;
  user: unknown;
  session: unknown;
  accessToken: unknown;
  refreshToken: unknown;
  userId: unknown;
  email: unknown;
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

// Create the SignInWithEmailPasswordV101101 context
const SignInWithEmailPasswordV101101Context = createContext<
  SignInWithEmailPasswordV101101ContextValue | undefined
>(undefined);

export const SignInWithEmailPasswordV101101Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [signInUserLoading, setSignInUserLoading] = useState<boolean>(false);

  const signInWithEmailPasswordV101101 = useCallback(
    async (params: SignInWithEmailPasswordV101101Params) => {
      setSignInUserLoading(true);
      try {
        // Call your service function here
        const result =
          await signInWithEmailPasswordV101101Service.signInWithEmailPasswordV101101(
            params,
          );

        await writeSecureCache('user', result.user);
        await writeSecureCache('session', result.session);
        await writeSecureCache('accessToken', result.accessToken);
        await writeSecureCache('refreshToken', result.refreshToken);
        await writeSecureCache('userId', result.userId);
        await writeSecureCache('email', result.email);

        // Handle state update

        setSignInUserLoading(false);

        return result;
      } catch (error) {
        setSignInUserLoading(false);
        if (__DEV__) {
          console.error(
            '[SignInWithEmailPasswordV101101] Error:',
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
      signInWithEmailPasswordV101101,
      user: null,
      session: null,
      accessToken: null,
      refreshToken: null,
      userId: null,
      email: null,
    }),
    [signInUserLoading, signInWithEmailPasswordV101101],
  );

  return (
    <SignInWithEmailPasswordV101101Context.Provider value={contextValue}>
      {children}
    </SignInWithEmailPasswordV101101Context.Provider>
  );
};

export const useSignInWithEmailPasswordV101101 = () => {
  const context = useContext(SignInWithEmailPasswordV101101Context);
  if (context === undefined) {
    throw new Error(
      'useSignInWithEmailPasswordV101101 must be used within an SignInWithEmailPasswordV101101Provider',
    );
  }

  const user = useSecureValue('user');
  const session = useSecureValue('session');
  const accessToken = useSecureValue('accessToken');
  const refreshToken = useSecureValue('refreshToken');
  const userId = useSecureValue('userId');
  const email = useSecureValue('email');

  return {
    ...context,
    user,
    session,
    accessToken,
    refreshToken,
    userId,
    email,
  };
};
