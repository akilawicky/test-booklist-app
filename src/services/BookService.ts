import { authApiClient } from './api-clients/AuthApiClient';
import env from '@/env';
import { cleanBody, cleanUrl } from './serviceUtils';

type BookBody = Record<string, unknown>;

const booksTableUrl = '/rest/v1/books';

const getSupabaseHeaders = () => ({
  apikey: `${env.api.databaseApiKey}`,
  Authorization: `${env.api.databaseAuthorizationToken}`,
  'Content-Type': 'application/json',
  accept: 'application/json',
  Prefer: 'return=representation',
});

class BookService {
  private static _instance: BookService;

  private constructor() {}

  public static get instance(): BookService {
    if (!this._instance) {
      this._instance = new BookService();
    }
    return this._instance;
  }

  public async getBooks() {
    const client = authApiClient.getApiClient();
    const response = await client.get(cleanUrl(`${booksTableUrl}?select=*`), {
      headers: getSupabaseHeaders(),
    });
    return { items: Array.isArray(response.data) ? response.data : [] };
  }

  public async createBook(params: { body: BookBody }) {
    const client = authApiClient.getApiClient();
    const response = await client.post(booksTableUrl, cleanBody(params.body), {
      headers: getSupabaseHeaders(),
    });
    return Array.isArray(response.data) ? response.data[0] : response.data;
  }

  public async updateBook(params: { id: string | number; body: BookBody }) {
    const client = authApiClient.getApiClient();
    const response = await client.patch(
      cleanUrl(`${booksTableUrl}?id=eq.${params.id}`),
      cleanBody(params.body),
      { headers: getSupabaseHeaders() },
    );
    return Array.isArray(response.data) ? response.data[0] : response.data;
  }
}

export const bookService = BookService.instance;
