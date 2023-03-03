import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { KProgressLineProps } from '@uikit/types';
import { KColors } from '../../constants';
import KLabel from '../label';

const KProgressLine = (props: KProgressLineProps) => {
  const {
    percent,
    color = KColors.gray.dark,
    backgroundColor = KColors.palette.gray.w50,
    thin = 4,
    labelTypo = 'TextXsNormal',
    showLabel = true,
    testID,
  } = props;

  const mPercent = useMemo(() => percent.toFixed(1), [percent]);

  const wrapperStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: backgroundColor,
      borderRadius: thin,
      height: thin,
      overflow: 'hidden',
    }),
    [backgroundColor, thin]
  );

  const style: ViewStyle = useMemo(
    () => ({
      width: `${mPercent}%`,
      backgroundColor: color,
      borderRadius: thin,
      height: thin,
      overflow: 'hidden',
    }),
    [color, mPercent, thin]
  );

  return (
    <View style={styles.row} testID={testID}>
      <View style={[wrapperStyle, styles.left]}>
        <View style={style} />
      </View>
      {showLabel && (
        <KLabel.Text
          typo={labelTypo}
          color={color}
          style={[styles.label, styles.right]}
        >{`${mPercent}%`}</KLabel.Text>
      )}
    </View>
  );
};

(KProgressLine as React.ComponentType<KProgressLineProps>).defaultProps = {};

const KProgressLineWithErrorBoundary = withErrorBoundary(KProgressLine, {
  FallbackComponent: () => null,
  onError() {},
});

(KProgressLineWithErrorBoundary as ComponentType<KProgressLineProps>).displayName = 'KProgressLine';

export default memo(KProgressLineWithErrorBoundary);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
  left: {
    flexBasis: 'auto',
    flexShrink: 0,
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  right: {
    // flexBasis: 40,
    flexShrink: 1,
    flexGrow: 0,
    textAlign: 'right',
  },
});
