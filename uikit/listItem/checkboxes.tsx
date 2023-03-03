import React, { ComponentType, memo, useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import { remove } from 'lodash';
import Checkbox from './checkbox';
import { KCheckboxesProps } from '../../types';
import KContainer from '../container';

const KCheckboxes = (props: KCheckboxesProps) => {
  const {
    items = [],
    initialIndexes = [],
    renderType = 'map-item',
    onChange,
    testID,
    ...rest
  } = props;
  const [checked, setChecked] = useState(initialIndexes);

  const keyEx = useCallback((item: any, index: number) => `${index}-${item.label}`, []);

  const onChangeWrapper = useCallback(
    (index: number) => {
      const clone = [...checked];

      if (clone.includes(index)) {
        remove(clone, i => i === index);
      } else {
        clone.push(index);
      }
      clone.sort((a, b) => a - b);

      setChecked(clone);
      onChange?.(clone);
    },
    [checked, onChange]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<any>, key?: string) => {
      const p: any = { ...rest };
      if (key) {
        p.key = key;
      }

      return (
        <Checkbox
          key={key}
          {...p}
          {...info.item}
          onChange={onChangeWrapper.bind(null, info.index)}
          checked={checked.includes(info.index)}
          isLastItem={info.index - 1 === items.length - 1}
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

const KCheckboxesWithErrorBoundary = withErrorBoundary(KCheckboxes, {
  FallbackComponent: () => null,
  onError() {},
});

(KCheckboxesWithErrorBoundary as ComponentType<KCheckboxesProps>).defaultProps = {};

(KCheckboxesWithErrorBoundary as ComponentType<KCheckboxesProps>).displayName = 'KCheckboxes';

export default memo(KCheckboxesWithErrorBoundary);

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
});
