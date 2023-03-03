import React, { ComponentType, memo } from 'react';
import { StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KButtonGroupControlProps, KButtonGroupProps } from '@uikit/types';
import { KColors } from '../../constants';
import KContainer from '../container';

const KButtonGroup = (props: KButtonGroupControlProps) => {
  const {
    onCenterPress,
    onLeftPress,
    onRightPress,
    iconSize = 20,
    tintColor = KColors.gray.normal,
    testID,
    testIDCenter,
    testIDLeft,
    testIDRight,
  } = props;

  return (
    <KContainer.View style={styles.wrapper} brC={KColors.border.dark} br="2x" testID={testID}>
      <KContainer.Touchable
        paddingH={'1rem'}
        paddingV={'0.5rem'}
        style={[styles.item, styles.borderRight]}
        onPress={onLeftPress}
        testID={testIDLeft}
      >
        <Ionicons name="arrow-back-outline" size={iconSize} color={tintColor} />
      </KContainer.Touchable>

      <KContainer.Touchable
        paddingH={'1rem'}
        paddingV={'0.5rem'}
        style={[styles.item, styles.borderRight]}
        onPress={onCenterPress}
        testID={testIDCenter}
      >
        <MaterialIcons name="add" size={iconSize} color={tintColor} />
      </KContainer.Touchable>

      <KContainer.Touchable
        paddingH={'1rem'}
        paddingV={'0.5rem'}
        style={styles.item}
        onPress={onRightPress}
        testID={testIDRight}
      >
        <Ionicons name="arrow-forward-outline" size={iconSize} color={tintColor} />
      </KContainer.Touchable>
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
