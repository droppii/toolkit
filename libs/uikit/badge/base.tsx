import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { KBadgeProps } from '@uikit/types';
import KImage from '../image';
import KContainer from '../container';
import KLabel from '../label';
import { KColors } from '../../constants';

const BadgeIcon = (props: KBadgeProps) => {
  const {
    badge,
    containerStyle,
    onPress,
    icon,
    tintColor,
    colors = KColors.gradients.danger.light,
    border = true,
    labelContainerStyle,
    ...rest
  } = props;

  const mBadge = useMemo(() => {
    if (typeof badge === 'string') {
      return parseInt(badge, 10);
    }
    return badge;
  }, [badge]);

  const Wrapper = useMemo(() => {
    return onPress ? KContainer.Touchable : KContainer.View;
  }, [onPress]);

  const isLarge = mBadge && !isNaN(mBadge) && mBadge >= 100;

  return (
    <Wrapper onPress={onPress} style={containerStyle} {...rest}>
      {icon?.jsx ?? <KImage.CommonIcon {...icon} tintColor={tintColor} />}
      {mBadge && !isNaN(mBadge) && mBadge > 0 ? (
        <Animated.View
          style={[
            styles.badgeContainer,
            isLarge ? styles.badgeContainerLarge : null,
            labelContainerStyle,
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={colors}
            style={[
              styles.badge,
              isLarge ? styles.badgeLarge : null,
              border !== true && styles.noBorder,
            ]}
          >
            <KLabel.Text typo="Text2XsBold" color={KColors.white} allowFontScaling={false} center>
              {mBadge >= 100 ? '99+' : `${mBadge}`}
            </KLabel.Text>
          </LinearGradient>
        </Animated.View>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(BadgeIcon);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  badgeContainer: {
    position: 'absolute',
    top: -16,
    left: 12,
  },
  badgeContainerLarge: {
    left: 2,
  },
  badge: {
    width: 23,
    height: 23,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: KColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBorder: {
    borderWidth: 0,
  },
  badgeLarge: {
    width: 34,
    left: 4,
  },
});
