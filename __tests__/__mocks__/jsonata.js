// Auto-generated. Stub for the generated `as.jsonata.functions.ts` helper.
// Production runtime throws on missing/invalid data; in unit tests the
// workflow mock returns empty arrays, so we just resolve to undefined
// rather than blow up rendering.
module.exports = {
  __esModule: true,
  evaluateASJsonata: jest.fn(() => Promise.resolve(undefined)),
  registerASFunctions: jest.fn(),
  // Coerces a JSONata result into a string. Mirrors the real helper so screen
  // call sites like `asTemplateString(await evaluateASJsonata(...))` survive
  // when the mocked evaluator resolves to undefined.
  asTemplateString: jest.fn((value) => {
    if (typeof value === 'string') return value;
    if (
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    ) {
      return `${value}`; // NOSONAR (S6551) — value is narrowed to number|boolean|bigint
    }
    if (value === null || value === undefined) return '';
    return JSON.stringify(value);
  }),
  // Pass-through stub — real impl drops phantom null/undefined items from an
  // array result; tests never assert on the cleaned shape.
  filterPhantomItems: jest.fn((result) => result),
};
