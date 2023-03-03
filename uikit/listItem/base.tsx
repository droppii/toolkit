import React, { ComponentType, memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import { ListItemLabelAndDes, ListItemContent } from './helper';
import { KListItemBaseProps, KListItemBaseItemProps } from '../../types';
import { KColors } from '../../constants';
import KContainer from '../container';
import KImage from '../image';

const KListItemBase = (props: KListItemBaseProps) => {
  const { data, typo, renderType = 'map-item', showChevron = true, testID } = props;
  const keyEx = useCallback(
    (item: KListItemBaseItemProps, index: number) => `${index}-${item.label}`,
    []
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<KListItemBaseItemProps>, key?: string) => {
      const {
        index,
        item: {
          description,
          descriptionColor,
          leftNode,
          content,
          contentBreakLine = true,
          label,
          customLabel,
          border = true,
          background,
          tintColor,
          paddingH = '1rem',
          rightNode,
          onPress,
          testID: itemTestId,
        },
      } = info;

      const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

      return (
        <KContainer.View paddingH={paddingH} background={background} key={key}>
          <Wrapper
            brBC={KColors.border.light}
            brBW={border && index < data.length - 1 ? 1 : 0}
            row
            alignItems
            onPress={onPress}
            paddingV="1rem"
            testID={itemTestId}
          >
            {leftNode?.icon && (
              <KContainer.View marginR={'1rem'}>
                <KImage.CommonIcon
                  {...leftNode.icon}
                  size={24}
                  tintColor={leftNode.icon.tintColor || tintColor || KColors.gray.normal}
                />
              </KContainer.View>
            )}

            {leftNode?.thumbnail && (
              <KContainer.View marginR={'0.5rem'}>
                <KImage.Thumbnail {...leftNode.thumbnail} />
              </KContainer.View>
            )}

            <ListItemLabelAndDes
              typo={typo}
              tintColor={tintColor}
              label={label}
              customLabel={customLabel}
              description={description}
              descriptionColor={descriptionColor}
              content={contentBreakLine ? content : undefined}
            />

            {!contentBreakLine && <ListItemContent content={content} />}

            {rightNode && (
              <KContainer.View marginL={'1rem'}>
                <ListItemContent content={rightNode} />
              </KContainer.View>
            )}

            {showChevron && (
              <KContainer.View marginL={'0.75rem'}>
                <KImage.VectorIcons name="angle-right-o" size={20} color={KColors.gray.light} />
              </KContainer.View>
            )}
          </Wrapper>
        </KContainer.View>
      );
    },
    [typo, data, showChevron]
  );

  if (renderType === 'flatlist') {
    return (
      <FlatList
        testID={testID}
        data={data}
        keyExtractor={keyEx}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <KContainer.View testID={testID}>
      {data.map((item, i) => renderItem({ item, index: i } as any, `item-${i}`))}
    </KContainer.View>
  );
};

const KListItemBaseWithErrorBoundary = withErrorBoundary(KListItemBase, {
  FallbackComponent: () => null,
  onError() {},
});

(KListItemBaseWithErrorBoundary as ComponentType<KListItemBaseProps>).defaultProps = {
  typo: 'TextNmMedium',
};

(KListItemBaseWithErrorBoundary as ComponentType<KListItemBaseProps>).displayName = 'KListItemBase';

export default memo(KListItemBaseWithErrorBoundary);
