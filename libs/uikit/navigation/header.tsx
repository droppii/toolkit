import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { set } from 'lodash';
import {
  KHeaderNavigationButtonProps,
  KHeaderNavigationProps,
  TypographyModifier,
} from '@uikit/types';
import TabBar from './tabBar';
import { KSpacingValue } from '../../constants';
import { useStatusBarTheme } from '../../hooks';
import KInput from '../input';
import KLabel from '../label';
import { KColors } from '../../constants';
import KContainer from '../container';
import KImage from '../image';
import KBadge from '../badge';

const FIXED_HEIGHT = 40;

const HeaderNavigation = React.memo((props: KHeaderNavigationProps) => {
  const {
    theme = 'primary',
    title = '',
    subTitle = '',
    alignment,
    size = 'small',
    logoSource = '',
    leftButton,
    leftNode,
    rightButton,
    initRightButtons = [],
    searchProps,
    containerPaddingHorizontal,
    tabbar,
    shadow = true,
    transparent,
    onChevronPress,
    testID,
  } = props;

  const [rightButtons, setRightButtons] =
    useState<KHeaderNavigationButtonProps[]>(initRightButtons);

  useEffect(() => {
    const clone = [...rightButtons];
    const index = clone.findIndex(i => i.id === rightButton?.id);
    if (rightButton) {
      if (index === -1) {
        clone.push(rightButton);
      } else {
        clone[index] = rightButton;
      }
      setRightButtons(clone);
    }
  }, [rightButton, rightButtons]);

  const mRights = useMemo(() => {
    const clone = [...rightButtons];
    clone.sort((a, b) => b.index - a.index);
    return clone;
  }, [rightButtons]);

  const colors = useMemo(() => {
    switch (theme) {
      case 'primary':
        return {
          bg: KColors.primary.normal,
          title: KColors.white,
          tint: KColors.white,
          logoBg: KColors.white,
          status: 'light-content',
        };
      case 'secondary':
        return {
          bg: KColors.secondary.normal,
          title: KColors.white,
          tint: KColors.white,
          logoBg: KColors.white,
          status: 'light-content',
        };
      case 'dark':
        return {
          bg: KColors.black,
          title: KColors.white,
          tint: KColors.white,
          logoBg: KColors.white,
          status: 'light-content',
        };
      default:
        return {
          bg: KColors.white,
          title: KColors.gray.dark,
          tint: KColors.primary.normal,
          logoBg: KColors.gray.light,
          status: 'dark-content',
        };
    }
  }, [theme]);

  useStatusBarTheme(colors.status as any);

  const renderButton = useCallback(
    (button: Omit<KHeaderNavigationButtonProps, 'index'>, touch: boolean) => {
      if (!button.icon) {
        return null;
      }

      set(button, 'icon.size', button.icon?.size ?? 24);

      if (button.loading) {
        return (
          <KContainer.View height={FIXED_HEIGHT} width={FIXED_HEIGHT} center>
            <ActivityIndicator />
          </KContainer.View>
        );
      }

      const Wrapper = touch ? KContainer.Touchable : KContainer.View;

      const tintColor = button.icon.tintColor ?? button.tintColor ?? KColors.primary.normal;

      if (button?.badge) {
        return (
          <KContainer.View height={FIXED_HEIGHT} width={FIXED_HEIGHT} alignItems justifyContent>
            <KBadge.Base
              icon={{ ...button.icon, size: 24 }}
              badge={button.badge}
              containerStyle={styles.center}
              tintColor={tintColor}
              onPress={button.onPress}
            />
          </KContainer.View>
        );
      }

      return (
        <Wrapper
          onPress={button.onPress}
          disabled={button.disabled}
          height={FIXED_HEIGHT}
          width={touch ? FIXED_HEIGHT : undefined}
          center
          background={button.backgroundColor}
          br={button.br}
        >
          <KImage.CommonIcon
            {...button.icon}
            vectorName={
              button.icon.imageSource ? undefined : button.icon.vectorName || 'arrow-left-o'
            }
            vectorProvider={button.icon.vectorProvider || 'DroppiiNew'}
            tintColor={tintColor}
            onPress={button.onPress}
          />
        </Wrapper>
      );
    },
    []
  );

  const renderLeftButton = useMemo(() => {
    if (leftNode) {
      return leftNode;
    }
    if (leftButton) {
      return renderButton(
        { ...leftButton, tintColor: leftButton?.tintColor ?? KColors.primary.normal },
        true
      );
    }
    return null;
  }, [leftButton, leftNode, renderButton]);

  const renderRightButtons = useMemo(() => {
    return (
      <KContainer.View alignItems row>
        {mRights?.map((i, index) => {
          const marginR = index < mRights.length - 1 ? '0.5rem' : undefined;
          if (i.jsx) {
            return i.jsx;
          }
          if (!i.title) {
            return renderButton(i, true);
          }

          const btn = renderButton({ ...i, backgroundColor: KColors.transparent }, false);
          const btnLeft = i.iconAlignment === 'left' && btn;
          const btnRight = i.iconAlignment !== 'left' && btn;

          const typo: TypographyModifier =
            i.titleWeight === 'bold'
              ? 'TextNmBold'
              : i.titleWeight === 'medium'
              ? 'TextNmMedium'
              : 'TextNmNormal';

          return (
            <KContainer.Touchable
              onPress={i.onPress}
              disabled={i.disabled || i.loading}
              row
              alignItems
              alignSelf
              background={i.backgroundColor}
              br={i.br}
              paddingH="0.5rem"
              marginR={marginR}
              height={FIXED_HEIGHT}
            >
              {btnLeft}
              <KLabel.Text
                typo={typo}
                color={i.tintColor || colors.tint}
                marginL={btnLeft ? '0.5rem' : undefined}
                marginR={btnRight ? '0.5rem' : undefined}
              >
                {i.title}
              </KLabel.Text>
              {btnRight}
            </KContainer.Touchable>
          );
        })}
      </KContainer.View>
    );
  }, [mRights, colors, renderButton]);

  const renderLogoButton = useMemo(() => {
    if (logoSource) {
      return (
        <Image
          style={[styles.logo, { backgroundColor: colors.logoBg }]}
          source={typeof logoSource === 'number' ? logoSource : { uri: logoSource }}
        />
      );
    }
    return null;
  }, [logoSource, colors]);

  const searchPropsClone = useMemo(() => {
    if (!searchProps) {
      return undefined;
    }
    const _clone = { ...searchProps };
    // @ts-ignore
    delete _clone.position;
    return _clone;
  }, [searchProps]);
  const SearchWrapper = searchProps?.onPress ? Pressable : KContainer.View;

  const renderSearchBottom = useMemo(() => {
    if (searchProps && searchProps.position === 'bottom') {
      return (
        <KContainer.View style={styles.content} paddingH="1rem" alignItems="flex-start">
          <SearchWrapper onPress={searchProps.onPress} style={styles.searchWrapper}>
            <KInput.TextBox
              searchIconLeftColor={KColors.gray.light}
              marginL={'0.5rem'}
              background={KColors.transparent}
              color={colors.title}
              flex
              numberOfLines={1}
              style={styles.searchInput}
              {...searchPropsClone}
            />
          </SearchWrapper>
        </KContainer.View>
      );
    }
    return null;
  }, [searchProps, searchPropsClone, colors, SearchWrapper]);

  const renderCenter = useMemo(() => {
    return (
      <KContainer.View flex row alignItems marginL={'0.5rem'}>
        {renderLogoButton}
        {searchProps && searchProps.position === 'center' ? (
          <KContainer.View style={styles.content} flex marginR={'0.5rem'}>
            <SearchWrapper
              onPress={searchProps.onPress}
              style={[styles.searchWrapper, styles.searchWrapperCenter]}
            >
              <KImage.VectorIcons name="search-o" size={16} color={colors.title} />
              {/* <SearchWrapper onPress={searchProps.onPress}> */}
              <KInput.Base
                marginL={'0.5rem'}
                background={KColors.transparent}
                color={colors.title}
                flex
                numberOfLines={1}
                style={styles.searchInput}
                {...searchPropsClone}
              />
              {/* </SearchWrapper> */}
            </SearchWrapper>
          </KContainer.View>
        ) : (
          <KContainer.Touchable
            onPress={onChevronPress}
            activeOpacity={onChevronPress ? 0.7 : 1}
            flex
            alignItems={alignment === 'left' ? 'flex-start' : 'center'}
          >
            <KLabel.Text
              numberOfLines={1}
              typo={size === 'small' ? 'TextLgBold' : 'H3'}
              color={colors.title}
              style={size === 'small' ? styles.titleSmall : styles.titleLarge}
            >
              {title}
            </KLabel.Text>
            {!!subTitle && (
              <KContainer.View alignItems row>
                <KLabel.Text
                  numberOfLines={1}
                  typo={'TextSmNormal'}
                  color={colors.title}
                  textAlign={alignment}
                  flexS={1}
                  style={styles.subTitle}
                >
                  {subTitle}
                </KLabel.Text>

                {onChevronPress && (
                  <KImage.VectorIcons name="angle-down-o" size={12} color={colors.tint} />
                )}
              </KContainer.View>
            )}
          </KContainer.Touchable>
        )}
      </KContainer.View>
    );
  }, [
    alignment,
    colors,
    renderLogoButton,
    subTitle,
    size,
    title,
    searchProps,
    searchPropsClone,
    onChevronPress,
    SearchWrapper,
  ]);

  return (
    // @ts-ignore
    <Collapsible collapsed={!!props.isCollapsed}>
      {/* <StatusBar barStyle={colors.status as any} hidden={false} animated /> */}
      <KContainer.View
        style={[
          shadow && styles.shadow,
          { backgroundColor: transparent ? KColors.transparent : colors.bg },
        ]}
        paddingH={containerPaddingHorizontal}
        edges={['top']}
        testID={testID}
      >
        <KContainer.View style={styles.content} paddingH="0.5rem">
          {renderLeftButton}
          {renderCenter}
          {renderRightButtons}
        </KContainer.View>
        {renderSearchBottom}
        {tabbar && (
          <KContainer.View marginB={'1rem'}>
            <TabBar {...tabbar} type="outline" theme={theme as any} />
          </KContainer.View>
        )}
      </KContainer.View>
    </Collapsible>
  );
});

export default HeaderNavigation;

const styles = StyleSheet.create({
  content: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  searchInput: {
    // height: 40,
    // lineHeight: 40,
    backgroundColor: 'transparent',
  },
  logo: {
    width: FIXED_HEIGHT,
    height: FIXED_HEIGHT,
    resizeMode: 'cover',
    // borderRadius: 20,
    marginRight: 8,
  },
  title: {
    flex: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconLeftWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconWrapperDefault: {
    padding: 4,
  },
  icon: {
    with: 32,
    height: 32,
  },
  iconRight: {
    marginRight: 4,
  },
  chevron: {
    marginLeft: 4,
  },
  searchWrapperCenter: {
    alignSelf: 'center',
  },
  searchWrapper: {
    height: FIXED_HEIGHT,
    alignSelf: 'flex-start',
    borderRadius: FIXED_HEIGHT,
    backgroundColor: KColors.palette.gray.w25,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: KSpacingValue['0.75rem'],
    alignItems: 'center',
  },
  shadow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: KColors.border.normal,
  },
  center: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleLarge: {
    lineHeight: 30,
  },
  titleSmall: {
    lineHeight: 26,
  },
  subTitle: {
    lineHeight: 20,
  },
});
