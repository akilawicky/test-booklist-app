import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { bookService } from '@/services/BookService';

type BookContextValue = {
  booksLoading: boolean;
  saveBookLoading: boolean;
  getBooks: () => Promise<{ items: unknown[] }>;
  createBook: (params: { body: Record<string, unknown> }) => Promise<unknown>;
  updateBook: (params: {
    id: string | number;
    body: Record<string, unknown>;
  }) => Promise<unknown>;
};

const BookContext = createContext<BookContextValue | undefined>(undefined);

export const BookProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [booksLoading, setBooksLoading] = useState(false);
  const [saveBookLoading, setSaveBookLoading] = useState(false);

  const getBooks = useCallback(async () => {
    setBooksLoading(true);
    try {
      return await bookService.getBooks();
    } finally {
      setBooksLoading(false);
    }
  }, []);

  const createBook = useCallback(
    async (params: { body: Record<string, unknown> }) => {
      setSaveBookLoading(true);
      try {
        return await bookService.createBook(params);
      } finally {
        setSaveBookLoading(false);
      }
    },
    [],
  );

  const updateBook = useCallback(
    async (params: { id: string | number; body: Record<string, unknown> }) => {
      setSaveBookLoading(true);
      try {
        return await bookService.updateBook(params);
      } finally {
        setSaveBookLoading(false);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({ booksLoading, saveBookLoading, getBooks, createBook, updateBook }),
    [booksLoading, saveBookLoading, getBooks, createBook, updateBook],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookWorkflows = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBookWorkflows must be used within BookProvider');
  }
  return context;
};
