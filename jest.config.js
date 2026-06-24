// RN 0.85 moved the jest preset out of `react-native` into its own
// package. Prefer the standalone preset when available, fall back to
// the in-RN preset for older versions.
let preset = 'react-native';
try {
  require.resolve('@react-native/jest-preset');
  preset = '@react-native/jest-preset';
} catch {
  // older RN — keep the bundled preset
}

module.exports = {
  preset,
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:react-native|@react-native|@react-native-community|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|react-native-vector-icons|react-native-svg|react-native-linear-gradient|react-native-modal|react-native-bouncy-checkbox|react-native-calendars|react-native-parsed-text|react-native-swipe-gestures|react-native-animatable|react-native-config|react-native-splash-screen|rn-swipe-button|@react-native-async-storage|app-studio-widgets|appstudio-interface)/)',
  ],
  moduleNameMapper: {
    // Opt-out prefix that resolves to the REAL source file, bypassing
    // the workflow-context mock below. Must come first.
    '^@real/(.+)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
    '^app-studio-widgets$': '<rootDir>/__tests__/__mocks__/as-widgets.js',
    '^@/components/shared$': '<rootDir>/src/components/shared',
    '^@/components/shared/(.*)$':
      '<rootDir>/src/components/shared/$1',
    '^@/components$': '<rootDir>/__tests__/__mocks__/as-widgets.js',
    '^@/components/.*': '<rootDir>/__tests__/__mocks__/as-widgets.js',
    '^@/assets$': '<rootDir>/__tests__/__mocks__/assets.js',
    '^@/assets/.*': '<rootDir>/__tests__/__mocks__/assets.js',
    // JSONata helper throws on undefined inputs in tests where workflow
    // context returns no data; mock it to a no-op promise.
    '.*/utils/as\\.jsonata\\.functions$': '<rootDir>/__tests__/__mocks__/jsonata.js',
    // ThemeContext is the most-imported context across generated components.
    // Map it to a stub that exposes useThemeColors / ThemeContext.
    '.*/context/ThemeContext$': '<rootDir>/__tests__/__mocks__/theme-context.js',
    // Generated workflow context providers throw when used outside their
    // provider. Map both the directory index and individual context files
    // to a permissive stub that exposes any hook / context name as a noop.
    '^@/context$': '<rootDir>/__tests__/__mocks__/workflow-context.js',
    '^@/context/.*': '<rootDir>/__tests__/__mocks__/workflow-context.js',
    '.*/context/.*Context$': '<rootDir>/__tests__/__mocks__/workflow-context.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/translations/**',
    // Design tokens + SVG-as-component wrappers (mapped to mock at runtime).
    '!src/assets/**',
    '!src/env.ts',
    // Pure barrel re-exports.
    '!src/services/index.{ts,tsx}',
    '!src/context/index.{ts,tsx}',
    '!src/navigation/routes/index.{ts,tsx}',
    // Needs a real NavigationContainer — integration concern.
    '!src/navigation/AppNavigator.{ts,tsx}',
    // Gated out of emission when its i18n / error-code deps are missing.
    '!src/helpers/genericErrors.ts',
  ],
};
