import React, { ComponentType, memo, useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import Radio from './radio';
import { KRadioGroupProps } from '../../types';
import KContainer from '../container';

const KRadioGroup = (props: KRadioGroupProps) => {
  const { items = [], initialIndex, renderType = 'map-item', onChange, testID, ...rest } = props;
  const [checked, setChecked] = useState(initialIndex);

  const keyEx = useCallback((item: any, index: number) => `${index}-${item.label}`, []);

  const onChangeWrapper = useCallback(
    (index: number) => {
      setChecked(index);
      onChange?.(index);
    },
    [onChange]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<any>, key?: string) => {
      const p: any = { ...rest };
      if (key) {
        p.key = key;
      }
      return (
        <Radio
          key={key}
          {...p}
          {...info.item}
          onChange={onChangeWrapper.bind(null, info.index)}
          checked={checked === info.index}
          isLastItem={items.length - 1 === info.index}
          testID={info.item.testID}
        />
      );
    },
    [rest, checked, items, onChangeWrapper]
  );

  if (renderType === 'flatlist') {
    return (
      <FlatList
        data={items}
        extraData={checked}
        keyExtractor={keyEx}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        testID={testID}
      />
    );
  }

  return (
    <KContainer.View testID={testID}>
      {items.map((item, i) => renderItem({ item, index: i } as any, `item-${i}`))}
    </KContainer.View>
  );
};

const KRadioGroupWithErrorBoundary = withErrorBoundary(KRadioGroup, {
  FallbackComponent: () => null,
  onError() {},
});

(KRadioGroupWithErrorBoundary as ComponentType<KRadioGroupProps>).defaultProps = {};

(KRadioGroupWithErrorBoundary as ComponentType<KRadioGroupProps>).displayName = 'KRadioGroup';

export default memo(KRadioGroupWithErrorBoundary);

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
});
