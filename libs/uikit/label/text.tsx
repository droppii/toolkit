import React, { ComponentType, forwardRef, memo, useMemo } from 'react';
import { KTextProps } from '@uikit/types';
import { StyleSheet, Text } from 'react-native';
import { get } from 'lodash';
import { TypoHelper } from '../../constants';
import { useTheme } from '../../hooks';

const KText = forwardRef<Text, KTextProps>((props, ref) => {
  const { typo, style, ...rest } = props;

  const typos = useTheme();

  const { innerStyle, innerProps } = useMemo(() => {
    const { mStyle: s, mProps: p } = TypoHelper.destructPropsToStyle(rest);
    const typoStyle = get(typos, typo || '', undefined);
    const mergeStyles = StyleSheet.flatten([
      typoStyle,
      style,
      s.layout,
      s.spacing,
      s.styling,
      s.text,
    ]);
    return { innerStyle: mergeStyles, innerProps: p };
  }, [style, rest, typos, typo]);

  return <Text {...innerProps} style={innerStyle} ref={ref} />;
});

(KText as ComponentType<KTextProps>).defaultProps = {
  typo: 'TextNmNormal',
};

(KText as ComponentType<KTextProps>).displayName = 'KText';

export default memo(KText);
