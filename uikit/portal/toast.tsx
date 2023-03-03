/* eslint-disable react-native/no-inline-styles */
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { get } from 'lodash';
import { KToastBarProps, WithToastProps } from '../../types';
import { KColors, KDims, Z_INDEX_PRIORITY } from '../../constants';
import KContainer from '../container';
import KButton from '../button';
import KImage from '../image';
import KLabel from '../label';

import { KSpacingValue } from '../../constants';

const KToastBar = forwardRef<WithToastProps>((_, ref) => {
  const [data, setData] = useState<KToastBarProps | undefined>(undefined);
  const scale = useSharedValue(1);
  const containerRef = useRef<Animated.View>() as React.MutableRefObject<Animated.View>;

  const timeout = useRef<any>();

  const dismiss = useCallback(() => {
    setData(undefined);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open: payload => {
        if (data) {
          scale.value = withSequence(withSpring(1.1, { mass: 0.3 }), withSpring(1, { mass: 0.3 }));
        }
        setData(payload);
      },
      dismiss,
    }),
    [dismiss, scale, data]
  );

  const {
    type = 'full-fill',
    theme = 'light',
    position = 'bottom',
    contentAlignment = 'center',
    textAlign = 'center',
    stretch,
    action,
    description,
    icon,
    showCloseButton,
    title,
    content,
    onPressContent,
    visibleTimeout = 3000,
    br = '2x',
  } = data || {};

  const colors = useMemo(() => {
    const themeColor =
      theme === 'light'
        ? 'rgba(61,63,64,0.96)'
        : get(KColors, `${theme}.normal`, KColors.primary.normal);

    return {
      backgroundColor:
        theme === 'light'
          ? themeColor
          : type === 'revert'
          ? KColors.white
          : type === 'full-fill'
          ? themeColor
          : get(KColors, `palette.${theme}.w50`, KColors.palette.primary.w50),
      borderColor: theme === 'light' || type !== 'revert' ? undefined : themeColor,
      tintColor:
        theme === 'light'
          ? KColors.border.normal
          : type === 'full-fill'
          ? KColors.white
          : themeColor,
      textColor:
        theme === 'light'
          ? KColors.border.normal
          : type === 'revert'
          ? KColors.gray.dark
          : type === 'full-fill'
          ? KColors.white
          : themeColor,
      closeIconColor:
        theme === 'light'
          ? KColors.border.normal
          : type === 'revert'
          ? KColors.gray.light
          : type === 'full-fill'
          ? KColors.white
          : themeColor,
      actionRevert: type === 'full-fill',
    };
  }, [type, theme]);

  useEffect(() => {
    if (data) {
      timeout.current = setTimeout(() => {
        dismiss();
      }, visibleTimeout);

      return () => {
        clearTimeout(timeout.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPressWrapper = useCallback(
    (onPress?: any) => {
      onPress?.();
      dismiss?.();
    },
    [dismiss]
  );

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressContentWrapper = useCallback(() => {
    onPressContent?.();
    dismiss();
  }, [onPressContent, dismiss]);

  if (!data) {
    return null;
  }

  const Wrapper = onPressContent ? KContainer.Touchable : KContainer.View;

  return (
    <Animated.View
      style={[styles.content, rStyle, position === 'top' ? styles.top : styles.bottom]}
      entering={position === 'top' ? FadeInUp : FadeInDown}
      exiting={position === 'top' ? FadeOutUp : FadeOutDown}
      ref={containerRef}
    >
      <Wrapper
        onPress={onPressContentWrapper}
        activeOpacity={0.9}
        style={[
          styles.innerContent,
          {
            backgroundColor: colors.backgroundColor,
            borderWidth: colors.borderColor ? 1 : 0,
            borderColor: colors.borderColor,
          },
        ]}
        padding="1rem"
        paddingH={stretch ? '1rem' : '2rem'}
        br={br}
        alignSelf={stretch ? 'stretch' : 'center'}
      >
        {icon && (
          <KContainer.View>
            <KImage.CommonIcon
              {...icon}
              size={!icon.size || icon.size > 32 ? 32 : icon.size < 16 ? 16 : icon.size}
              style={styles.leftIcon}
              tintColor={colors.tintColor}
            />
          </KContainer.View>
        )}
        <KContainer.View
          justifyContent
          alignItems={contentAlignment === 'center' ? 'center' : 'flex-start'}
          flex={stretch ? 1 : 0}
        >
          {!!title && (
            <KLabel.Text
              color={colors.textColor}
              typo="TextNmBold"
              textAlign={textAlign || 'center'}
            >
              {title}
            </KLabel.Text>
          )}
          {!!description && (
            <KLabel.Text
              color={colors.textColor}
              typo="TextSmNormal"
              textAlign={textAlign || 'center'}
              marginT="0.25rem"
            >
              {description}
            </KLabel.Text>
          )}
          {content}
        </KContainer.View>
        {action && (
          <KContainer.View style={styles.rightIcon}>
            <KButton.Solid
              kind={theme}
              // revert={colors.actionRevert}
              label={action.label}
              onPress={onPressWrapper.bind(null, action.onPress)}
            />
          </KContainer.View>
        )}
        {showCloseButton && (
          <KContainer.View style={styles.rightIcon}>
            <KButton.Close size={28} color={colors.closeIconColor} onPress={dismiss} />
          </KContainer.View>
        )}
      </Wrapper>
    </Animated.View>
  );
});

export default memo(KToastBar);

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: Z_INDEX_PRIORITY.toast,
    marginHorizontal: KSpacingValue['1rem'],
    backgroundColor: KColors.transparent,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftIcon: {
    marginRight: KSpacingValue['0.5rem'],
  },
  rightIcon: {
    marginLeft: KSpacingValue['0.5rem'],
  },
  bottom: {
    bottom: 70,
  },
  top: {
    top: KDims.topBarSafeHeight > 0 ? KDims.topBarSafeHeight : KSpacingValue['1rem'],
  },
});
