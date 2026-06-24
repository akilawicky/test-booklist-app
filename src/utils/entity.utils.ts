import { useAppContext } from '@/context';

/**
 * Returns a resolver function that looks up the current entity item
 * from AppContext by entity name.
 */
export const useEntityResolver = () => {
  const { appContext } = useAppContext();
  return (entityName: string): unknown =>
    (
      appContext.entities as Record<
        string,
        { selected?: unknown; data?: unknown; list?: unknown[] }
      >
    )[entityName]?.selected ??
    (
      appContext.entities as Record<
        string,
        { selected?: unknown; data?: unknown; list?: unknown[] }
      >
    )[entityName]?.data;
};
