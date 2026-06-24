// Auto-generated. Permissive stub for any `*/context/<Workflow>Context`
// import — every property returns a noop function (`use<Anything>`) or a
// React Provider that just renders its children. Mocks the throwing
// "must be used within a Provider" pattern emitted by the generator.
const React = require('react');

// For destructured WORKFLOW TRIGGER FUNCTIONS (named like `fetchUserProfile1029`,
// `userLogin`, `submitForm123`, etc. — camelCase verbs) we return a plain
// jest.fn() so jest's matchers (`toHaveBeenCalled`, `toHaveBeenCalledWith`)
// see a clean mock function with the standard `.mock.calls` shape.
//
// For DATA OUTPUTS (named like `memberDetail`, `companyDetails`, `roles`, ...)
// we return a navigable Proxy on an empty array so chains like
// `memberDetail.roles[0].entityId` survive when the workflow hasn't run yet.
//
// We can't tell the two apart by name alone — heuristic: a key is treated as
// a workflow trigger if it starts with a verb-like prefix. Otherwise it's data.
const VERB_PREFIXES = [
  'fetch', 'get', 'load', 'list', 'search', 'query',
  'create', 'add', 'register', 'sign', 'submit', 'send', 'post', 'put',
  'update', 'edit', 'patch', 'save', 'sync',
  'delete', 'remove', 'cancel', 'reject',
  'login', 'logout', 'authenticate', 'authorize', 'verify', 'validate',
  'execute', 'trigger', 'process', 'handle', 'invoke', 'perform',
  'set', 'reset', 'clear', 'init', 'start', 'stop', 'pause', 'resume',
  'open', 'close', 'toggle', 'switch', 'select',
  'check', 'confirm', 'approve',
  'pay', 'transfer', 'withdraw', 'deposit',
];

function looksLikeTriggerFn(key) {
  if (typeof key !== 'string' || key.length === 0) return false;
  if (!/^[a-z]/.test(key)) return false; // must start lowercase
  // Heuristic A: ends with version digits, e.g. fetchUserProfile1029,
  // userAuthentication1029. Most generated workflow hooks expose their
  // trigger function under exactly this naming convention.
  if (/\d$/.test(key)) return true;
  // Heuristic B: starts with a known action verb. Covers workflow triggers
  // without a version suffix (e.g. legacy or hand-named workflows).
  return VERB_PREFIXES.some(prefix => key.startsWith(prefix));
}

// String/Number methods we forward to a coerced primitive so handler
// code like `token.split('|')[0]` or `id.toString()` doesn't throw on
// the navigable proxy. We coerce to `''` (via Symbol.toPrimitive) and
// invoke the prototype method on that — safe and deterministic.
const STRING_METHODS = new Set([
  'split', 'replace', 'replaceAll', 'slice', 'substring', 'substr',
  'toLowerCase', 'toUpperCase', 'trim', 'trimStart', 'trimEnd',
  'startsWith', 'endsWith', 'includes', 'indexOf', 'lastIndexOf',
  'padStart', 'padEnd', 'repeat', 'concat', 'charAt', 'charCodeAt',
  'codePointAt', 'normalize', 'match', 'matchAll', 'search', 'at',
  'toString', 'toLocaleString', 'valueOf',
]);

function makeNavigable(depth) {
  if (depth >= 6) return undefined;
  const base = [];
  const childCache = new Map();
  return new Proxy(base, {
    get(_target, key) {
      if (key === '__esModule') return true;
      if (key === Symbol.toPrimitive) return () => '';
      if (key === Symbol.iterator) return base[Symbol.iterator].bind(base);
      if (key === 'length') return 0;
      if (
        key === 'map' || key === 'filter' || key === 'forEach' ||
        key === 'reduce' || key === 'find' || key === 'some' ||
        key === 'every' || key === 'flat' || key === 'flatMap'
      ) {
        return base[key].bind(base);
      }
      // Forward common String methods to an empty-string baseline so
      // handler code that does `proxy.split('|')` / `.toLowerCase()` /
      // etc. doesn't crash. Returns the prototype method bound to ''.
      if (typeof key === 'string' && STRING_METHODS.has(key)) {
        const fn = String.prototype[key];
        if (typeof fn === 'function') return fn.bind('');
      }
      if (typeof key === 'symbol') return undefined;
      if (childCache.has(key)) return childCache.get(key);
      const child = makeNavigable(depth + 1);
      childCache.set(key, child);
      return child;
    },
  });
}

const fixedKeys = {
  data: undefined,
  loading: false,
  error: undefined,
  trigger: jest.fn(() => Promise.resolve(undefined)),
  execute: jest.fn(() => Promise.resolve(undefined)),
  reset: jest.fn(),
};
// Memoize the per-property navigable so every render sees the same
// jest.fn() for each workflow trigger function.
const hookResultCache = new Map();
const hookResult = new Proxy(fixedKeys, {
  get(target, key) {
    if (key in target) return target[key];
    if (typeof key !== 'string') return undefined;
    if (key.startsWith('set')) {
      if (!hookResultCache.has(key)) hookResultCache.set(key, jest.fn());
      return hookResultCache.get(key);
    }
    if (key.endsWith('Loading')) return false;
    if (key.endsWith('Error')) return undefined;
    if (!hookResultCache.has(key)) {
      // Provide BOTH function-callable behavior AND navigable data access:
      //   - jest.fn() instance — for `expect(...).toHaveBeenCalled()` and
      //     for `await fetchX(params)` calls inside handlers
      //   - extra-property fallback via a navigable Proxy — for chains like
      //     `memberDetail.roles[0].entityId` that traverse data shape
      // Implementation: create a jest.fn, then define non-standard property
      // access via a Proxy. Critically we forward jest's INTERNAL keys
      // (mock, _isMockFunction, mockClear, ...) directly so jest matchers
      // see a clean mock function.
      const fn = jest.fn(() => Promise.resolve(undefined));
      const dataProxy = makeNavigable(0);
      const hybrid = new Proxy(fn, {
        apply(_t, thisArg, args) {
          return fn.apply(thisArg, args);
        },
        get(_t, prop, receiver) {
          // Standard jest mock surface — forward straight to the fn so
          // toHaveBeenCalled() / mock.calls work normally.
          if (
            prop in fn ||
            prop === Symbol.toPrimitive ||
            prop === Symbol.iterator
          ) {
            const value = Reflect.get(fn, prop, receiver);
            // Bind methods so they keep `this === fn`
            return typeof value === 'function' ? value.bind(fn) : value;
          }
          // Everything else routes to the data Proxy so chains stay safe.
          return dataProxy[prop];
        },
      });
      hookResultCache.set(key, hybrid);
    }
    return hookResultCache.get(key);
  },
});
const noopHook = () => hookResult;

const Provider = (props) => props.children ?? null;
Provider.propTypes = { children: () => null };

// Helper for setup.ts beforeEach: iterate every dynamically-created
// workflow mock (jest.fn instances cached on first access) and clear
// their call history. Plain Object.keys(workflowMocks) can't reach
// these because they're synthesized by the Proxy get-trap and have no
// own-keys entry — so without this helper, `not.toHaveBeenCalled()`
// assertions leak state across tests.
const clearAllWorkflowMocks = () => {
  for (const fn of hookResultCache.values()) {
    if (fn && typeof fn.mockClear === 'function') fn.mockClear();
  }
};

module.exports = new Proxy(
  {
    __esModule: true,
    default: Provider,
    // Expose the singleton bag so setup.ts / tests can assert on
    // any workflow trigger function via `workflowMocks.fetchUserProfile1029`.
    __workflowMocks: hookResult,
    __clearAllWorkflowMocks: clearAllWorkflowMocks,
  },
  {
    get(target, key) {
      if (key in target) return target[key];
      if (typeof key !== 'string') return undefined;
      // IMPORTANT: check the `use` prefix BEFORE the `Context` suffix —
      // a hook like `useGlobalContext` ends with "Context" but is a
      // function, not a React context object. Returning createContext()
      // here would break `useGlobalContext()` with "not a function".
      if (key.startsWith('use')) return noopHook;
      if (key.endsWith('Provider')) return Provider;
      if (key.endsWith('Context')) return React.createContext({});
      return Provider;
    },
  }
);
