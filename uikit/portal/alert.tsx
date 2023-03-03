import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  memo,
} from 'react';
import { BackHandler, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  FadeIn,
  FadeOut,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import { set, last, isEqual } from 'lodash';
import { KAlertProps, WithAlertDialogProps } from '../../types';
import usePredefinedAnimations from '../../hooks/usePredefinedAnimations';
import KContainer from '../container';
import KBars from '../bars';
import KLabel from '../label';

import { KColors, KDims, Z_INDEX_PRIORITY } from '../../constants';
import { KRadiusValue, KSpacingValue } from '../../constants';

const KAlert = forwardRef<WithAlertDialogProps>((_, ref) => {
  const queue = useRef<KAlertProps[]>([]);
  const [data, setData] = useState<KAlertProps | undefined>(undefined);
  const scale = useSharedValue(1);
  const { displayed, entering, exiting } = usePredefinedAnimations(FadeInUp, FadeOutUp);
  const {
    touchOutsideToDismiss = true,
    titleAlignment,
    message,
    messageColor,
    messageTypo = 'TextNmNormal',
    title,
    titleColor,
    titleTypo = 'TextMdBold',
  } = data || {};

  const dismiss = useCallback(() => {
    if (displayed) {
      const newPayload = queue.current.shift();
      if (newPayload) {
        scale.value = withSequence(withSpring(0.9, { mass: 0.3 }), withSpring(1, { mass: 0.3 }));
      }
      setData(newPayload);
    }
  }, [scale, displayed]);

  useImperativeHandle(
    ref,
    () => ({
      open: payload => {
        if (!isEqual(last(queue.current), payload)) {
          if (data) {
            scale.value = withSequence(
              withSpring(1.1, { mass: 0.3 }),
              withSpring(1, { mass: 0.3 })
            );
            queue.current?.push(payload);
          } else {
            setData(payload);
          }
        }
      },
      dismiss,
      dismissAll: () => {
        setData(undefined);
        queue.current = [];
      },
    }),
    [dismiss, scale, data]
  );

  useEffect(() => {
    if (data && Platform.OS === 'android') {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (touchOutsideToDismiss) {
          dismiss();
          return true;
        }
        return false;
      });

      return () => {
        sub.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, touchOutsideToDismiss]);

  const onPressWrapper = useCallback(
    (onPress: any) => {
      onPress?.();
      dismiss();
    },
    [dismiss]
  );

  const renderHeader = useMemo(() => {
    if (!data) {
      return null;
    }

    return (
      <KContainer.View
        brBW={1}
        brBC={KColors.border.light}
        padding="1rem"
        alignItems={titleAlignment === 'left' ? 'flex-start' : 'center'}
      >
        <KLabel.Text
          typo={titleTypo || 'TextLgBold'}
          color={titleColor}
          numberOfLines={2}
          textAlign
        >
          {title}
        </KLabel.Text>
      </KContainer.View>
    );
  }, [data, title, titleAlignment, titleColor, titleTypo]);

  const renderActions = useMemo(() => {
    if (!data) {
      return null;
    }
    const { buttons, vertical, destructiveIndex, primaryIndex } = data;
    const isButtonEmpty = !buttons || buttons?.length === 0;
    let mButtons = isButtonEmpty
      ? [
          {
            label: 'OK',
            color: KColors.primary.normal,
            weight: 'bold',
          },
        ]
      : buttons;

    mButtons = mButtons.map((i: any) => {
      const clone = { ...i };
      delete clone.onPress;
      set(clone, 'onPress', () => onPressWrapper(() => i.onPress?.()));
      return clone;
    });

    return (
      <KContainer.View brTW={1} brTC={KColors.border.light}>
        <KBars.ActionBar
          buttons={mButtons}
          destructiveIndex={destructiveIndex}
          primaryIndex={isButtonEmpty ? 0 : primaryIndex}
          type={vertical ? 'vertical-link' : 'horizontal-menu'}
        />
      </KContainer.View>
    );
  }, [data, onPressWrapper]);

  const onStartShouldSetResponder = useCallback(() => true, []);

  const renderBody = useMemo(() => {
    if (!data) {
      return null;
    }
    return (
      <KContainer.ScrollView isGestureScrollView>
        <KContainer.View onStartShouldSetResponder={onStartShouldSetResponder}>
          {typeof message === 'string' ? (
            <KContainer.View padding={'1rem'}>
              <KLabel.Text textAlign={titleAlignment} typo={messageTypo} color={messageColor}>
                {message}
              </KLabel.Text>
            </KContainer.View>
          ) : (
            message?.(dismiss)
          )}
        </KContainer.View>
      </KContainer.ScrollView>
    );
  }, [
    data,
    onStartShouldSetResponder,
    message,
    titleAlignment,
    messageTypo,
    messageColor,
    dismiss,
  ]);

  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!data) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={touchOutsideToDismiss ? dismiss : undefined}>
      <Animated.View style={styles.wrapper} entering={FadeIn} exiting={FadeOut}>
        <TouchableWithoutFeedback onPress={stopPropagation}>
          <Animated.View entering={entering} exiting={exiting} style={[styles.content, rStyle]}>
            {renderHeader}
            {renderBody}
            {renderActions}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

export default memo(KAlert);

const styles = StyleSheet.create({
  wrapper: {
    // @ts-ignore
    ...StyleSheet.absoluteFill,
    zIndex: Z_INDEX_PRIORITY.alert,
    backgroundColor: KColors.overlay,
    paddingHorizontal: KSpacingValue['2rem'],
    paddingVertical: KSpacingValue['4rem'],
    justifyContent: 'center',
  },
  content: {
    backgroundColor: KColors.white,
    borderRadius: KRadiusValue['4x'],
    overflow: 'hidden',
    maxHeight: KDims.height * 0.8,
  },
});
