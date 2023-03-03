import React, {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  MutableRefObject,
  useMemo,
} from 'react';
import {
  BackHandler,
  StyleSheet,
  Platform,
  FlatList,
  ListRenderItemInfo,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import PhotoView from 'react-native-photo-view';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { IImage, ImageViewerParams, WithImageViewer } from '@uikit/types';
import { KRadiusValue, KSpacingValue } from '../../constants';
import { actionSheetRef, KColors, KDims, Z_INDEX_PRIORITY } from '../../constants';
import KImage from '../image';
import KContainer from '../container';
import KLabel from '../label';

interface Props {
  onDownload: (url: string) => void;
  downloading?: { [key: string]: boolean };
  saveText?: string;
  exitText?: string;
}

const KAlert = forwardRef<WithImageViewer, Props>((props, ref) => {
  const { onDownload, downloading, saveText = 'Lưu hình về máy', exitText = 'Thoát' } = props;
  const [data, setData] = useState<ImageViewerParams | undefined>(undefined);
  const { images = [], download, initIndex = 0, pagination } = data || {};
  const listRef = useRef<FlatList>() as MutableRefObject<FlatList>;
  const [index, setIndex] = useState(initIndex);

  const dismiss = useCallback(() => {
    setData(undefined);
  }, []);

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
    [data, dismiss]
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

  const keyEx = useCallback((item: IImage, i: number) => `${item.url}-${i}`, []);

  const onScrollToIndexFailed = useCallback(
    (info: any) => {
      const len = images.length;
      const wait = new Promise(resolve => setTimeout(() => resolve(true), 0));
      wait.then(() => {
        if (info.index > -1 && info.index < len) {
          listRef.current?.scrollToIndex({
            index: info.index,
            animated: false,
          });
        }
      });
    },
    [images]
  );

  const openSheet = useCallback(() => {
    actionSheetRef.current?.open({
      options: [saveText, exitText],
      cancelButtonIndex: 1,
      callback: i => {
        if (i === 0) {
          onDownload?.(images[index].url);
        }
      },
    });
  }, [onDownload, images, index, exitText, saveText]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IImage>) => {
      return (
        <KContainer.Touchable
          center
          activeOpacity={1}
          onLongPress={download ? openSheet : undefined}
        >
          <PhotoView
            source={{ uri: item.url }}
            minimumZoomScale={1}
            maximumZoomScale={3}
            scale={1}
            androidScaleType="fitCenter"
            style={styles.img}
          />
        </KContainer.Touchable>
      );
    },
    [openSheet, download]
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const i = viewableItems[0]?.index;
    setIndex(i || 0);
  }).current;

  const renderBody = useMemo(() => {
    return (
      <KContainer.View flex>
        <FlatList
          ref={listRef}
          initialScrollIndex={initIndex >= images?.length ? images?.length : initIndex}
          data={images}
          renderItem={renderItem}
          keyExtractor={keyEx}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />

        {pagination === false ? null : (
          <KContainer.View style={styles.footer} edges={['bottom']}>
            <KLabel.Text
              color={KColors.gray.normal}
              textAlign
              typo="TextNmBold"
              style={styles.pagination}
            >
              {index + 1}/{images.length}
            </KLabel.Text>
            <Pagination
              dotContainerStyle={styles.dotContainerStyle}
              dotStyle={styles.dot}
              inactiveDotStyle={styles.inactiveDot}
              inactiveDotScale={0.6}
              dotsLength={images.length > 1 ? images.length : 3}
              activeDotIndex={images.length > 1 ? index : 1}
              inactiveDotOpacity={images.length > 1 ? 0.5 : 0}
            />
          </KContainer.View>
        )}
      </KContainer.View>
    );
  }, [
    images,
    index,
    initIndex,
    keyEx,
    onScrollToIndexFailed,
    onViewableItemsChanged,
    pagination,
    renderItem,
  ]);

  if (!data) {
    return null;
  }

  return (
    <Animated.View
      style={styles.wrapper}
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(500)}
    >
      <Animated.View
        entering={FadeIn.stiffness(300)}
        exiting={FadeOut.stiffness(300)}
        style={styles.flex}
      >
        <KContainer.View edges={['top']} flex>
          <KContainer.View style={styles.header} paddingH={'1rem'}>
            <KImage.VectorIcons onPress={dismiss} name="close-o" size={24} color={KColors.white} />
            {data.download && (
              <KContainer.View flex alignItems="flex-end">
                {downloading ? (
                  <ActivityIndicator color={KColors.white} />
                ) : (
                  <KImage.VectorIcons
                    onPress={onDownload?.bind(null, images[index].url)}
                    name="download-o"
                    size={24}
                    color={KColors.white}
                  />
                )}
              </KContainer.View>
            )}
          </KContainer.View>

          <KContainer.View flex style={styles.body}>
            {renderBody}
          </KContainer.View>
        </KContainer.View>
      </Animated.View>
    </Animated.View>
  );
});

export default KAlert;

const styles = StyleSheet.create({
  wrapper: {
    // @ts-ignore
    ...StyleSheet.absoluteFill,
    zIndex: Z_INDEX_PRIORITY.imageViewer,
  },
  flex: {
    flex: 1,
    backgroundColor: KColors.black,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    zIndex: 100,
  },
  body: {
    marginBottom: 56,
  },
  content: {
    backgroundColor: KColors.white,
    borderRadius: KRadiusValue['4x'],
    overflow: 'hidden',
    maxHeight: KDims.height * 0.8,
  },
  pagination: {
    marginBottom: -KSpacingValue['1.25rem'],
  },
  footer: {
    bottom:
      KDims.bottomSafeHeight > 0
        ? KDims.bottomSafeHeight - KSpacingValue['1rem']
        : KSpacingValue['1rem'],
    zIndex: 100,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  img: {
    width: KDims.width,
    height: KDims.height,
  },
  dotContainerStyle: {
    marginHorizontal: 0,
  },
  dot: {
    backgroundColor: KColors.white,
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  inactiveDot: {
    backgroundColor: KColors.gray.light,
  },
});
