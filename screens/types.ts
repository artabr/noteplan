import { MaterialCommunityIcons } from '@expo/vector-icons';

export enum AppBottomTabsNames {
  Home = 'Home',
  Camera = 'Camera',
  Account = 'Account',
}

export interface AppBottomTab {
  name: AppBottomTabsNames;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}
