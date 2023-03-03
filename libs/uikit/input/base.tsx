import React, { ComponentType, forwardRef, memo } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { get } from 'lodash';
import { KInputProps } from '@uikit/types';
import useInputOptions, { styles } from './helper';
import KLabel from '../label';
import KContainer from '../container';
import { KColors } from '../../constants';

const Input = forwardRef<TextInput, KInputProps>((props, ref) => {
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
    paddingH,
    maxLength,
    containerStyle,
    hint,
    highlightOnValidate,
    testID,
  } = props;

  const {
    backgroundColor,
    combinedRef,
    containerHeight,
    hasFocus,
    innerProps,
    innerStyle,
    innerValue,
    mContainerStyle,
    hidden,
    renderEye,
    renderRightNode,
    autoCapitalize,
    keyboardType,
    textContentType,
    renderLeftNode,
    renderClearButton,
    onBlur,
    onChangeText,
    onFocus,
    onPress,
    onSubmitEditing,
  } = useInputOptions(props, ref);

  const msgColor = message
    ? get(KColors, `${messageStatus}.normal`, KColors.danger.normal)
    : KColors.gray.light;

  return (
    <KContainer.View style={[mContainerStyle, containerStyle]}>
      <KContainer.View
        style={[styles.container, disabled && styles.disabled]}
        height={containerHeight}
        paddingH={paddingH}
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
        brC={highlightOnValidate ? msgColor : hasFocus ? KColors.primary.normal : brC}
        background={backgroundColor}
      >
        {renderLeftNode}
        <KContainer.View flex>
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
            style={innerStyle}
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
            testID={testID}
          />
        </KContainer.View>
        {renderClearButton()}
        {renderRightNode}
        {renderEye}
      </KContainer.View>

      <KContainer.Collapsible collapsed={!message && !hint}>
        <KLabel.Text typo="TextXsNormal" color={msgColor} marginT="0.5rem">
          {(message as string) ?? hint}
        </KLabel.Text>
      </KContainer.Collapsible>
    </KContainer.View>
  );
});

(Input as ComponentType<KInputProps>).defaultProps = {
  size: 'medium',
  placeholderTextColor: KColors.palette.gray.w200,
  underlineColorAndroid: KColors.transparent,
};

export default memo(Input);
