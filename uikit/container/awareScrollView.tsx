import React, { ComponentType, forwardRef, memo } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KAwareScrollViewProps } from '../../types';

const KAwareScrollView = forwardRef<KeyboardAwareScrollView, KAwareScrollViewProps>(
  (props, ref) => {
    return <KeyboardAwareScrollView {...props} ref={ref} />;
  }
);

(KAwareScrollView as ComponentType<KAwareScrollViewProps>).defaultProps = {};

(KAwareScrollView as ComponentType<KAwareScrollViewProps>).displayName = 'KAwareScrollView';

export default memo(KAwareScrollView);
