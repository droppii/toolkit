import React, { ComponentType, memo, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import { KButtonStepperProps, TestModifier } from '@uikit/types';
import { KColors } from '../../constants';
import KContainer from '../container';
import KImage from '../image';
import KLabel from '../label';

const KButtonStepper = (props: KButtonStepperProps) => {
  const {
    tintColor = KColors.gray.dark,
    containerStyle,
    maxValue,
    minValue,
    type,
    border,
    initialValue,
    size = 'large',
    stepCount = 1,
    stepBackground = KColors.palette.gray.w50,
    testID,
    testIDMinus,
    testIDPlus,
  } = props;

  const [count, setCount] = useState(initialValue || 0);

  const lbs = useMemo(() => {
    const btns: Array<any> = [
      {
        icon: 'minus-b',
        type: 'sub',
        testID: testIDMinus,
      },
      {
        icon: 'plus-b',
        type: 'add',
        testID: testIDPlus,
      },
    ];
    if (type?.includes('left')) {
      btns.unshift({ label: count });
    } else if (type?.includes('right')) {
      btns.push({ label: count });
    } else {
      btns.splice(1, 0, { label: count });
    }

    return btns as Array<{ icon?: string; type?: string; label?: string } & TestModifier>;
  }, [count, type, testIDMinus, testIDPlus]);

  return (
    <KContainer.View
      style={[styles.wrapper, containerStyle]}
      brC={KColors.palette.gray.w200}
      br="2x"
      brW={border ? 1 : 0}
      testID={testID}
    >
      {lbs.map(i => {
        const onPress = () => {
          setCount(i.type === 'sub' ? count - stepCount : count + stepCount);
        };

        const isDisabled =
          (!!minValue && minValue > count - stepCount && i.type === 'sub') ||
          (!!maxValue && maxValue < count + stepCount && i.type === 'add');

        const isCircle = type?.includes('circle');
        const isLarge = size === 'large';
        const isCenter = type?.includes('center');

        const mg: any = isCircle ? '0.25x' : 0.5;

        const brLR: any = i.type === 'sub' || type?.includes('center') ? '2x' : undefined;
        const brRR: any = i.type === 'add' || type?.includes('center') ? '2x' : undefined;

        return i.icon ? (
          <KContainer.Touchable
            key={i.icon}
            onPress={onPress}
            background={stepBackground}
            size={isLarge ? 40 : 32}
            center
            disabled={!!isDisabled}
            marginL={i.type === 'add' ? (isCenter ? 0 : mg) : 0}
            marginR={i.type === 'sub' ? (isCenter ? 0 : mg) : 0}
            brC={KColors.white}
            brTR={isCircle ? 'round' : border ? undefined : brRR}
            brBR={isCircle ? 'round' : border ? undefined : brRR}
            brTL={isCircle ? 'round' : border ? undefined : brLR}
            brBL={isCircle ? 'round' : border ? undefined : brLR}
            testID={i.testID}
          >
            <KImage.VectorIcons
              name={i.icon}
              color={tintColor}
              size={isLarge ? 18 : 16}
              style={!!isDisabled && styles.disabled}
            />
          </KContainer.Touchable>
        ) : (
          <KLabel.Text
            key={i.label}
            width={isLarge ? 36 : 32}
            typo="TextNmBold"
            color={tintColor}
            textAlign
            marginL={i.type === 'add' ? (isCenter ? 0 : mg) : 0}
            marginR={i.type === 'sub' ? (isCenter ? 0 : mg) : 0}
            brC={KColors.white}
          >
            {i.label}
          </KLabel.Text>
        );
      })}
    </KContainer.View>
  );
};

const KButtonStepperWithErrorBoundary = withErrorBoundary(KButtonStepper, {
  FallbackComponent: () => null,
  onError() {},
});

(KButtonStepperWithErrorBoundary as ComponentType<KButtonStepperProps>).defaultProps = {};

(KButtonStepperWithErrorBoundary as ComponentType<KButtonStepperProps>).displayName =
  'KButtonStepper';

export default memo(KButtonStepperWithErrorBoundary);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'baseline',
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: KColors.border.dark,
  },
  disabled: {
    opacity: 0.2,
  },
});
