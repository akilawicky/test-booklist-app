import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { signUpWithEmailPasswordV101101Service } from '../services/SignUpWithEmailPasswordV101101Service';
import { keychainData, setKeychainData } from '@/utils/secureStorage';

interface SignUpWithEmailPasswordV101101Params {
  email: string;
  password: string;
}
type SignUpWithEmailPasswordV101101ContextValue = {
  signUpUserLoading: boolean;
  signUpWithEmailPasswordV101101: (
    params: SignUpWithEmailPasswordV101101Params,
  ) => Promise<unknown>;
  signUpWithEmailPasswordUser: unknown;
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

// Create the SignUpWithEmailPasswordV101101 context
const SignUpWithEmailPasswordV101101Context = createContext<
  SignUpWithEmailPasswordV101101ContextValue | undefined
>(undefined);

export const SignUpWithEmailPasswordV101101Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [signUpUserLoading, setSignUpUserLoading] = useState<boolean>(false);

  const signUpWithEmailPasswordV101101 = useCallback(
    async (params: SignUpWithEmailPasswordV101101Params) => {
      setSignUpUserLoading(true);
      try {
        // Call your service function here
        const result =
          await signUpWithEmailPasswordV101101Service.signUpWithEmailPasswordV101101(
            params,
          );

        await writeSecureCache(
          'signUpWithEmailPasswordUser',
          result.signUpWithEmailPasswordUser,
        );
        await writeSecureCache('session', result.session);
        await writeSecureCache('accessToken', result.accessToken);
        await writeSecureCache('refreshToken', result.refreshToken);
        await writeSecureCache('userId', result.userId);
        await writeSecureCache('email', result.email);

        // Handle state update

        setSignUpUserLoading(false);

        return result;
      } catch (error) {
        setSignUpUserLoading(false);
        if (__DEV__) {
          console.error(
            '[SignUpWithEmailPasswordV101101] Error:',
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
      signUpWithEmailPasswordV101101,
      signUpWithEmailPasswordUser: null,
      session: null,
      accessToken: null,
      refreshToken: null,
      userId: null,
      email: null,
    }),
    [signUpUserLoading, signUpWithEmailPasswordV101101],
  );

  return (
    <SignUpWithEmailPasswordV101101Context.Provider value={contextValue}>
      {children}
    </SignUpWithEmailPasswordV101101Context.Provider>
  );
};

export const useSignUpWithEmailPasswordV101101 = () => {
  const context = useContext(SignUpWithEmailPasswordV101101Context);
  if (context === undefined) {
    throw new Error(
      'useSignUpWithEmailPasswordV101101 must be used within an SignUpWithEmailPasswordV101101Provider',
    );
  }

  const signUpWithEmailPasswordUser = useSecureValue(
    'signUpWithEmailPasswordUser',
  );
  const session = useSecureValue('session');
  const accessToken = useSecureValue('accessToken');
  const refreshToken = useSecureValue('refreshToken');
  const userId = useSecureValue('userId');
  const email = useSecureValue('email');

  return {
    ...context,
    signUpWithEmailPasswordUser,
    session,
    accessToken,
    refreshToken,
    userId,
    email,
  };
};
