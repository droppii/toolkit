import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { BackHandler, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { isEmpty } from 'lodash';
import { KActionSheetProps, WithActionSheetProps } from '../../types';
import usePredefinedAnimations from '../../hooks/usePredefinedAnimations';
import { KContainer, KLabel } from '..';
import { KColors, Z_INDEX_PRIORITY } from '../../constants';
import { KRadiusValue, KSpacingValue } from '../../constants';

interface Item {
  label: string;
  isCancel: boolean;
  trueIndex: number;
}

const ActionSheet = forwardRef<WithActionSheetProps>((_, ref) => {
  const [data, setData] = useState<KActionSheetProps | undefined>();

  const { displayed, entering, exiting } = usePredefinedAnimations(
    SlideInDown.duration(400),
    SlideOutDown.duration(400)
  );

  const dismiss = useCallback(() => {
    if (displayed) {
      setData(undefined);
    }
  }, [displayed]);

  useImperativeHandle(
    ref,
    () => ({
      open: payload => {
        if (!data && payload?.options?.length > 0) {
          setData(payload);
        }
      },
      dismiss,
    }),
    [dismiss, data]
  );

  useEffect(() => {
    if (data && Platform.OS === 'android') {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        setData(undefined);
        return true;
      });

      return () => {
        sub.remove();
      };
    }
  }, [data]);

  const { options = [], cancelButtonIndex, destructiveButtonIndex, title, callback } = data || {};

  const mData = useMemo(() => {
    const results = [[], []] as Item[][];

    options.forEach((i, index) => {
      if (index === cancelButtonIndex) {
        results[1] = [{ label: i, isCancel: true, trueIndex: index }];
      } else {
        results[0].push({ label: i, isCancel: false, trueIndex: index });
      }
    });
    return results;
  }, [cancelButtonIndex, options]);

  const onItemPress = useCallback(
    (i?: Item) => {
      i && callback?.(i.trueIndex);
      setData(undefined);
    },
    [callback]
  );

  const renderContent = useMemo(() => {
    return (
      <KContainer.View br={'4x'} hiddenOverflow>
        {!!title && (
          <KContainer.View style={styles.title}>
            <KLabel.Text textAlign typo={'TextSmMedium'} color={KColors.gray.normal}>
              {title}
            </KLabel.Text>
          </KContainer.View>
        )}
        {mData.map((arr, index) => {
          if (index === 0) {
            return arr.map((i, nIndex) => {
              return (
                <KContainer.Touchable
                  key={`${i}-${nIndex}`}
                  activeOpacity={0.8}
                  onPress={onItemPress.bind(null, i)}
                  style={[nIndex === arr.length - 1 && styles.itemBottom]}
                  background={KColors.palette.gray.w25}
                  center
                  padding="1rem"
                  brW={1}
                  brC={KColors.border.normal}
                >
                  <KLabel.Text
                    typo="TextMdMedium"
                    testID="test"
                    color={
                      destructiveButtonIndex === i.trueIndex
                        ? KColors.danger.dark
                        : KColors.primary.dark
                    }
                    numberOfLines={1}
                  >
                    {i.label}
                  </KLabel.Text>
                </KContainer.Touchable>
              );
            });
          } else if (!isEmpty(arr)) {
            return (
              <KContainer.Touchable
                activeOpacity={0.9}
                key={'cancel'}
                onPress={dismiss}
                center
                padding="1rem"
                marginT={'0.5rem'}
                background={KColors.white}
                br="4x"
              >
                <KLabel.Text typo="TextMdBold" color={KColors.primary.dark} numberOfLines={1}>
                  {arr[0]?.label}
                </KLabel.Text>
              </KContainer.Touchable>
            );
          }
        })}
      </KContainer.View>
    );
  }, [dismiss, onItemPress, title, mData, destructiveButtonIndex]);

  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <Animated.View
        style={styles.container}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
      >
        <KContainer.View flex />
        <TouchableWithoutFeedback onPress={stopPropagation}>
          <KContainer.View style={styles.body}>
            <Animated.View style={styles.wrapper} entering={entering} exiting={exiting}>
              {renderContent}
            </Animated.View>
          </KContainer.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

export default ActionSheet;

const styles = StyleSheet.create({
  container: {
    // @ts-ignore
    ...StyleSheet.absoluteFill,
    zIndex: Z_INDEX_PRIORITY.actionSheet,
    backgroundColor: KColors.overlay,
    paddingHorizontal: KSpacingValue['1rem'],
  },
  wrapper: {
    justifyContent: 'flex-end',
  },
  body: {
    paddingBottom: KSpacingValue['1rem'],
  },
  title: {
    padding: KSpacingValue['1rem'],
    backgroundColor: KColors.palette.gray.w25,
    borderBottomWidth: 1,
    borderColor: KColors.border.normal,
  },
  itemBottom: {
    borderBottomLeftRadius: KRadiusValue['4x'],
    borderBottomRightRadius: KRadiusValue['4x'],
    borderBottomWidth: 0,
  },
});
