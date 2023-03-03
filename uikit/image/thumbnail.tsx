import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import Base from './base';
import { KThumbnailProps } from '../../types';
import { TypoHelper } from '../../constants';
import ImageAssets from '../../assets';

const KThumbnail = memo((props: KThumbnailProps) => {
  const { size, type, br, ...rest } = props;

  const style = useMemo(() => TypoHelper.mapKThumbnailSizeAndTypeToStyle(size, type), [size, type]);

  return (
    <Base
      {...rest}
      style={style}
      br={type === 'circle' ? 'round' : br}
      placeholder={ImageAssets.image_placeholder}
    />
  );
});

const KThumbnailWithErrorBoundary = withErrorBoundary(KThumbnail, {
  FallbackComponent: () => null,
  onError() {},
});

(KThumbnailWithErrorBoundary as ComponentType<KThumbnailProps>).defaultProps = {};

(KThumbnailWithErrorBoundary as ComponentType<KThumbnailProps>).displayName = 'KThumbnail';

export default memo(KThumbnailWithErrorBoundary);
