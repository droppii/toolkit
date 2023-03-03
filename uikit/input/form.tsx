import React, { ComponentType, forwardRef, memo, useMemo } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import { get } from 'lodash';
import useInputOptions, { styles } from './helper';
import { KInputProps } from '../../types';
import KLabel from '../label';
import KContainer from '../container';
import { KColors } from '../../constants';

export interface InputProps
  extends Omit<KInputProps, 'hint' | 'radius' | 'border' | 'rightComponent' | 'paddingH'> {
  border?: boolean;
  label: string;
  breakline?: boolean;
  description?: string;
}

const InputForm = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    returnKeyType,
    returnKeyLabel,
    nextRef,
    inputType,
    blurOnSubmit = true,
    border,
    messageStatus,
    message,
    disabled,
    maxLength,
    containerStyle,
    brC,
    background = KColors.white,
    label,
    description,
    breakline,
    testID,
  } = props;

  const {
    hasFocus,
    combinedRef,
    innerProps,
    innerStyle,
    innerValue,
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
  } = useInputOptions(props as any, ref);

  const renderInput = useMemo(() => {
    return (
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
        style={[innerStyle, styles.flex]}
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
    );
  }, [
    autoCapitalize,
    blurOnSubmit,
    combinedRef,
    disabled,
    hidden,
    innerProps,
    innerStyle,
    innerValue,
    inputType,
    keyboardType,
    maxLength,
    nextRef,
    onBlur,
    onChangeText,
    onFocus,
    onPress,
    onSubmitEditing,
    props.onPress,
    returnKeyLabel,
    returnKeyType,
    textContentType,
    testID,
  ]);

  const renderBreakline = useMemo(() => {
    return (
      <KContainer.View flex>
        <KContainer.View row alignItems>
          <KLabel.Text typo="TextNmBold" flex={4}>
            {label}
          </KLabel.Text>
          {description && (
            <KLabel.Text marginL={'0.5rem'} flex={6}>
              {description}
            </KLabel.Text>
          )}
        </KContainer.View>
        <KContainer.View marginT={'0.75rem'} row alignItems>
          {renderInput}
          {renderClearButton(true)}
        </KContainer.View>
      </KContainer.View>
    );
  }, [description, label, renderInput, renderClearButton]);

  const renderInline = useMemo(() => {
    return (
      <KContainer.View flex row>
        <KContainer.View flex={4}>
          <KLabel.Text typo="TextNmBold" flex={4} alignItems>
            {label}
          </KLabel.Text>
          {description && (
            <KLabel.Text marginT={'0.5rem'} flex={6}>
              {description}
            </KLabel.Text>
          )}
        </KContainer.View>
        <KContainer.View flex={6} marginL={'0.5rem'} row alignItems>
          {renderInput}
          {renderClearButton(true)}
        </KContainer.View>
      </KContainer.View>
    );
  }, [description, label, renderInput, renderClearButton]);

  return (
    <KContainer.View style={containerStyle} paddingH="1rem" background={background}>
      <KContainer.View
        style={[styles.container, disabled && styles.disabled]}
        brBW={hasFocus || border ? 1 : 0}
        brBC={hasFocus ? KColors.palette.primary.w50 : brC ?? KColors.border.normal}
        paddingV="1rem"
      >
        {renderLeftNode}
        {breakline ? renderBreakline : renderInline}
        {renderRightNode}
        {renderEye}
      </KContainer.View>

      <KContainer.Collapsible collapsed={!message}>
        <KLabel.Text
          typo="TextXsNormal"
          color={
            message
              ? get(KColors, `${messageStatus}.normal`, KColors.danger.normal)
              : KColors.gray.light
          }
          marginT="0.5rem"
        >
          {(message as string) ?? ''}
        </KLabel.Text>
      </KContainer.Collapsible>
    </KContainer.View>
  );
});

(InputForm as ComponentType<InputProps>).defaultProps = {
  size: 'medium',
  placeholderTextColor: KColors.palette.gray.w200,
  underlineColorAndroid: KColors.transparent,
};

export default memo(InputForm);
