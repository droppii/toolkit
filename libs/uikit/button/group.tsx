import React, { ComponentType, memo } from 'react';
import { StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KButtonGroupProps } from '@uikit/types';
import { KColors } from '../../constants';
import KContainer from '../container';
import KLabel from '../label';

const KButtonGroup = (props: KButtonGroupProps) => {
  const {
    buttons,
    activeIndex,
    withRadio,
    iconSize = 20,
    tintColor = KColors.gray.normal,
    background = KColors.white,
    containerStyle,
    testID,
  } = props;

  return (
    <KContainer.View
      style={[styles.wrapper, containerStyle]}
      brC={KColors.border.dark}
      br="2x"
      background={background}
      testID={testID}
    >
      {buttons.map((i, index) => {
        return (
          <KContainer.Touchable
            key={`button-${index}-${i.title}`}
            paddingH={'1rem'}
            paddingV={'0.5rem'}
            disabled={i.disabled}
            style={[
              styles.item,
              index < buttons.length - 1 && styles.borderRight,
              i.disabled && styles.disabled,
            ]}
            onPress={i.onPress}
            testID={i.testID}
          >
            {!!withRadio && (
              <KContainer.View marginR={'0.5rem'}>
                <MaterialIcons
                  name={activeIndex === index ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={iconSize}
                  color={activeIndex === index ? KColors.primary.normal : tintColor}
                />
              </KContainer.View>
            )}
            <KLabel.Text
              typo={i.typo || 'TextNmNormal'}
              color={activeIndex === index ? KColors.primary.normal : KColors.gray.dark}
            >
              {i.title}
            </KLabel.Text>
          </KContainer.Touchable>
        );
      })}
    </KContainer.View>
  );
};

const KButtonGroupWithErrorBoundary = withErrorBoundary(KButtonGroup, {
  FallbackComponent: () => null,
  onError() {},
});

(KButtonGroupWithErrorBoundary as ComponentType<KButtonGroupProps>).defaultProps = {};

(KButtonGroupWithErrorBoundary as ComponentType<KButtonGroupProps>).displayName = 'KButtonGroup';

export default memo(KButtonGroupWithErrorBoundary);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'baseline',
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
    opacity: 0.5,
  },
  radio: {
    width: 20,
    height: 20,
  },
});
