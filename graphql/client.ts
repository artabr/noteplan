import { createClient } from '@urql/core';
import Constants from 'expo-constants';

export const client = createClient({
  url:
    ((Constants.manifest?.extra && Constants.manifest?.extra.backendURL) ||
      'http://localhost:1337') + '/graphql',
});
