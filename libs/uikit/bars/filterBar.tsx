import React, { ComponentType, memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import { remove } from 'lodash';
import { KFilterBarProps } from '@uikit/types';
import KImage from '../image';
import KListItem from '../listItem';
import KContainer from '../container';
import { KColors, KDims, KSpacingValue } from '../../constants';
import KButton from '../button';
import KLabel from '../label';

const KFilterBar = (props: KFilterBarProps) => {
  const {
    buttons,
    titleAlignment,
    background = KColors.white,
    checkBoxes,
    filterOptions,
    testID,
  } = props;
  const isRow = titleAlignment === 'left';
  const [checked, setChecked] = useState<number[]>([]);

  const onCheckboxChangeWrapper = useCallback(
    (index: number, onChange?: any) => {
      const clone = [...checked];

      if (clone.includes(index)) {
        remove(clone, i => i === index);
        onChange?.(false);
      } else {
        clone.push(index);
        onChange?.(true);
      }
      clone.sort((a, b) => a - b);

      setChecked(clone);
    },
    [checked]
  );

  return (
    <KContainer.View width={KDims.width} background={background} row alignItems testID={testID}>
      <KContainer.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {checkBoxes?.map((c, index) => {
          return (
            <KContainer.View
              key={`filter-checkbox-${index}`}
              brRW={1}
              brRC={KColors.border.light}
              center
            >
              <KListItem.CheckBox
                {...c}
                onChange={onCheckboxChangeWrapper.bind(null, index, c.onChange)}
                checked={checked.includes(index)}
                isLastItem={true}
                shape="square"
                typo="TextNmMedium"
                paddingH="0.5rem"
                paddingV="0.5rem"
                iconSize={16}
                testID={c.testID}
              />
            </KContainer.View>
          );
        })}
        {buttons.map((i, index) => {
          const isLast = index === buttons.length - 1;
          return (
            <KContainer.View
              key={`filter-button-${index}`}
              row={isRow}
              alignItems={isRow || undefined}
              brRW={isLast ? 0 : 1}
              brRC={KColors.border.light}
            >
              {!!i.title && (
                <KLabel.Text
                  paddingL={'0.75rem'}
                  paddingR={isRow ? '0.75rem' : undefined}
                  typo="TextNmBold"
                  marginB={isRow ? 0 : '0.25rem'}
                >
                  {i.title}
                </KLabel.Text>
              )}
              <KButton.Transparent
                {...i}
                kind="light"
                size="nm"
                iconAlignment="right"
                icon={{ vectorName: 'angle-down-o' }}
                testID={i.testID}
              />
            </KContainer.View>
          );
        })}
      </KContainer.ScrollView>
      {filterOptions && (
        <KContainer.Touchable
          activeOpacity={0.8}
          row
          center
          onPress={filterOptions.onPress}
          style={styles.btn}
        >
          <KImage.CommonIcon
            {...filterOptions.icon}
            tintColor={KColors.primary.normal}
            vectorName={filterOptions.icon?.vectorName ?? 'filter-bar-o'}
          />
          <KLabel.Text
            color={filterOptions.label?.color ?? KColors.palette.primary.w400}
            typo={filterOptions.label?.typo ?? 'TextNmBold'}
            marginL={'0.5rem'}
          >
            {filterOptions.label?.text ?? 'Lọc'}
          </KLabel.Text>
        </KContainer.Touchable>
      )}
    </KContainer.View>
  );
};

(KFilterBar as ComponentType<KFilterBarProps>).defaultProps = {};

const KFilterBarWithErrorBoundary = withErrorBoundary(KFilterBar, {
  FallbackComponent: () => null,
  onError() {},
});

(KFilterBarWithErrorBoundary as ComponentType<KFilterBarProps>).displayName = 'KFilterBar';

export default memo(KFilterBarWithErrorBoundary);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: KSpacingValue['0.25rem'],
    paddingVertical: KSpacingValue['0.5rem'],
  },
  btn: {
    paddingVertical: KSpacingValue['1rem'] + 1,
    paddingHorizontal: KSpacingValue['0.5rem'],
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.16,
    backgroundColor: KColors.white,
    elevation: 24,
  },
});
