import React, {
  ComponentType,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { KTabBarButtonProps, KTabBarProps } from '../../types';
import KContainer from '../container';
import KLabel from '../label';
import KImage from '../image';
import { KColors } from '../../constants';
import { TypoHelper } from '../../constants';

const KTabBar = memo((props: KTabBarProps) => {
  const {
    buttons = [],
    type = 'underline',
    theme = 'primary',
    initialIndex = 0,
    iconAlignment = 'top',
    containerStyle,
    paddingH = '0.75rem',
    onChanged,
    testID,
  } = props;
  const [index, setIndex] = useState(initialIndex);
  const ref = useRef<FlatList>() as MutableRefObject<FlatList>;

  const onPress = useCallback(
    (i: number) => {
      setIndex(i);
      onChanged?.(i);
    },
    [onChanged]
  );

  useEffect(() => {
    onPress(initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex]);

  useEffect(() => {
    ref.current.scrollToIndex({ index, animated: true });
  }, [index]);

  const onScrollToIndexFailed = useCallback(
    (info: any) => {
      const len = buttons.length;
      const wait = new Promise(resolve => setTimeout(() => resolve(true), 0));
      wait.then(() => {
        if (info.index > -1 && info.index < len) {
          ref.current?.scrollToIndex({
            index: info.index,
            animated: false,
          });
        }
      });
    },
    [buttons]
  );

  const dims = useMemo(() => {
    const find = buttons.find(i => i.icon && ['top', 'bottom'].includes(iconAlignment));
    return find
      ? type === 'underline'
        ? { total: 70, paddingV: '1rem' }
        : { total: 70, paddingV: '0.75rem' }
      : type === 'underline'
      ? { total: 46, paddingV: '0.75rem' }
      : { total: 38, paddingV: '0.5rem' };
  }, [buttons, iconAlignment, type]);

  const style: any = useMemo(
    () => ({
      alignItems: 'stretch',
      height: dims.total,
      paddingHorizontal: TypoHelper.mapKSpacingToNumber(paddingH),
    }),
    [dims.total, paddingH]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<KTabBarButtonProps>) => {
      const { index: i, item } = info;
      const { icon, label, testID: itemTestID } = item;

      const isSolid = (type === 'solid' || type === 'outline') && index === i;

      const tintColor = isSolid
        ? KColors.white
        : index === i
        ? theme === 'dark'
          ? KColors.gray.dark
          : KColors[theme].normal
        : KColors.gray.light;

      const backgroundColor = isSolid
        ? theme === 'dark'
          ? KColors.gray.dark
          : KColors[theme].normal
        : KColors.palette.gray.w25;

      return (
        <KContainer.Touchable
          row={['left', 'right'].includes(iconAlignment)}
          paddingV={dims.paddingV as any}
          paddingH="1rem"
          center
          onPress={onPress.bind(null, i)}
          brBW={type === 'underline' ? 1 : undefined}
          brW={type === 'outline' && index !== i ? 1 : 0}
          brC={type === 'outline' && index !== i ? tintColor : undefined}
          brBC={type === 'underline' ? KColors.palette.gray.w50 : undefined}
          background={backgroundColor}
          br={type === 'underline' ? undefined : '2x'}
          marginR={type === 'underline' || i === buttons.length - 1 ? undefined : '0.5rem'}
          testID={itemTestID}
        >
          {['left', 'top'].includes(iconAlignment) && icon && (
            <KContainer.View
              marginB={iconAlignment === 'top' ? '0.25rem' : undefined}
              marginR={iconAlignment === 'left' ? '0.25rem' : undefined}
            >
              <KImage.CommonIcon {...icon} tintColor={tintColor} size={20} />
            </KContainer.View>
          )}

          <KLabel.Text typo="TextNmMedium" color={tintColor}>
            {label}
          </KLabel.Text>

          {['right', 'bottom'].includes(iconAlignment) && icon && (
            <KContainer.View
              marginT={iconAlignment === 'bottom' ? '0.25rem' : undefined}
              marginL={iconAlignment === 'right' ? '0.25rem' : undefined}
            >
              <KImage.CommonIcon {...icon} tintColor={tintColor} size={20} />
            </KContainer.View>
          )}
          {index === i && type === 'underline' && (
            <KContainer.View
              style={styles.indicator}
              background={theme === 'dark' ? KColors.gray.dark : KColors[theme].normal}
            />
          )}
        </KContainer.Touchable>
      );
    },
    [buttons.length, index, theme, type, dims.paddingV, iconAlignment, onPress]
  );

  const keyEx = useCallback((_: any, i: number) => `tabbar-button-${i}`, []);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={[containerStyle, style]}
      ref={ref}
      data={buttons}
      extraData={[index]}
      renderItem={renderItem}
      keyExtractor={keyEx}
      onScrollToIndexFailed={onScrollToIndexFailed}
      testID={testID}
    />
  );
});

const KTabBarWithErrorBoundary = withErrorBoundary(KTabBar, {
  FallbackComponent: () => null,
  onError() {},
});

(KTabBarWithErrorBoundary as ComponentType<KTabBarProps>).defaultProps = {};

(KTabBarWithErrorBoundary as ComponentType<KTabBarProps>).displayName = 'KTabBar';

export default memo(KTabBarWithErrorBoundary);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});
