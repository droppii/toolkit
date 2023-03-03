import { debounce } from 'lodash';
import React, { ComponentType, forwardRef, memo, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { KViewProps, TestModifier } from '@uikit/types';
import { TypoHelper } from '../../constants';

export interface KTouchableProps
  extends React.PropsWithChildren<KViewProps>,
    TestModifier,
    TouchableOpacityProps {}

const KTouchable = forwardRef<TouchableOpacity, KTouchableProps>((props, ref) => {
  const { innerProps, innerStyle } = useMemo(() => {
    const { style, ...rest } = props;
    const { mStyle, mProps } = TypoHelper.destructPropsToStyle(rest);
    const mergeStyles = StyleSheet.flatten([style, mStyle.layout, mStyle.spacing, mStyle.styling]);

    return {
      innerProps: mProps,
      innerStyle: mergeStyles,
    };
  }, [props]);

  const { onPress } = innerProps;

  const onPressWrapper = useCallback(() => {
    // @ts-ignore
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity
      {...innerProps}
      style={innerStyle}
      ref={ref}
      onPress={debounce(onPressWrapper, 300, { leading: true, trailing: false })}
    />
  );
});

(KTouchable as ComponentType<KTouchableProps>).defaultProps = {
  activeOpacity: 0.7,
};

(KTouchable as ComponentType<KTouchableProps>).displayName = 'KTouchable';

export default memo(KTouchable);
