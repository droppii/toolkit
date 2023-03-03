import React, { ComponentType, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KFlashListProps } from '@uikit/types';
import { FlashList } from '@shopify/flash-list';

const KFlashList = (props: KFlashListProps) => {
  return <FlashList {...props} />;
};

const KFlashListWithErrorBoundary = withErrorBoundary(KFlashList, {
  FallbackComponent: () => null,
  onError() {},
});

(KFlashListWithErrorBoundary as ComponentType<KFlashListProps>).defaultProps = {};

(KFlashListWithErrorBoundary as ComponentType<KFlashListProps>).displayName = 'KFlashList';

export default memo(KFlashListWithErrorBoundary);
