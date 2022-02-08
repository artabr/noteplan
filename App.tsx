import React from 'react';
import { NativeBaseProvider } from 'native-base';

import BottomTabs from './components/BottomTabs';

export default function App() {
  return (
    <NativeBaseProvider>
      <BottomTabs />
    </NativeBaseProvider>
  );
}
