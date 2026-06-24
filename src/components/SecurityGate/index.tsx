import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JailMonkey from 'jail-monkey';
import DeviceInfo from 'react-native-device-info';
import { CaptureProtection } from 'react-native-capture-protection';

interface SecurityGateProps {
  children: React.ReactNode;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ children }) => {
  const isCompromised = React.useMemo(
    () => !__DEV__ && JailMonkey.isJailBroken(),
    [],
  );

  const isEmulator = React.useMemo(
    () => !__DEV__ && DeviceInfo.isEmulatorSync(),
    [],
  );

  React.useEffect(() => {
    if (!__DEV__) {
      CaptureProtection.prevent();
    }
    return () => {
      if (!__DEV__) {
        CaptureProtection.allow();
      }
    };
  }, []);

  if (isCompromised || isEmulator) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Security Alert</Text>
        <Text style={styles.message}>
          This app can't run on rooted, jailbroken, or emulated devices. Please
          use a secure device.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 12,
    fontFamily: 'Poppins',
  },
  message: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
});

export default SecurityGate;
