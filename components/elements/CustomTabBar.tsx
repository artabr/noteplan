import React from 'react';

import { View } from 'native-base';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import CustomTabBarButton from './CustomTabBarButton';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View flexDirection="row">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <CustomTabBarButton
            key={route.key}
            routeName={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;
