import React, { ComponentType, memo, useCallback, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { ListItemLabelAndDes, ListItemContent } from './helper';
import { KRadioProps } from '../../types';
import KContainer from '../container';
import { KColors } from '../../constants';
import KImage from '../image';

const TIMING_CONFIGS = { duration: 400 };

const AnimatedIcon: any = Animated.createAnimatedComponent(MaterialIcons);

const KRadio = (props: KRadioProps) => {
  const {
    activeColor = KColors.primary.normal,
    checked,
    label,
    isLastItem,
    description,
    rightNode,
    thumbnail,
    typo,
    paddingH,
    onChange,
    testID,
  } = props;

  const toggle = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  const anim = useDerivedValue(() => {
    return checked ? 1 : 0;
  });

  const rStyle = useAnimatedStyle(() => ({
    opacity: withTiming(anim.value, TIMING_CONFIGS),
  }));

  const iconColor = useMemo(
    () => (checked ? activeColor : KColors.gray.light),
    [checked, activeColor]
  );

  return (
    <KContainer.Touchable
      onPress={toggle}
      row
      alignItems
      brBW={isLastItem ? 0 : 1}
      brBC={KColors.border.light}
      paddingV="1rem"
      paddingH={paddingH}
      testID={testID}
    >
      <KContainer.View marginR="1rem">
        <AnimatedIcon color={iconColor} size={24} name={'radio-button-on'} style={rStyle} />
        <AnimatedIcon
          color={iconColor}
          size={24}
          name={'radio-button-off'}
          style={StyleSheet.absoluteFill}
        />
      </KContainer.View>

      <KContainer.View flex row alignItems>
        {thumbnail && (
          <KContainer.View marginR={'0.5rem'}>
            <KImage.Thumbnail {...thumbnail} />
          </KContainer.View>
        )}
        <ListItemLabelAndDes typo={typo} label={label} description={description} />
      </KContainer.View>

      <ListItemContent content={rightNode} />
    </KContainer.Touchable>
  );
};

const KRadioWithErrorBoundary = withErrorBoundary(KRadio, {
  FallbackComponent: () => null,
  onError() {},
});

(KRadioWithErrorBoundary as ComponentType<KRadioProps>).defaultProps = {};

(KRadioWithErrorBoundary as ComponentType<KRadioProps>).displayName = 'KRadio';

export default memo(KRadioWithErrorBoundary);
