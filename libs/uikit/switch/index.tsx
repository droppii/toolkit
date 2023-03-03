import { KSwitchProps } from '@uikit/types';
import React, { ComponentType, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { Platform, Switch as RSwitch, SwitchProps } from 'react-native';
import KColors from '../../constants/colors';

const KSwitch: React.FC<KSwitchProps> = props => {
  return <RSwitch {...props} />;
};

const ratio = Platform.OS === 'ios' ? 0.8 : 1;

(KSwitch as ComponentType<SwitchProps>).defaultProps = {
  trackColor: {
    true: KColors.primary.normal,
    false: KColors.palette.gray.w200,
  },
  thumbColor: KColors.white,
  style: {
    transform: [{ scaleX: ratio }, { scaleY: ratio }],
  },
};

const KSwitchWithErrorBoundary = withErrorBoundary(KSwitch, {
  FallbackComponent: () => null,
  onError() {},
});

(KSwitchWithErrorBoundary as ComponentType<KSwitchProps>).displayName = 'KSwitch';

export default memo(KSwitchWithErrorBoundary);
