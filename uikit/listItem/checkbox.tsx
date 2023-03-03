import React, { ComponentType, memo, useCallback, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { ListItemContent, ListItemLabelAndDes } from './helper';
import { KCheckboxProps } from '../../types';
import KContainer from '../container';
import { KColors } from '../../constants';
import KImage from '../image';

const TIMING_CONFIGS = { duration: 200 };

const AnimatedIcon: any = Animated.createAnimatedComponent(KImage.VectorIcons);

const KCheckbox = (props: KCheckboxProps) => {
  const {
    activeColor = KColors.primary.normal,
    checked,
    label,
    customLabel,
    shape,
    isLastItem,
    description,
    rightNode,
    thumbnail,
    typo,
    paddingH,
    paddingV = '1rem',
    iconSize = 24,
    onChange,
    changeLabelColor = false,
    testID,
  } = props;

  const toggle = useCallback(() => {
    onChange?.(!checked);
  }, [checked, onChange]);

  const anim = useDerivedValue(() => {
    return checked ? 1 : 0;
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(anim.value, TIMING_CONFIGS),
      },
    ],
    opacity: withTiming(anim.value, TIMING_CONFIGS),
  }));

  const color = useMemo(() => (checked ? activeColor : KColors.gray.light), [checked, activeColor]);

  return (
    <KContainer.Touchable
      onPress={toggle}
      row
      alignItems
      brBW={isLastItem ? 0 : 1}
      brBC={KColors.border.light}
      paddingV={paddingV}
      paddingH={paddingH}
      testID={testID}
    >
      <KContainer.View marginR="1rem">
        <AnimatedIcon
          color={color}
          size={iconSize}
          name={shape === 'square' ? 'check-square-b' : 'check-circle-b'}
          style={rStyle}
        />

        <KImage.VectorIcons
          style={StyleSheet.absoluteFill}
          color={color}
          size={iconSize}
          name={shape === 'square' ? 'square-o' : 'circle-o'}
        />
      </KContainer.View>

      <KContainer.View flex row alignItems>
        {thumbnail && (
          <KContainer.View marginR={'0.5rem'}>
            <KImage.Thumbnail {...thumbnail} />
          </KContainer.View>
        )}
        <ListItemLabelAndDes
          typo={typo}
          label={label}
          customLabel={customLabel}
          description={description}
          tintColor={changeLabelColor && checked ? color : undefined}
        />
      </KContainer.View>

      <ListItemContent content={rightNode} />
    </KContainer.Touchable>
  );
};

const KCheckboxWithErrorBoundary = withErrorBoundary(KCheckbox, {
  FallbackComponent: () => null,
  onError() {},
});

(KCheckboxWithErrorBoundary as ComponentType<KCheckboxProps>).defaultProps = {};

(KCheckboxWithErrorBoundary as ComponentType<KCheckboxProps>).displayName = 'KCheckbox';

export default memo(KCheckboxWithErrorBoundary);
