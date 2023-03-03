import React, { ComponentType, forwardRef, memo } from 'react';
import { ScrollView } from 'react-native';
import { ScrollView as GScrollView } from 'react-native-gesture-handler';
import { KScrollViewProps } from '../../types';

const KScrollView = forwardRef<ScrollView, KScrollViewProps>((props, ref) => {
  if (props.isGestureScrollView) {
    return <GScrollView {...props} ref={ref} />;
  }
  return <ScrollView {...props} ref={ref} />;
});

(KScrollView as ComponentType<KScrollViewProps>).defaultProps = {};

(KScrollView as ComponentType<KScrollViewProps>).displayName = 'KScrollView';

export default memo(KScrollView);
