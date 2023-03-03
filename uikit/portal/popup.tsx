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
import {
  BackHandler,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  KeyboardAvoidingView,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { isEmpty, isEqual, last, set } from 'lodash';
import { KPopupProps, WithPopupProps } from '../../types';
import { KRadiusValue, KSpacingValue } from '../../constants';
import { KColors, KDims, Z_INDEX_PRIORITY } from '../../constants';
import usePredefinedAnimations from '../../hooks/usePredefinedAnimations';
import KContainer from '../container';
import KLabel from '../label';
import KBars from '../bars';
import KButton from '../button';

const UNIT = KSpacingValue['1rem'];
const STATUS_BAR_HEIGHT = KDims.os === 'ios' ? 0 : StatusBar.currentHeight || 0;
const VIEWABLE_HEIGHT =
  KDims.os === 'ios'
    ? Dimensions.get('screen').height
    : Dimensions.get('window').height - STATUS_BAR_HEIGHT; // ignore statusBar area & soft navigation bar height

const PADDING_VERTICAL = KDims.isIphoneX ? UNIT * 3 : UNIT * 2.25;
const PADDING_HORIZONTAL = UNIT;
const CONTENT_MAX_HEIGHT = VIEWABLE_HEIGHT - 2 * PADDING_VERTICAL;

const KDialog = forwardRef<WithPopupProps>((_, ref) => {
  const queue = useRef<KPopupProps[]>([]);
  const [data, setData] = useState<KPopupProps | undefined>(undefined);
  const { displayed, entering, exiting } = usePredefinedAnimations(FadeInUp, FadeOutDown);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [actionsHeight, setActionsHeight] = useState(0);
  const scale = useSharedValue(1);

  const { touchOutsideToDismiss = true, position, header, actions } = data || {};

  const { showCloseButton, subTitle, title, alignment } = header || {};

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
    if (data && KDims.os === 'android') {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (touchOutsideToDismiss) {
          dismiss?.();
          return true;
        }
        return false;
      });

      return () => {
        sub.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPressWrapper = useCallback(
    (onPress: any) => {
      onPress?.();
      dismiss();
    },
    [dismiss]
  );

  const onHeaderLayout = useCallback(
    (e: LayoutChangeEvent) => setHeaderHeight(e.nativeEvent.layout.height),
    []
  );

  const renderHeader = useMemo(() => {
    if (!data || isEmpty(data.header)) {
      setHeaderHeight(0);
      return null;
    }

    return (
      <KContainer.View style={styles.header} onLayout={onHeaderLayout} padding="1rem">
        <KContainer.View
          alignItems={alignment === 'left' ? 'flex-start' : 'center'}
          flex
          justifyContent
        >
          {!!title && (
            <KLabel.Text
              typo={title.typo || 'TextLgBold'}
              color={title.color}
              numberOfLines={2}
              textAlign="left"
            >
              {title.text}
            </KLabel.Text>
          )}
          {!!subTitle && (
            <KLabel.Text
              typo={subTitle.typo || 'TextSmNormal'}
              color={subTitle.color || KColors.gray.light}
              numberOfLines={2}
              marginT="0.25rem"
            >
              {subTitle.text}
            </KLabel.Text>
          )}
        </KContainer.View>
        {showCloseButton && (
          <KContainer.View marginL={'1rem'}>
            <KButton.Close onPress={dismiss} />
          </KContainer.View>
        )}
      </KContainer.View>
    );
  }, [alignment, data, dismiss, onHeaderLayout, showCloseButton, subTitle, title]);

  const onActionsLayout = useCallback(
    (e: LayoutChangeEvent) => setActionsHeight(e.nativeEvent.layout.height),
    []
  );

  const renderActions = useMemo(() => {
    if (!actions?.buttons) {
      setActionsHeight(0);
      return null;
    }

    actions.buttons = actions.buttons.map((i: any) => {
      const clone = { ...i };
      delete clone.onPress;
      set(clone, 'onPress', () => onPressWrapper(() => i.onPress?.()));
      return clone;
    });
    return (
      <KContainer.View paddingH="1rem" onLayout={onActionsLayout} style={styles.actions}>
        <KBars.ActionBar {...(actions as any)} />
      </KContainer.View>
    );
  }, [actions, onPressWrapper, onActionsLayout]);

  const renderBody = useMemo(() => {
    if (!data || !data.body) {
      return null;
    }

    const {
      body: { message, renderContent },
    } = data;

    const maxHeight = { maxHeight: CONTENT_MAX_HEIGHT - headerHeight - actionsHeight - 16 };

    return (
      <KContainer.View style={[maxHeight]}>
        {message ? (
          <KContainer.View padding={'1rem'}>
            <KLabel.Text typo={message.typo} color={message.color} textAlign>
              {message.text}
            </KLabel.Text>
          </KContainer.View>
        ) : (
          renderContent?.(dismiss) ?? null
        )}
      </KContainer.View>
    );
  }, [data, headerHeight, actionsHeight, dismiss]);

  console.log('dads', touchOutsideToDismiss);

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
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        styles.wrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        { justifyContent: position === 'top' ? 'flex-start' : 'center' },
      ]}
    >
      <TouchableWithoutFeedback onPress={touchOutsideToDismiss ? dismiss : undefined}>
        <KeyboardAvoidingView behavior="position" style={styles.avoiding}>
          <TouchableWithoutFeedback onPress={stopPropagation}>
            <Animated.View entering={entering} exiting={exiting} style={[styles.content, rStyle]}>
              {renderHeader}
              {renderBody}
              {renderActions}
            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
});

export default memo(KDialog);

const styles = StyleSheet.create({
  wrapper: {
    // @ts-ignore
    ...StyleSheet.absoluteFill,
    zIndex: Z_INDEX_PRIORITY.popup,
    backgroundColor: KColors.overlay,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTICAL,
  },
  avoiding: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    maxHeight: CONTENT_MAX_HEIGHT,
    overflow: 'hidden',
    borderRadius: KRadiusValue['4x'],
    backgroundColor: KColors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: KColors.border.light,
    overflow: 'hidden',
  },
  actions: {
    borderTopWidth: 1,
    borderColor: KColors.border.light,
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsVertical: {
    flexDirection: 'column',
  },
  actionsHorizontal: {
    flexDirection: 'row',
  },
  itemWrapperLastHorizontal: {
    marginRight: 0,
  },
  verticalItem: {
    borderBottomWidth: 1,
    borderColor: KColors.border.light,
  },
  verticalLastItem: {
    borderBottomWidth: 0,
  },
  horizontalItem: {
    borderRightWidth: 1,
    borderColor: KColors.border.light,
  },
  horizontalLastItem: {
    borderRightWidth: 0,
  },
});
