import React, { useEffect } from 'react';
import AppNavigator from '@/navigation/AppNavigator';
import { LogBox, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/navigation/NavigationService';
import SplashScreen from 'react-native-splash-screen';
import env from '@/env';
import { createAuthorizedApiClient } from '@/services/api-clients/AuthorizedApiClient';
import { AuthorizationClient } from '@/services/api-clients';

import { AppProviders } from '@/providers/AppProviders';
import { ASColumn, ASText, ASLoadingIndicator } from '@/components';
import SecurityGate from '@/components/SecurityGate';
import { SSLPinningProvider, useSSLPinning } from '@/context/SSLPinningContext';

import { PatchAccount1106Service } from '@/services';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications
if (!__DEV__) {
  ['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
    (console as Record<string, unknown>)[method] = () => {};
  });
}

AuthorizationClient.instance()
  .configure({
    authBaseUrl: env.api.proxyUrl
      ? `${env.api.proxyUrl}https://ogahlbaynhvxpwxnjghj.supabase.co`
      : `https://ogahlbaynhvxpwxnjghj.supabase.co`,
  })
  .then(() => {
    const resolveUrl = (url: string) =>
      env.api.proxyUrl ? `${env.api.proxyUrl}${url}` : url;

    PatchAccount1106Service.instance().initClients({
      membershipServiceServiceClient: createAuthorizedApiClient(
        resolveUrl(
          `https://api-neobank-dev.101digital.io/membership-service/1.0.0/`,
        ),
      ),
    });
  });

function AppContent() {
  const { isPinningReady, pinningError } = useSSLPinning();

  // if (pinningError) {
  //   return (
  //     <ASColumn
  //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //     >
  //       <ASText
  //         style={{ textAlign: 'center', marginHorizontal: 24, color: '#c00' }}
  //       >
  //         A secure connection could not be configured. Please restart the app.
  //       </ASText>
  //     </ASColumn>
  //   );
  // }

  // if (!isPinningReady) {
  //   return (
  //     <ASColumn
  //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //     >
  //       <ASLoadingIndicator size='large' />
  //     </ASColumn>
  //   );
  // }

  return (
    <SecurityGate>
      <AppProviders>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AppProviders>
    </SecurityGate>
  );
}

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => SplashScreen?.hide(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SSLPinningProvider>
      <AppContent />
    </SSLPinningProvider>
  );
};

export default App;
