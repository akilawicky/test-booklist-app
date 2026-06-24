// SignInWithEmailPassword100.ts
// Import necessary modules
import { authApiClient } from './api-clients/AuthApiClient';
import env from '@/env';

import jsonpointer from 'jsonpointer';

interface Params {
  email: string;
  password: string;
}

import { cleanUrl, cleanBody } from './serviceUtils';

// Define SignInWithEmailPassword100 class
class SignInWithEmailPassword100 {
  // Singleton instance
  private static _instance: SignInWithEmailPassword100;
  private _configs?: Record<string, unknown>;

  // Private constructor
  private constructor() {}

  // Method to configure the service
  public configure(configs: Record<string, unknown>) {
    this._configs = configs;
  }

  // Method to get locale from configs
  public getLocale(): string | undefined {
    if (this._configs) {
      return this._configs.locale as string | undefined;
    }
  }

  // Method to get singleton instance
  public static get instance(): SignInWithEmailPassword100 {
    if (!this._instance) {
      this._instance = new SignInWithEmailPassword100();
    }
    return this._instance;
  }

  // Method to get JSON Pointer value
  processJsonPointer = (data: unknown, path: string) => {
    if (!data || !path) {
      throw new Error(
        'Invalid data or path provided for JSON Pointer processing',
      );
    }
    // Use jsonpointer to get the value at the specified path
    const value = jsonpointer.get(data, path);
    return value;
  };

  public async signInWithEmailPassword100(params: Params) {
    // Destructure workflow parameters from params object
    const { email, password } = params;

    try {
      // Destructure environment variables from env.api object
      const { databaseApiKey, databaseAuthorizationToken } = env.api;

      let signInUser: unknown = undefined;

      // Get authenticated API client instance

      const authApiClientInstance = authApiClient.getApiClient();

      // signInUser
      const signInUserRequest = async () => {
        const client = authApiClientInstance;

        const url = cleanUrl(`/auth/v1/token?grant_type=password`);

        const header = {
          headers: {
            apikey: `${databaseApiKey}`,
            Authorization: `${databaseAuthorizationToken}`, // NOSONAR
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        };

        let body;
        body = { email: email, password: password };
        // Remove undefined values and empty strings

        body = cleanBody(body);

        const response = await client.post(url, body, header);

        return response;
      };

      try {
        signInUser = await signInUserRequest();
        if (!(signInUser.status === 200)) {
          throw new Error('signInUser failed.');
        }

        let signInUserResponse = {
          accessToken: this.processJsonPointer(
            signInUser.data,
            '/access_token',
          ),
          refreshToken: this.processJsonPointer(
            signInUser.data,
            '/refresh_token',
          ),
          userId: this.processJsonPointer(signInUser.data, '/user/id'),
          email: this.processJsonPointer(signInUser.data, '/user/email'),
          phone: this.processJsonPointer(signInUser.data, '/user/phone'),
          user: this.processJsonPointer(signInUser.data, '/user'),
        };
        return signInUserResponse;
      } catch (error) {
        console.error('Error occurred:', error.message);
        throw new Error('signInWithEmailPassword failed', { cause: error });
      }
    } catch (error) {
      // Determine which step failed and include it in the error message

      throw new Error('signInWithEmailPassword100 failed', { cause: error });
    }
  }
}

// Export singleton instance
export const signInWithEmailPassword100Service =
  SignInWithEmailPassword100.instance;
