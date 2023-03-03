import React, { ComponentType, forwardRef, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import Collapsible from 'react-native-collapsible';
import { KCollapsibleView } from '@uikit/types';

const KCollapsible = forwardRef<Collapsible, KCollapsibleView>((props, ref) => {
  return <Collapsible {...props} ref={ref} />;
});

const KCollapsibleWithErrorBoundary = withErrorBoundary(KCollapsible, {
  FallbackComponent: () => null,
  onError() {},
});

(KCollapsibleWithErrorBoundary as ComponentType<KCollapsibleView>).defaultProps = {};

(KCollapsibleWithErrorBoundary as ComponentType<KCollapsibleView>).displayName = 'KCollapsibleView';

export default memo(KCollapsibleWithErrorBoundary);
