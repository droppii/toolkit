import React, { ComponentType, forwardRef, memo, useCallback, useMemo } from 'react';
import { TextInput } from 'react-native';
import { KInputProps } from '@uikit/types';
import { get } from 'lodash';
import Base from './base';
import { KColors } from '../../constants';
import KImage from '../image';

export interface InputProps extends KInputProps {}

const Selector = forwardRef<TextInput, InputProps>((props, ref) => {
  const { disabled, messageStatus, border, onPress } = props;

  const tintColor = useMemo(
    () =>
      disabled ? KColors.gray.light : get(KColors, `${messageStatus}.normal`, KColors.gray.light),
    [messageStatus, disabled]
  );

  const onPressWrapper = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [disabled, onPress]);

  const rightNode = useCallback(() => {
    return (
      <KImage.CommonIcon
        vectorName={'angle-down-o'}
        size={20}
        tintColor={KColors.gray.dark}
        onPress={onPressWrapper}
      />
    );
  }, [onPressWrapper]);

  return (
    <Base
      {...props}
      paddingH={border === 'bottom' ? 0 : '0.75rem'}
      onPress={onPressWrapper}
      ref={ref}
      brC={tintColor}
      rightNode={rightNode}
    />
  );
});

(Selector as ComponentType<InputProps>).defaultProps = {};

export default memo(Selector);
