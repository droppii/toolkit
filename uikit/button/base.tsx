import React, { ComponentType, memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import { debounce, set } from 'lodash';
import { KButtonBaseProps, KButtonProps, KSpacing, TypographyModifier } from '../../types';
import KImage from '../image';
import { KRadiusValue, KSpacingValue, TypoHelper } from '../../constants';
import { KColors } from '../../constants';
import KContainer from '../container';
import KLabel from '../label';

const KButtonBase = (props: KButtonBaseProps) => {
  const {
    icon,
    iconAlignment = 'left',
    margin,
    marginB,
    marginH,
    marginL,
    marginR,
    marginT,
    marginV,
    br = '2x',
    testID,
    label,
    weight = 'medium',
    size,
    disabled,
    loading,
    stretch,
    background,
    tintColor,
    isLink,
    enhanceStyle = {},
    brW = 0,
    brC,
    onPress,
    onLongPress,
  } = props;

  const {
    height,
    icon: iconSize,
    spacing,
    text,
  } = useMemo(() => {
    switch (size) {
      case 'xlg':
        return {
          height: 56,
          icon: 22,
          text: 'TextXLg',
          spacing: '0.75rem',
        };
      case 'lg':
        return {
          height: 48,
          icon: 20,
          text: 'TextLg',
          spacing: '0.75rem',
        };
      case 'nm':
        return {
          height: 40,
          icon: 18,
          text: 'TextNm',
          spacing: '0.75rem',
        };
      case 'sm':
        return {
          height: 32,
          icon: 16,
          text: 'TextSm',
          spacing: '0.75rem',
        };
      case 'xs':
        return {
          height: 28,
          icon: 14,
          text: 'TextXs',
          spacing: '0.75rem',
        };
      default:
        return {
          height: 40,
          icon: 18,
          text: 'TextMd',
          spacing: '0.75rem',
        };
    }
  }, [size]);

  // @ts-ignore
  const mgDefault = useMemo(() => KSpacingValue[spacing], [spacing]);

  const textTypo = useMemo(() => {
    const postfix = weight === 'bold' ? 'Bold' : weight === 'normal' ? 'Normal' : 'Medium';
    return `${text}${postfix}` as TypographyModifier;
  }, [weight, text]);

  const commonStyle = useMemo(() => {
    const result = { backgroundColor: background };
    if (!TypoHelper.isNullOrUndefined(margin)) {
      set(result, 'margin', TypoHelper.mapKSpacingToNumber(margin));
    }
    if (!TypoHelper.isNullOrUndefined(marginH)) {
      set(result, 'marginHorizontal', TypoHelper.mapKSpacingToNumber(marginH));
    }
    if (!TypoHelper.isNullOrUndefined(marginV)) {
      set(result, 'marginVertical', TypoHelper.mapKSpacingToNumber(marginV));
    }
    if (!TypoHelper.isNullOrUndefined(marginB)) {
      set(result, 'marginBottom', TypoHelper.mapKSpacingToNumber(marginB));
    }
    if (!TypoHelper.isNullOrUndefined(marginT)) {
      set(result, 'marginTop', TypoHelper.mapKSpacingToNumber(marginT));
    }
    if (!TypoHelper.isNullOrUndefined(marginL)) {
      set(result, 'marginLeft', TypoHelper.mapKSpacingToNumber(marginL));
    }
    if (!TypoHelper.isNullOrUndefined(marginR)) {
      set(result, 'marginRight', TypoHelper.mapKSpacingToNumber(marginR));
    }
    set(result, 'opacity', disabled ? 0.5 : 1);
    set(
      result,
      'alignSelf',
      stretch === 'left'
        ? 'flex-start'
        : stretch === 'right'
        ? 'flex-end'
        : stretch
        ? 'stretch'
        : 'center'
    );

    return result;
  }, [margin, marginB, marginH, marginL, marginR, marginT, marginV, background, disabled, stretch]);

  const styledButton: ViewStyle = useMemo(() => {
    const clone = { ...commonStyle };
    if (isLink) {
      return clone;
    }
    set(clone, 'height', height);

    if (!label) {
      set(clone, 'width', height);
    } else {
      set(clone, 'minWidth', height);
    }

    if (brW) {
      set(clone, 'borderColor', brC || tintColor);
      set(clone, 'borderWidth', brW);
    }

    set(clone, 'borderRadius', KRadiusValue[br]);

    set(clone, 'paddingHorizontal', TypoHelper.mapKSpacingToNumber(spacing as KSpacing));

    return clone;
  }, [commonStyle, brW, isLink, height, br, spacing, tintColor, label, brC]);

  const baseIconStyle = useMemo(() => {
    return {
      width: iconSize,
      height: iconSize,
      resizeMode: 'contain',
      tintColor,
      flexBasis: iconSize,
      flexShrink: 0,
    };
  }, [iconSize, tintColor]);

  const renderIcon = useMemo(() => {
    const style = { ...baseIconStyle };
    if (label) {
      if (iconAlignment === 'left') {
        set(style, 'marginRight', mgDefault);
      } else if (iconAlignment === 'right') {
        set(style, 'marginLeft', mgDefault);
      }
    }

    if (loading) {
      if (icon) {
        return <ActivityIndicator color={icon.tintColor || tintColor} style={style} />;
      }
      return null;
    }

    if (!icon) {
      return null;
    }

    return (
      <KImage.CommonIcon
        {...icon}
        tintColor={icon.tintColor || tintColor}
        size={iconSize}
        style={style}
      />
    );
  }, [icon, tintColor, loading, iconSize, baseIconStyle, iconAlignment, mgDefault, label]);

  const onPressWrapper = useCallback(() => {
    if (!loading) {
      onPress?.();
    }
  }, [onPress, loading]);

  const onLongPressWrapper = useCallback(() => {
    if (!loading) {
      onLongPress?.();
    }
  }, [onLongPress, loading]);

  const loadingWithoutIcon = useMemo(() => !icon && loading, [icon, loading]);

  return (
    <KContainer.Touchable
      onPress={debounce(onPressWrapper, 300, { leading: true, trailing: false })}
      onLongPress={onLongPressWrapper}
      testID={testID}
      disabled={disabled}
      style={[styles.row, styledButton, enhanceStyle]}
    >
      {loadingWithoutIcon && (
        <KContainer.View style={styles.abs}>
          <ActivityIndicator color={tintColor} style={baseIconStyle} />
        </KContainer.View>
      )}

      {iconAlignment === 'left' && renderIcon}
      <KLabel.Text
        typo={textTypo}
        color={loadingWithoutIcon ? KColors.transparent : tintColor}
        numberOfLines={1}
        flexS={1}
      >
        {label}
      </KLabel.Text>
      {iconAlignment === 'right' && renderIcon}
    </KContainer.Touchable>
  );
};

const KButtonBaseWithErrorBoundary = withErrorBoundary(KButtonBase, {
  FallbackComponent: () => null,
  onError() {},
});

(KButtonBaseWithErrorBoundary as ComponentType<KButtonProps>).defaultProps = {};

(KButtonBaseWithErrorBoundary as ComponentType<KButtonProps>).displayName = 'KButtonBase';

const KButtonTransparent = memo((props: KButtonProps) => {
  const { kind = 'primary' } = props;

  const tintColor = useMemo(() => {
    return kind === 'light' ? KColors.gray.dark : KColors[kind]?.normal;
  }, [kind]);

  return (
    <KButtonBase {...props} background={KColors.transparent} tintColor={tintColor} isLink={false} />
  );
});

const KButtonSolid = memo((props: KButtonProps) => {
  const { kind = 'primary', revert } = props;

  const backgroundColor = useMemo(() => {
    return kind === 'light' ? KColors.palette.gray.w25 : KColors[kind]?.normal;
  }, [kind]);

  const tintColor = useMemo(() => {
    return kind === 'light' ? KColors.gray.dark : KColors.white;
  }, [kind]);

  return (
    <KButtonBase
      {...props}
      background={revert ? tintColor : backgroundColor}
      tintColor={revert ? backgroundColor : tintColor}
      isLink={false}
    />
  );
});

const KButtonOutline = memo((props: KButtonProps & { background?: string }) => {
  const { kind = 'primary', thickness = 'thin', background = KColors.transparent } = props;

  const tintColor = useMemo(() => {
    return kind === 'light' ? KColors.gray.dark : KColors[kind]?.normal;
  }, [kind]);

  return (
    <KButtonBase
      {...props}
      background={background}
      tintColor={tintColor}
      brW={thickness === 'thin' ? 1 : 2}
      isLink={false}
    />
  );
});

const KButtonLink = memo((props: KButtonProps) => {
  const { kind = 'primary' } = props;

  const tintColor = useMemo(() => {
    return kind === 'light' ? KColors.gray.dark : KColors[kind]?.normal;
  }, [kind]);

  return (
    <KButtonBase
      {...props}
      // icon={{
      //   vectorName: '',
      //   imageSource: undefined,
      // }}
      label={props.label || '---'}
      background={KColors.transparent}
      tintColor={tintColor}
      isLink
    />
  );
});

export { KButtonBase, KButtonSolid, KButtonTransparent, KButtonOutline, KButtonLink };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  abs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
