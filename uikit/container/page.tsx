import React, { ComponentType, forwardRef, memo } from 'react';
import { View } from 'react-native';
import KView from './view';
import { KPageProps } from '../../types';
import { useTheme } from '../../hooks';

const KPage = forwardRef<View, KPageProps>((props, ref) => {
  const { Page } = useTheme();

  return <KView {...props} style={[props.style, Page]} flex ref={ref} />;
});

(KPage as ComponentType<KPageProps>).displayName = 'KPage';

export default memo(KPage);
