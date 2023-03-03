import { useEffect } from 'react';
import { Platform, StatusBar, StatusBarStyle } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const useStatusBarTheme = (style: StatusBarStyle) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && Platform.OS === 'ios') {
      StatusBar.setBarStyle(style);
    }
  }, [isFocused, style]);
};

export default useStatusBarTheme;
