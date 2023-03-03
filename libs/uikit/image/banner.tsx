import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KBannerProps } from '@uikit/types';
import Base from './base';

const KBanner = memo((props: KBannerProps) => {
  const { ratio, width, ...rest } = props;

  const height = useMemo(() => {
    try {
      const [sW, sH] = ratio.split(':');
      const w = parseFloat(sW);
      const h = parseFloat(sH);
      const result = (width * h) / w;
      return isNaN(result) ? width : result;
    } catch (error) {
      return width;
    }
  }, [ratio, width]);

  return <Base {...rest} width={width} height={height} />;
});

const KBannerWithErrorBoundary = withErrorBoundary(KBanner, {
  FallbackComponent: () => null,
  onError() {},
});

(KBannerWithErrorBoundary as ComponentType<KBannerProps>).defaultProps = {};

(KBannerWithErrorBoundary as ComponentType<KBannerProps>).displayName = 'KBanner';

export default memo(KBannerWithErrorBoundary);
