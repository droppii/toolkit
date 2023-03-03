import React, { ComponentType, forwardRef, memo, useCallback, useRef } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { FlatList } from 'react-native';
import { get } from 'lodash';
import { KFlatListProps } from '../../types';
import { useCombineRefs } from '../../hooks';

const KFlatList = forwardRef<FlatList, KFlatListProps>((props, ref) => {
  const { keyExtractorId, data = [] } = props;
  const innerRef = useRef<FlatList>();
  const combinedRef = useCombineRefs<FlatList>(ref, innerRef);

  const onScrollToIndexFailed = useCallback(
    (info: any) => {
      try {
        const len = data?.length || 0;
        const wait = new Promise(resolve => setTimeout(() => resolve(true), 0));
        wait.then(() => {
          if (info.index > -1 && info.index < len) {
            combinedRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }
        });
      } catch (error) {
        //
      }
    },
    [data, combinedRef]
  );

  const keyEx = useCallback(
    (item: any, index: number) => {
      return get(item, keyExtractorId ?? '') ?? `item-${index}`;
    },
    [keyExtractorId]
  );

  return (
    <FlatList
      keyExtractor={keyEx}
      onScrollToIndexFailed={onScrollToIndexFailed}
      {...props}
      ref={combinedRef}
    />
  );
});

const KFlatListWithErrorBoundary = withErrorBoundary(KFlatList, {
  FallbackComponent: () => null,
  onError() {},
});

(KFlatListWithErrorBoundary as ComponentType<KFlatListProps>).defaultProps = {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
};

(KFlatListWithErrorBoundary as ComponentType<KFlatListProps>).displayName = 'KFlatList';

export default memo(KFlatListWithErrorBoundary);
