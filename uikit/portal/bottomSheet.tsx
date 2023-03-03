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
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { isEmpty, set } from 'lodash';
import { KBottomSheetProps, WithBottomSheetProps } from '../../types';
import KContainer from '../container';
import KBars from '../bars';
import KLabel from '../label';
import { KRadiusValue, KSpacingValue } from '../../constants';
import { KColors, KDims } from '../../constants';
import KButton from '../button';

const UNIT = KSpacingValue['1rem'];

const KBottomSheet = forwardRef<WithBottomSheetProps>((_, ref) => {
  const [data, setData] = useState<KBottomSheetProps | undefined>(undefined);

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const displayed = useRef(false);

  const { animatedSnapPoints, animatedContentHeight, animatedHandleHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const dismiss = useCallback(() => {
    setData(undefined);
  }, []);

  const onBackdropPress = useCallback(() => {}, []);

  const renderBackdrop = useCallback(
    (p: any) => (
      <BottomSheetBackdrop
        {...p}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onBackdropPress}
      />
    ),
    [onBackdropPress]
  );

  useImperativeHandle(
    ref,
    () => ({
      open: payload => {
        if (!data) {
          setData(payload);
        }
      },
      dismiss,
    }),
    [dismiss, data]
  );

  useEffect(() => {
    if (data) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [data]);

  const onPressWrapper = useCallback(
    (callback: any) => {
      dismiss();
      callback?.();
    },
    [dismiss]
  );

  const renderHeader = useMemo(() => {
    if (!data?.header) {
      return null;
    }
    const {
      header: { showCloseButton, subTitle, title, alignment },
    } = data;

    return (
      <KContainer.View padding="1rem" row alignItems brBW={1} brBC={KColors.border.light}>
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
  }, [data, dismiss]);

  const renderActions = useMemo(() => {
    if (!data || !data.actions || isEmpty(data.actions.buttons)) {
      return null;
    }
    const mActions = data.actions;
    mActions.buttons = mActions.buttons.map(i => {
      const clone = { ...i };
      delete clone.onPress;
      set(clone, 'onPress', () => onPressWrapper(() => i.onPress?.()));
      return clone;
    });
    return (
      <KContainer.View paddingH="1rem" brTW={1} brTC={KColors.border.light}>
        <KBars.ActionBar {...mActions} type="horizontal-button" />
      </KContainer.View>
    );
  }, [data, onPressWrapper]);

  const renderBody = useMemo(() => {
    if (!data) {
      return null;
    }

    const message = data?.body?.message;
    const renderContent = data?.body?.renderContent;

    return (
      <>
        {message ? (
          <KContainer.View padding={'1rem'} background={KColors.white}>
            <KLabel.Text typo={message.typo} color={message.color}>
              {message.text}
            </KLabel.Text>
          </KContainer.View>
        ) : (
          renderContent?.(dismiss) ?? null
        )}
      </>
    );
  }, [data, dismiss]);

  const onChange = useCallback(
    (index: number) => (displayed.current = index === -1 ? false : true),
    []
  );

  const onDismiss = useCallback(() => {
    data?.onDismiss?.();
    dismiss();
  }, [dismiss, data]);

  if (!data) {
    return null;
  }

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      handleComponent={null}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}
      backgroundStyle={styles.sheetBackground}
      bottomInset={KDims.bottomSafeHeight > 0 ? UNIT * 1.5 : UNIT}
      containerStyle={styles.sheetContainer}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onChange={onChange}
    >
      <BottomSheetView style={styles.sheetView} onLayout={handleContentLayout}>
        {renderHeader}
        <KContainer.ScrollView
          isGestureScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderBody}
        </KContainer.ScrollView>
        {renderActions}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default memo(KBottomSheet);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: KColors.transparent,
  },
  sheetContainer: {
    borderRadius: KRadiusValue['4x'],
    overflow: 'hidden',
    paddingBottom: KDims.height,
  },
  sheetView: {
    marginHorizontal: UNIT,
    maxHeight: KDims.height * 0.9,
    borderRadius: KRadiusValue['4x'],
    overflow: 'hidden',
    backgroundColor: KColors.white,
    marginBottom: UNIT,
  },
});
