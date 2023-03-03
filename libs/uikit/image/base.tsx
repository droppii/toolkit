import { set } from 'lodash';
import React, { ComponentType, memo, useCallback, useMemo, useRef, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KImageProps } from '@uikit/types';
import { KRadiusValue } from '../../constants';
import { ImageAssets } from '../../assets';
import KContainer from '../container';

const KImageBase = memo((props: KImageProps) => {
  const {
    style = {},
    size,
    width,
    height,
    br,
    placeholder = ImageAssets.image_placeholder,
    uri,
    flashListForceRenderKey,
    onPress,
    testID,
    ...rest
  } = props;

  const { innerProps, innerStyle } = useMemo(() => {
    const mStyle = {};
    if (width) {
      set(mStyle, 'width', width);
    }
    if (height) {
      set(mStyle, 'height', height);
    }
    if (size) {
      set(mStyle, 'width', size);
      set(mStyle, 'height', size);
    }
    if (br) {
      set(mStyle, 'borderRadius', KRadiusValue[br]);
    }
    if (rest.tintColor) {
      set(mStyle, 'tintColor', rest.tintColor);
    }
    if (rest.resizeMode) {
      set(mStyle, 'resizeMode', rest.resizeMode);
    }
    return {
      innerStyle: StyleSheet.flatten([style, mStyle]),
      innerProps: rest,
    };
  }, [width, height, size, br, style, rest]);

  const imageRef = useRef(flashListForceRenderKey);
  const [failed, setFailed] = useState(0);

  if (flashListForceRenderKey !== imageRef.current) {
    imageRef.current = flashListForceRenderKey;
    if (failed > 0) {
      setFailed(0);
    }
  }

  const { Component, source } = useMemo(() => {
    return {
      source: typeof uri === 'number' ? uri : failed > 1 || !uri ? placeholder : { uri },
      Component: typeof uri === 'number' || failed > 0 ? Image : FastImage,
    };
  }, [uri, failed, placeholder]);

  const onError = useCallback(() => {
    failed < 2 && setFailed(failed + 1);
  }, [failed]);

  const renderImage = useMemo(() => {
    const cloneProps = { ...innerProps };
    if ((source as object)?.hasOwnProperty('uri')) {
      delete cloneProps.tintColor;
    }

    return (
      // @ts-ignore
      <Component
        {...cloneProps}
        testID={testID}
        style={innerStyle}
        source={source}
        onError={onError}
      />
    );
  }, [innerProps, innerStyle, source, Component, onError, testID]);

  if (typeof onPress === 'function') {
    return (
      <KContainer.Touchable testID={testID} onPress={onPress}>
        {renderImage}
      </KContainer.Touchable>
    );
  }
  return renderImage;
});

const KImageBaseWithErrorBoundary = withErrorBoundary(KImageBase, {
  FallbackComponent: () => null,
  onError() {},
});

(KImageBaseWithErrorBoundary as ComponentType<KImageProps>).defaultProps = {};

(KImageBaseWithErrorBoundary as ComponentType<KImageProps>).displayName = 'KImageBase';

export default memo(KImageBaseWithErrorBoundary);
