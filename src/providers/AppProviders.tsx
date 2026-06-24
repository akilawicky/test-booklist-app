import React from 'react';
import themeData from '@/assets/themeData';
import {
  GlobalContextProvider,
  AppContextProvider,
} from '@/context/GlobalContext';
import { FontContextProvider } from '@/context/FontContext';
import {
  ThemeProvider,
  PatchAccount1106Provider,
  SignUpWithEmailPasswordV101101Provider,
  SignUpWithEmailPassword100Provider,
  SignInWithEmailPasswordV101101Provider,
  SignInWithEmailPassword100Provider,
} from '@/context';

type ProviderProps = {
  children: React.ReactNode;
};

// Define providers array for easy management
const providers: Array<React.ComponentType<ProviderProps>> = [
  ({ children }) => <ThemeProvider theme={themeData}>{children}</ThemeProvider>,
  GlobalContextProvider,
  AppContextProvider,
  FontContextProvider,
  PatchAccount1106Provider,
  SignUpWithEmailPasswordV101101Provider,
  SignUpWithEmailPassword100Provider,
  SignInWithEmailPasswordV101101Provider,
  SignInWithEmailPassword100Provider,
];

/**
 * AppProviders component that composes all context providers
 * Uses reduceRight to avoid deep JSX nesting issues with Metro bundler
 */
export const AppProviders: React.FC<ProviderProps> = ({ children }) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children as React.ReactElement,
  );
};
