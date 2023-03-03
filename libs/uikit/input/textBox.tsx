import React, { ComponentType, forwardRef, memo, useMemo } from 'react';
import { TextInput } from 'react-native';
import { KInputProps } from '@uikit/types';
import { get } from 'lodash';
import Base from './base';
import { KColors } from '../../constants';

export interface InputProps extends KInputProps {}

const TextBox = forwardRef<TextInput, InputProps>((props, ref) => {
  const { disabled, messageStatus } = props;

  const tintColor = useMemo(
    () =>
      disabled ? KColors.gray.light : get(KColors, `${messageStatus}.normal`, KColors.gray.light),
    [messageStatus, disabled]
  );

  return <Base {...props} paddingH="0.75rem" onPress={undefined} ref={ref} brC={tintColor} />;
});

(TextBox as ComponentType<InputProps>).defaultProps = {};

export default memo(TextBox);
