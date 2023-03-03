import React, { ComponentType, forwardRef, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KViewProps } from '../../types';
import { TypoHelper } from '../../constants';

const KView = forwardRef<View, KViewProps>((props, ref) => {
  const { innerProps, innerStyle } = useMemo(() => {
    const { style, ...rest } = props;
    const { mStyle, mProps } = TypoHelper.destructPropsToStyle(rest);
    const mergeStyles = StyleSheet.flatten([style, mStyle.layout, mStyle.spacing, mStyle.styling]);

    return {
      innerProps: mProps,
      innerStyle: mergeStyles,
    };
  }, [props]);

  if (Array.isArray(props.edges)) {
    return <SafeAreaView {...innerProps} style={innerStyle} ref={ref} />;
  }
  return <View {...innerProps} style={innerStyle} ref={ref} />;
});

(KView as ComponentType<KViewProps>).displayName = 'KView';

export default memo(KView);
