import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type GlobalData = Record<string, unknown>;

// Define the GlobalContextValue type
type GlobalContextValue = {
  setGlobalData: (data: GlobalData) => void;
  clearGlobalData: () => void;
  removeGlobalDataByKey: (key: string) => void;
  globalData: GlobalData;
};

// Initialize the GlobalContext with undefined
const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

// Default global data from app variables
const defaultGlobalData = {
  books: [
    {
      tags: 'software,craft,engineering',
      title: 'The Pragmatic Programmer',
      format: 'Paperback',
      isbn10: '0135957052',
      isbn13: '9780135957059',
      edition: '20th Anniversary Edition',
      authorId: 'a1',
      language: 'English',
      pageCount: 352,
      publisher: 'Addison-Wesley',
      authorName: 'Andrew Hunt',
      readStatus: 'Read',
      reviewNotes: 'Practical advice and timeless principles. Great reread.',
      acquiredDate: '2023-02-01',
      readerRating: 5,
      coverImageUrl:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
      publishedDate: '2019-09-13',
      readStartDate: '2023-02-05',
      readFinishDate: '2023-02-20',
    },
    {
      tags: 'productivity,self-help',
      title: 'Atomic Habits',
      format: 'Hardcover',
      isbn10: '0735211299',
      isbn13: '9780735211292',
      edition: '1st Edition',
      authorId: 'a2',
      language: 'English',
      pageCount: 320,
      publisher: 'Avery',
      authorName: 'James Clear',
      readStatus: 'Read',
      reviewNotes: 'Simple, actionable framework for habit building.',
      acquiredDate: '2022-11-10',
      readerRating: 4,
      coverImageUrl:
        'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
      publishedDate: '2018-10-16',
      readStartDate: '2022-11-12',
      readFinishDate: '2022-11-26',
    },
    {
      tags: 'science fiction,classics',
      title: 'Dune',
      format: 'Hardcover',
      isbn10: '0441013597',
      isbn13: '9780441013593',
      edition: 'Deluxe Edition',
      authorId: 'a3',
      language: 'English',
      pageCount: 688,
      publisher: 'Ace',
      authorName: 'Frank Herbert',
      readStatus: 'Not Read',
      reviewNotes: '',
      acquiredDate: '2024-01-18',
      readerRating: 0,
      coverImageUrl:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
      publishedDate: '2016-10-25',
      readStartDate: '',
      readFinishDate: '',
    },
    {
      tags: 'history,anthropology',
      title: 'Sapiens: A Brief History of Humankind',
      format: 'Paperback',
      isbn10: '0062316095',
      isbn13: '9780062316097',
      edition: '1st US Edition',
      authorId: 'a4',
      language: 'English',
      pageCount: 464,
      publisher: 'Harper',
      authorName: 'Yuval Noah Harari',
      readStatus: 'Read',
      reviewNotes: 'Thought-provoking big-picture history.',
      acquiredDate: '2021-06-02',
      readerRating: 5,
      coverImageUrl:
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
      publishedDate: '2015-02-10',
      readStartDate: '2021-06-10',
      readFinishDate: '2021-07-01',
    },
    {
      tags: 'software,cleanliness',
      title: 'Clean Code',
      format: 'Paperback',
      isbn10: '0132350882',
      isbn13: '9780132350884',
      edition: '1st Edition',
      authorId: 'a5',
      language: 'English',
      pageCount: 464,
      publisher: 'Prentice Hall',
      authorName: 'Robert C. Martin',
      readStatus: 'Read',
      reviewNotes:
        'Useful guidelines; some parts feel opinionated but valuable.',
      acquiredDate: '2020-09-15',
      readerRating: 4,
      coverImageUrl:
        'https://images.unsplash.com/photo-1524578271613-d550eacf6090',
      publishedDate: '2008-08-11',
      readStartDate: '2020-09-20',
      readFinishDate: '2020-10-15',
    },
  ],

  authors: [
    {
      notes: 'Often writes about software craftsmanship.',
      country: 'United States',
      penName: '',
      website: 'https://pragprog.com/',
      fullName: 'Andrew Hunt',
      lastName: 'Hunt',
      biography:
        'Co-author of The Pragmatic Programmer and publisher at The Pragmatic Bookshelf.',
      birthDate: '1964-01-01',
      deathDate: '',
      firstName: 'Andrew',
      userId: '36637c00-7b90-47c3-9870-dce1652b5e17'
    },
    {
      notes: 'Newsletter: 3-2-1.',
      country: 'United States',
      penName: '',
      website: 'https://jamesclear.com/',
      fullName: 'James Clear',
      lastName: 'Clear',
      biography:
        'Author focused on habits, decision making, and continuous improvement.',
      birthDate: '1986-01-22',
      deathDate: '',
      firstName: 'James',
      userId: 'b5133c0c-0218-4abe-b707-99408e47853e'
    },
    {
      notes: 'Pulitzer Prize nominee; widely influential.',
      country: 'United States',
      penName: '',
      website: 'https://dunenovels.com/',
      fullName: 'Frank Herbert',
      lastName: 'Herbert',
      biography:
        'American science-fiction author best known for the Dune saga.',
      birthDate: '1920-10-08',
      deathDate: '1986-02-11',
      firstName: 'Frank',
      userId: 'c64c6421-701c-4e93-9307-a2f2cb223a8b'
    },
    {
      notes: 'Writes on history, technology, and society.',
      country: 'Israel',
      penName: '',
      website: 'https://www.ynharari.com/',
      fullName: 'Yuval Noah Harari',
      lastName: 'Harari',
      biography:
        'Historian and author of Sapiens, Homo Deus, and 21 Lessons for the 21st Century.',
      birthDate: '1976-02-24',
      deathDate: '',
      firstName: 'Yuval',
      userId: 'f37aa69e-3dfd-48f7-ab1f-9c393b98286b'
    },
    {
      notes: 'Talks and courses on craftsmanship.',
      country: 'United States',
      penName: 'Uncle Bob',
      website: 'https://cleancoder.com/',
      fullName: 'Robert C. Martin',
      lastName: 'Martin',
      biography:
        'Software consultant and author known for Clean Code and Agile principles.',
      birthDate: '1952-12-05',
      deathDate: '',
      firstName: 'Robert',
      userId: 'b2d5ccea-8929-424f-8399-c804cd606f3d'
    },
  ],

  selectedBook: {
    tags: 'software,craft,engineering',
    title: 'The Pragmatic Programmer',
    format: 'Paperback',
    isbn10: '0135957052',
    isbn13: '9780135957059',
    edition: '20th Anniversary Edition',
    authorId: 'a1',
    language: 'English',
    pageCount: 352,
    publisher: 'Addison-Wesley',
    authorName: 'Andrew Hunt',
    readStatus: 'Read',
    reviewNotes: 'Practical advice and timeless principles. Great reread.',
    acquiredDate: '2023-02-01',
    readerRating: 5,
    coverImageUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    publishedDate: '2019-09-13',
    readStartDate: '2023-02-05',
    readFinishDate: '2023-02-20',
  },

  selectedAuthor: {
    notes: 'Talks and courses on craftsmanship.',
    country: 'United States',
    penName: 'Uncle Bob',
    website: 'https://cleancoder.com/',
    fullName: 'Robert C. Martin',
    lastName: 'Martin',
    biography:
      'Software consultant and author known for Clean Code and Agile principles.',
    birthDate: '1952-12-05',
    deathDate: '',
    firstName: 'Robert',
  },
};

// GlobalContextProvider component to wrap children
export const GlobalContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [globalDataState, setGlobalDataState] =
    useState<GlobalData>(defaultGlobalData);

  // Function to set global data
  const setGlobalData = useCallback((obj: GlobalData) => {
    setGlobalDataState((prev: GlobalData) => {
      return { ...prev, ...obj };
    });
  }, []);

  // Function to clear all global data
  const clearGlobalData = useCallback(() => {
    setGlobalDataState({});
  }, []);

  // Function to remove a specific key from the global data
  const removeGlobalDataByKey = useCallback((key: string) => {
    setGlobalDataState((prev: GlobalData) => {
      const { [key]: _, ...remainingData } = prev;
      return remainingData;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      setGlobalData,
      clearGlobalData,
      removeGlobalDataByKey,
      globalData: globalDataState,
    }),
    [setGlobalData, clearGlobalData, removeGlobalDataByKey, globalDataState],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    );
  }
  return context;
};

// ── AppContext ────────────────────────────────────────────────────────────────

export type EntityRuntimeState = {
  data?: unknown[];
  selected?: unknown;
  draft?: unknown;
  action?: string | null;
  lastSaved?: unknown;
};

export type AppContextData = {
  entities: Record<string, EntityRuntimeState>;
  workflows: Record<string, unknown>;
  ui: Record<string, unknown>;
  global: Record<string, unknown>;
};

type AppContextValue = {
  appContext: AppContextData;
  setAppContext: (
    updater:
      | Partial<AppContextData>
      | ((previous: AppContextData) => AppContextData),
  ) => void;
};

const defaultAppContext: AppContextData = {
  entities: {
    book: {
      data: [],
      selected: null,
      draft: {},
      action: null,
      lastSaved: null,
    },

    author: {
      data: [],
      selected: null,
      draft: null,
      action: null,
      lastSaved: null,
    },
  },
  workflows: {},
  ui: {},
  global: {},
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [appContext, _setAppContext] =
    useState<AppContextData>(defaultAppContext);

  const setAppContext = useCallback(
    (
      updater:
        | Partial<AppContextData>
        | ((previous: AppContextData) => AppContextData),
    ) => {
      _setAppContext((previous) => {
        if (typeof updater === 'function') {
          return updater(previous);
        }
        return { ...previous, ...updater };
      });
    },
    [],
  );

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};
