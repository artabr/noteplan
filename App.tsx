import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { BottomTabs } from './components';

export default function App() {
  return (
    <NativeBaseProvider>
      <BottomTabs />
    </NativeBaseProvider>
  );
}
