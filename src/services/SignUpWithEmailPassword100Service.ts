// SignUpWithEmailPassword100.ts
// Import necessary modules
import { authApiClient } from './api-clients/AuthApiClient';
import env from '@/env';

interface Params {
  email: string;
  password: string;
}

import { cleanUrl, cleanBody } from './serviceUtils';

// Define SignUpWithEmailPassword100 class
class SignUpWithEmailPassword100 {
  // Singleton instance
  private static _instance: SignUpWithEmailPassword100;
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
  public static get instance(): SignUpWithEmailPassword100 {
    if (!this._instance) {
      this._instance = new SignUpWithEmailPassword100();
    }
    return this._instance;
  }

  public async signUpWithEmailPassword100(params: Params) {
    // Destructure workflow parameters from params object
    const { email, password } = params;

    try {
      // Destructure environment variables from env.api object
      const { databaseApiKey, databaseAuthorizationToken } = env.api;

      let signUpUser: unknown = undefined;

      // Get authenticated API client instance

      const authApiClientInstance = authApiClient.getApiClient();

      // signUpUser
      const signUpUserRequest = async () => {
        const client = authApiClientInstance;

        const url = cleanUrl(`/auth/v1/signup`);

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
        signUpUser = await signUpUserRequest();
        if (!(signUpUser.status === 200)) {
          throw new Error('signUpUser failed.');
        }

        let signUpUserResponse = {
          signUpWithEmailPasswordUser: signUpUser.data,
        };
        return signUpUserResponse;
      } catch (error) {
        console.error('Error occurred:', error.message);
        throw new Error('signUpWithEmailPassword failed', { cause: error });
      }
    } catch (error) {
      // Determine which step failed and include it in the error message

      throw new Error('signUpWithEmailPassword100 failed', { cause: error });
    }
  }
}

// Export singleton instance
export const signUpWithEmailPassword100Service =
  SignUpWithEmailPassword100.instance;
