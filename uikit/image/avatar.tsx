import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { StyleSheet } from 'react-native';
import Base from './base';
import VectorIcons from './vectorIcons';
import { KAvatarProps } from '../../types';
import KContainer from '../container';
import ImageAssets from '../../assets';
import { KColors } from '../../constants';

const KAvatar = memo((props: KAvatarProps) => {
  const { size, showOnlineDot, isOnline, tintColor, border, onPress, children, testID, ...rest } =
    props;

  const mSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 24;
      case 'sm':
        return 32;
      case 'lg':
        return 48;
      case 'xlg':
        return 56;
      case '2xlg':
        return 64;
      case '3xlg':
        return 96;
      case '4xlg':
        return 112;
      default:
        return 40;
    }
  }, [size]);

  const renderDot = useMemo(() => {
    return (
      <VectorIcons
        name="question-circle-b"
        color={isOnline ? KColors.success.normal : KColors.gray.light}
        size={mSize / 4}
        containerStyle={styles.abs}
      />
    );
  }, [mSize, isOnline]);

  const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

  return (
    <Wrapper
      activeOpacity={1}
      onPress={onPress}
      br="round"
      size={border ? mSize + border.width * 2 : mSize}
      brC={border?.color}
      brW={border?.width}
      style={styles.container}
      testID={testID}
    >
      <Base {...rest} tintColor={tintColor} size={mSize} br="round" />
      {showOnlineDot && renderDot}
      {children}
    </Wrapper>
  );
});

const KAvatarWithErrorBoundary = withErrorBoundary(KAvatar, {
  FallbackComponent: () => null,
  onError() {},
});

(KAvatarWithErrorBoundary as ComponentType<KAvatarProps>).defaultProps = {
  placeholder: ImageAssets.avatar_placeholder,
};

(KAvatarWithErrorBoundary as ComponentType<KAvatarProps>).displayName = 'KAvatar';

export default memo(KAvatarWithErrorBoundary);

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 100,
    backgroundColor: KColors.white,
    padding: 1,
  },
  container: {
    overflow: 'hidden',
    backgroundColor: KColors.palette.primary.w25,
  },
});
