import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { View, Icon } from 'native-base';

import { appBottomTabs } from '../../config/appBottomTabs';

const getBottomTabsIcon = (tabName: string) => {
  return appBottomTabs.find((tab) => tab.name === tabName)?.icon;
};

type Props = {
  routeName: string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  accessibilityLabel?: string;
};

const CustomTabBarButton = ({
  routeName,
  onPress,
  onLongPress,
  isFocused,
  accessibilityLabel,
}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.flex}
    >
      <View p={30} alignItems="center">
        <Icon
          color={isFocused ? '#673ab7' : '#222'}
          size="30"
          as={<MaterialCommunityIcons name={getBottomTabsIcon(routeName)} />}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
