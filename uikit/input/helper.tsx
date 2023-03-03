import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { get } from 'lodash';
import { KInputProps, TypographyModifier } from '../../types';
import { KColors, KSpacingValue, TypoHelper } from '../../constants';
import { useCombineRefs, useTheme } from '../../hooks';
import KContainer from '../container';
import KImage from '../image';

const useInputOptions = (props: KInputProps, ref: React.ForwardedRef<TextInput>) => {
  const {
    style,
    value,
    nextRef,
    inputType,
    autoFocus,
    autoCapitalize,
    clearButtonMode,
    size,
    border,
    disabled,
    background,
    searchIconLeftColor,
    leftNode,
    rightNode,
    onChangeText,
    onSubmitEditing,
    onFocus,
    onBlur,
    onPress,
    ...rest
  } = props;

  const innerRef = useRef<TextInput>();
  const combinedRef = useCombineRefs<TextInput>(ref, innerRef); // pointed innerRef above to parent forwardRef to use ref
  const [innerValue, setInnerValue] = useState(value || '');
  const [hasFocus, setHasFocus] = useState(autoFocus);
  const [hidden, setHidden] = useState(inputType === 'password');

  const typos = useTheme();

  const typo: TypographyModifier = useMemo(() => {
    switch (size) {
      case 'small':
        return 'TextSmNormal';
      case 'x-small':
        return 'TextXsNormal';
      default:
        return 'TextNmNormal';
    }
  }, [size]);

  const containerHeight = useMemo(() => {
    switch (size) {
      case 'x-large':
        return 56;
      case 'large':
        return 48;
      case 'small':
        return 32;
      case 'x-small':
        return 28;
      default:
        return 40;
    }
  }, [size]);

  const { innerStyle, innerProps, mContainerStyle } = useMemo(() => {
    const { mStyle: s, mProps: p } = TypoHelper.destructPropsToStyle(rest);
    const typoStyle = get(typos, typo, undefined);
    return {
      innerStyle: StyleSheet.flatten([typoStyle, style, s.text, styles.input]),
      innerProps: p,
      mContainerStyle: StyleSheet.flatten([s.layout, s.spacing, s.styling]),
    };
  }, [style, rest, typos, typo]);

  const _onSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmitEditing?.(e);
      nextRef?.current?.focus?.();
    },
    [onSubmitEditing, nextRef]
  );

  const _onChangeText = useCallback(
    (text: string = '') => {
      const newText = inputType === 'phone' ? text.replace(/[^\d+#*]/g, '') : text;

      onChangeText?.(newText);
      setInnerValue(newText);
    },
    [onChangeText, inputType]
  );

  useEffect(() => {
    setInnerValue(value || '');
  }, [value]);

  const _onFocus = useCallback(
    (e: any) => {
      setHasFocus(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const _onBlur = useCallback(
    (e: any) => {
      setHasFocus(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const _onPress = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [disabled, onPress]);

  const _onClear = useCallback(() => {
    setInnerValue('');
    onChangeText?.('');
  }, [onChangeText]);

  const _onToggleEye = useCallback(() => {
    setHidden(!hidden);
  }, [hidden]);

  const bg = useMemo(() => {
    if (disabled) {
      return KColors.opacity.gray[20];
    }
    if (border === 'bottom') {
      return KColors.transparent;
    }
    return background ?? KColors.white;
  }, [disabled, border, background]);

  const renderEye = useMemo(() => {
    return inputType === 'password' ? (
      <KImage.CommonIcon
        onPress={_onToggleEye}
        vectorName={hidden ? 'eye-b' : 'eye-off-b'}
        tintColor={KColors.gray.light}
        containerStyle={styles.clear}
      />
    ) : null;
  }, [inputType, hidden, _onToggleEye]);

  const renderClearButton = useCallback(
    (alwayShow?: boolean) => {
      return hasFocus && !!innerValue && (!clearButtonMode || clearButtonMode === 'show') ? (
        <KImage.CommonIcon
          onPress={_onClear}
          vectorName="close-circle"
          vectorProvider="Ionicons"
          tintColor={KColors.palette.gray.w200}
          containerStyle={styles.clear}
        />
      ) : alwayShow ? (
        <KImage.CommonIcon
          vectorName="close-circle"
          vectorProvider="Ionicons"
          tintColor={KColors.transparent}
          containerStyle={styles.clear}
        />
      ) : null;
    },
    [_onClear, clearButtonMode, hasFocus, innerValue]
  );

  const renderRightNode = useMemo(() => {
    return rightNode ? (
      <KContainer.View marginL={'0.25rem'}>{rightNode(!!hasFocus)}</KContainer.View>
    ) : null;
  }, [rightNode, hasFocus]);

  const renderLeftNode = useMemo(() => {
    return searchIconLeftColor ? (
      <KContainer.View marginR={'0.75rem'}>
        <KImage.VectorIcons name="search-o" color={searchIconLeftColor} />
      </KContainer.View>
    ) : leftNode ? (
      <KContainer.View marginR={'0.75rem'}>{leftNode}</KContainer.View>
    ) : null;
  }, [leftNode, searchIconLeftColor]);

  return {
    backgroundColor: bg,
    combinedRef,
    innerValue,
    hasFocus,
    innerStyle,
    innerProps,
    mContainerStyle,
    containerHeight,
    hidden,
    renderEye,
    renderRightNode,
    renderLeftNode,
    renderClearButton,
    onPress: _onPress,
    onBlur: _onBlur,
    onFocus: _onFocus,
    onChangeText: _onChangeText,
    onSubmitEditing: _onSubmitEditing,
    keyboardType:
      inputType === 'phone' ? 'phone-pad' : inputType === 'email' ? 'email-address' : 'default',
    textContentType:
      inputType === 'phone'
        ? 'telephoneNumber'
        : inputType === 'email'
        ? 'emailAddress'
        : inputType === 'password'
        ? 'password'
        : inputType === 'username'
        ? 'username'
        : undefined,
    autoCapitalize:
      !inputType || !['email', 'username', 'password', 'phone'].includes(inputType)
        ? autoCapitalize
        : 'none',
  };
};

export default useInputOptions;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    height: 'auto',
    flex: 1,
  },
  input: {
    height: '100%',
    lineHeight: undefined,
  },
  clear: {
    marginLeft: KSpacingValue['0.5rem'],
  },
  disabled: {
    opacity: 0.5,
  },
});
