export type BookEntity = Record<string, unknown>;

export type BookFormValues = {
  inTitle?: string;
  ddAuthor?: string;
  inEdition?: string;
  inPublisher?: string;
  dpPublished?: string;
  dpAcquired?: string;
  ddFormat?: string;
  inIsbn10?: string;
  inIsbn13?: string;
  ddLanguage?: string;
  inPages?: string | number;
  ddReadStatus?: string;
  dpReadStart?: string;
  dpReadFinish?: string;
  slRating?: string | number;
  inTags?: string;
  inReview?: string;
};

const firstDefined = (...values: unknown[]) =>
  values.find((value) => value !== undefined && value !== null && value !== '');

const asString = (value: unknown): string =>
  value === undefined || value === null ? '' : String(value);

const asNumber = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? undefined : numberValue;
};

export const mapBookApiToEntity = (book: BookEntity): BookEntity => ({
  ...book,
  id: firstDefined(book.id, book.bookId, book.book_id),
  title: firstDefined(book.title, book.bookTitle, book.book_title),
  authorId: firstDefined(book.authorId, book.author_id),
  authorName: firstDefined(book.authorName, book.author_name, book.author),
  coverImageUrl: firstDefined(book.coverImageUrl, book.cover_image_url),
  publishedDate: firstDefined(book.publishedDate, book.published_date),
  acquiredDate: firstDefined(book.acquiredDate, book.acquired_date),
  pageCount: firstDefined(book.pageCount, book.page_count),
  readStatus: firstDefined(book.readStatus, book.read_status),
  readStartDate: firstDefined(book.readStartDate, book.read_start_date),
  readFinishDate: firstDefined(book.readFinishDate, book.read_finish_date),
  readerRating: firstDefined(book.readerRating, book.reader_rating, book.rating),
  reviewNotes: firstDefined(book.reviewNotes, book.review_notes),
});

export const mapBookDraftToFormValues = (
  draft: BookEntity = {},
): Partial<BookFormValues> => ({
  inTitle: asString(firstDefined(draft.title, draft.bookTitle)),
  ddAuthor: asString(firstDefined(draft.authorId, draft.authorName)),
  inEdition: asString(draft.edition),
  inPublisher: asString(draft.publisher),
  dpPublished: asString(firstDefined(draft.publishedDate, draft.published_date)),
  dpAcquired: asString(firstDefined(draft.acquiredDate, draft.acquired_date)),
  ddFormat: asString(firstDefined(draft.format, draft.app_format)),
  inIsbn10: asString(draft.isbn10),
  inIsbn13: asString(draft.isbn13),
  ddLanguage: asString(firstDefined(draft.language, draft.app_language)),
  inPages: asString(firstDefined(draft.pageCount, draft.page_count)),
  ddReadStatus: asString(firstDefined(draft.readStatus, draft.read_status)),
  dpReadStart: asString(firstDefined(draft.readStartDate, draft.read_start_date)),
  dpReadFinish: asString(
    firstDefined(draft.readFinishDate, draft.read_finish_date),
  ),
  slRating: asString(
    firstDefined(draft.readerRating, draft.reader_rating, draft.rating),
  ),
  inTags: asString(draft.tags),
  inReview: asString(firstDefined(draft.reviewNotes, draft.review_notes)),
});

export const mapBookFormValuesToDraft = (
  values: BookFormValues,
): BookEntity => ({
  title: values.inTitle,
  authorId: values.ddAuthor,
  edition: values.inEdition,
  publisher: values.inPublisher,
  publishedDate: values.dpPublished,
  acquiredDate: values.dpAcquired,
  format: values.ddFormat,
  isbn10: values.inIsbn10,
  isbn13: values.inIsbn13,
  language: values.ddLanguage,
  pageCount: asNumber(values.inPages),
  readStatus: values.ddReadStatus,
  readStartDate: values.dpReadStart,
  readFinishDate: values.dpReadFinish,
  readerRating: asNumber(values.slRating),
  tags: values.inTags,
  reviewNotes: values.inReview,
});

export const mapBookEntityToApiBody = (book: BookEntity): BookEntity => ({
  title: book.title,
  author_id: book.authorId,
  edition: book.edition,
  publisher: book.publisher,
  published_date: book.publishedDate,
  acquired_date: book.acquiredDate,
  format: book.format,
  isbn10: book.isbn10,
  isbn13: book.isbn13,
  language: book.language,
  page_count: book.pageCount,
  read_status: book.readStatus,
  read_start_date: book.readStartDate,
  read_finish_date: book.readFinishDate,
  reader_rating: book.readerRating,
  tags: book.tags,
  review_notes: book.reviewNotes,
  cover_image_url: book.coverImageUrl,
});
