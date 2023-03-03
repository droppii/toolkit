import React, { useState } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { droppiiFontSelection, KColors } from '../constants';

interface Props {
  size?: number;
  activeColor?: string;
  tintColor?: string;
  initialOpen?: boolean;
  type?: 'up-down' | 'right-down' | 'left-down';
  containerStyle?: StyleProp<ViewStyle>;
}

const DroppiiNew = createIconSetFromIcoMoon(droppiiFontSelection);

const AnimatedIcon = Animated.createAnimatedComponent(DroppiiNew);

const useAnimatedChevronButton = (props?: Props) => {
  const {
    initialOpen,
    size = 20,
    tintColor = KColors.gray.dark,
    activeColor = KColors.gray.dark,
    type = 'right-down',
    containerStyle,
  } = props || {};
  const [isCollapsed, setCollapsed] = useState(!initialOpen);

  const rotateZ = useDerivedValue(() => {
    return !isCollapsed
      ? '0deg'
      : type === 'up-down'
      ? '-180deg'
      : type === 'left-down'
      ? '90deg'
      : '-90deg';
  });

  const collapseAnim = useDerivedValue(() => {
    return isCollapsed ? 1 : 0;
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: withTiming(rotateZ.value),
      },
    ],
  }));

  const rIconStyle = useAnimatedStyle(() => ({
    color: withTiming(interpolateColor(collapseAnim.value, [1, 0], [tintColor, activeColor])),
  }));

  return {
    isCollapsed,
    AnimatedChevronButton: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={setCollapsed.bind(null, !isCollapsed)}
        style={containerStyle}
      >
        <Animated.View style={rStyle}>
          <AnimatedIcon name="angle-down-o" size={size} style={rIconStyle} />
        </Animated.View>
      </TouchableOpacity>
    ),
  };
};

export default useAnimatedChevronButton;
