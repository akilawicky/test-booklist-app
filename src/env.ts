import config from 'react-native-config';

const env = {
  api: {
    databaseAuthorizationToken: config.DATABASE_AUTHORIZATION_TOKEN,
    databaseApiKey: config.DATABASE_API_KEY,
    proxyUrl: config.PROXY_URL,
    API_KEY_HEADER: config.API_KEY_HEADER,
  },
};

export default env;
