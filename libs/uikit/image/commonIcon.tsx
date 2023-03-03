import React, { ComponentType, memo, useRef } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KCommonIconProps } from '@uikit/types';
import Base from './base';
import VectorIcons from './vectorIcons';
import KContainer from '../container';

const KCommonIcon = memo((props: KCommonIconProps) => {
  const {
    vectorName,
    vectorProvider,
    imageSource,
    tintColor,
    size,
    style,
    containerStyle,
    onPress,
    ...rest
  } = props;

  const mStyle = useRef({ overflow: 'hidden' });

  const Wrapper = typeof onPress === 'function' ? KContainer.Touchable : KContainer.View;

  if (vectorName) {
    return (
      <Wrapper onPress={onPress} style={[containerStyle, mStyle.current as any]} {...rest}>
        <VectorIcons
          name={vectorName}
          color={tintColor}
          size={size}
          provider={vectorProvider || 'DroppiiNew'}
          style={style}
        />
      </Wrapper>
    );
  }

  if (imageSource) {
    return (
      <Wrapper onPress={onPress} style={[containerStyle, mStyle.current as any]} {...rest}>
        <Base
          uri={imageSource}
          size={size}
          style={style as any}
          // tintColor={tintColor}
          resizeMode="cover"
        />
      </Wrapper>
    );
  }

  return null;
});

const KCommonIconWithErrorBoundary = withErrorBoundary(KCommonIcon, {
  FallbackComponent: () => null,
  onError() {},
});

(KCommonIconWithErrorBoundary as ComponentType<KCommonIconProps>).defaultProps = {};

(KCommonIconWithErrorBoundary as ComponentType<KCommonIconProps>).displayName = 'KCommonIcon';

export default memo(KCommonIconWithErrorBoundary);
