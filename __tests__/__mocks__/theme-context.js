// Auto-generated. Stub ThemeContext so components calling useThemeColors,
// useThemeComponent etc. render without a real provider. Returns a deeply
// navigable Proxy so chains like themeComponents.dropdown.selectedText.color
// resolve to an empty string rather than throwing on undefined — RN
// treats `''` as "no explicit color". Tests don't depend on real theme
// values; those come from the app at runtime.
const React = require('react');

function makeTheme(depth) {
  if (depth >= 5) return '';
  return new Proxy(
    {},
    {
      get(_target, key) {
        if (key === '__esModule') return true;
        if (key === Symbol.toPrimitive) return () => '';
        if (key === Symbol.iterator) return function* () {};
        if (typeof key === 'symbol') return undefined;
        if (typeof key === 'string' && /^\d+$/.test(key)) return 0;
        if (key === 'length') return 0;
        return makeTheme(depth + 1);
      },
    }
  );
}

const theme = makeTheme(0);
const noopHook = () => theme;

// Proxy on the module: any imported hook name (useThemeXyz, useFoo, ...)
// resolves to a function returning the stub theme.
const exports_ = {
  __esModule: true,
  ThemeContext: React.createContext(theme),
  ThemeProvider: Object.assign((props) => props.children ?? null, { propTypes: { children: () => null } }),
  useThemeColors: noopHook,
  useTheme: noopHook,
  useThemeContext: noopHook,
  useThemeComponent: noopHook,
  useThemeFonts: noopHook,
  useThemeRadius: noopHook,
  useThemeSpace: noopHook,
  default: theme,
};

module.exports = new Proxy(exports_, {
  get(target, key) {
    if (key in target) return target[key];
    if (typeof key === 'string' && key.startsWith('use')) return noopHook;
    return undefined;
  },
});
