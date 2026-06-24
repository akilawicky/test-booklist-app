// SignUpWithEmailPasswordV101101.ts
// Import necessary modules
import { authApiClient } from './api-clients/AuthApiClient';
import env from '@/env';

import jsonpointer from 'jsonpointer';

interface Params {
  email: string;
  password: string;
}

import { cleanUrl, cleanBody } from './serviceUtils';

// Define SignUpWithEmailPasswordV101101 class
class SignUpWithEmailPasswordV101101 {
  // Singleton instance
  private static _instance: SignUpWithEmailPasswordV101101;
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
  public static get instance(): SignUpWithEmailPasswordV101101 {
    if (!this._instance) {
      this._instance = new SignUpWithEmailPasswordV101101();
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

  public async signUpWithEmailPasswordV101101(params: Params) {
    // Destructure workflow parameters from params object
    const { email, password } = params;

    try {
      // Destructure environment variables from env.api object
      const { databaseApiKey } = env.api;

      let signUpUser: unknown = undefined;

      // Get authenticated API client instance

      const authApiClientInstance = authApiClient.getApiClient();

      // signUpUser
      const signUpUserRequest = async () => {
        const client = authApiClientInstance;

        const url = cleanUrl(`/functions/v1/auth-service/sign-up`);

        const header = {
          headers: {
            apikey: `${databaseApiKey}`,
            'x-app-id': `d8139f6a-10cf-4dcb-b6f4-9b2d29b32a27`,
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
        signUpUser = await signUpUserRequest();
        if (!(signUpUser.status === 200)) {
          throw new Error('signUpUser failed.');
        }

        let signUpUserResponse = {
          signUpWithEmailPasswordUser: this.processJsonPointer(
            signUpUser.data,
            '/user',
          ),
          session: this.processJsonPointer(signUpUser.data, '/session'),
          accessToken: this.processJsonPointer(
            signUpUser.data,
            '/session/access_token',
          ),
          refreshToken: this.processJsonPointer(
            signUpUser.data,
            '/session/refresh_token',
          ),
          userId: this.processJsonPointer(signUpUser.data, '/user/id'),
          email: this.processJsonPointer(signUpUser.data, '/user/email'),
        };
        return signUpUserResponse;
      } catch (error) {
        console.error('Error occurred:', error.message);
        throw new Error('signUpWithEmailPasswordV101 failed', { cause: error });
      }
    } catch (error) {
      // Determine which step failed and include it in the error message

      throw new Error('signUpWithEmailPasswordV101101 failed', {
        cause: error,
      });
    }
  }
}

// Export singleton instance
export const signUpWithEmailPasswordV101101Service =
  SignUpWithEmailPasswordV101101.instance;
