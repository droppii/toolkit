import React, { ComponentType, forwardRef, memo } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { get } from 'lodash';
import useInputOptions, { styles } from './helper';
import { KInputProps } from '../../types';
import KLabel from '../label';
import KContainer from '../container';
import { KColors } from '../../constants';

const TextArea = forwardRef<TextInput, KInputProps>((props, ref) => {
  const {
    returnKeyType,
    returnKeyLabel,
    nextRef,
    inputType,
    blurOnSubmit = true,
    border,
    radius,
    messageStatus,
    message,
    disabled,
    brC,
    maxLength,
    containerStyle,
    hint,
    style,
    testID,
  } = props;

  const {
    backgroundColor,
    combinedRef,
    hasFocus,
    innerProps,
    innerValue,
    mContainerStyle,
    hidden,
    autoCapitalize,
    keyboardType,
    textContentType,
    onBlur,
    onChangeText,
    onFocus,
    onPress,
    onSubmitEditing,
  } = useInputOptions(props, ref);

  return (
    <KContainer.View style={[mContainerStyle, containerStyle]}>
      <KContainer.View
        style={[styles.container, disabled && styles.disabled]}
        br={
          border === 'bottom'
            ? undefined
            : radius === 'round'
            ? 'round'
            : radius === 'borderless'
            ? '2x'
            : undefined
        }
        brBW={border === 'entire' ? 1 : border === 'bottom' ? 1.5 : undefined}
        brW={border === 'entire' ? 1 : undefined}
        brC={hasFocus ? KColors.primary.normal : brC}
        background={backgroundColor}
        paddingV={'0.75rem'}
        paddingH={'1rem'}
      >
        <TextInput
          {...innerProps}
          onPressOut={onPress}
          editable={!disabled && !props.onPress}
          autoFocus={false}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          value={innerValue}
          style={style}
          pointerEvents="auto"
          autoCorrect={false}
          ref={combinedRef}
          returnKeyType={nextRef?.current ? 'next' : returnKeyType}
          returnKeyLabel={returnKeyLabel}
          clearButtonMode={'never'}
          spellCheck={false}
          blurOnSubmit={blurOnSubmit}
          secureTextEntry={hidden}
          selectionColor={KColors.primary.normal}
          maxLength={inputType === 'phone' ? 15 : maxLength}
          keyboardType={keyboardType as KeyboardTypeOptions}
          textContentType={textContentType as any}
          autoCapitalize={autoCapitalize}
          multiline
          testID={testID}
        />
      </KContainer.View>

      <KContainer.Collapsible collapsed={!message && !hint}>
        <KLabel.Text
          typo="TextXsNormal"
          color={
            message
              ? get(KColors, `${messageStatus}.normal`, KColors.danger.normal)
              : KColors.gray.light
          }
          marginT="0.5rem"
        >
          {(message as string) ?? hint}
        </KLabel.Text>
      </KContainer.Collapsible>
    </KContainer.View>
  );
});

(TextArea as ComponentType<KInputProps>).defaultProps = {
  size: 'medium',
  placeholderTextColor: KColors.palette.gray.w200,
  underlineColorAndroid: KColors.transparent,
};

export default memo(TextArea);
