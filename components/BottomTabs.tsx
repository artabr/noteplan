import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from './elements/CustomTabBar';

import { Home, Camera, Account } from '../screens';
import { AppBottomTabsNames } from '../screens/types';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name={AppBottomTabsNames.Home} component={Home} />
        <Tab.Screen name={AppBottomTabsNames.Camera} component={Camera} />
        <Tab.Screen name={AppBottomTabsNames.Account} component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
