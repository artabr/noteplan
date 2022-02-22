import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider as UrqlProvider } from 'urql';
import { client } from './graphql/client';

import BottomTabs from './components/BottomTabs';

export default function App() {
  return (
    <UrqlProvider value={client}>
      <NativeBaseProvider>
        <BottomTabs />
      </NativeBaseProvider>
    </UrqlProvider>
  );
}
