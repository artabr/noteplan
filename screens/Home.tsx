import React from 'react';

import { View, Text, Column } from 'native-base';
import { SelectPlan } from '../components';

const Home = () => {
  return (
    <Column>
      <View flex="1" justifyContent="center" alignItems="center">
        <Text>Home</Text>
      </View>
      <SelectPlan defaultValue="ux" />
    </Column>
  );
};

export default Home;
