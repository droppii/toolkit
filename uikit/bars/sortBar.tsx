import React, { ComponentType, memo } from 'react';
import { StyleSheet } from 'react-native';
import { withErrorBoundary } from 'react-error-boundary';
import { KSortBarProps } from '../../types';
import KContainer from '../container';
import { KColors, KDims, KSpacingValue } from '../../constants';
import { KButtonBase } from '../button/base';

const KSortBar = (props: KSortBarProps) => {
  const { buttons, background = KColors.white, testID } = props;

  return (
    <KContainer.View width={KDims.width} background={background} testID={testID}>
      <KContainer.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {buttons.map((i, index) => {
          const isLast = index === buttons.length - 1;
          return (
            <KButtonBase
              size="sm"
              {...i}
              marginR={isLast ? 0 : '0.5rem'}
              kind="primary"
              background={i.isActive ? KColors.palette.primary.w50 : KColors.transparent}
              brC={i.isActive ? KColors.primary.normal : KColors.border.light}
              tintColor={i.isActive ? KColors.primary.normal : KColors.gray.dark}
              isLink={false}
              brW={1}
              key={`sort-button-${index}`}
              testID={i.testID}
            />
          );
        })}
      </KContainer.ScrollView>
    </KContainer.View>
  );
};

(KSortBar as ComponentType<KSortBarProps>).defaultProps = {};

const KSortBarWithErrorBoundary = withErrorBoundary(KSortBar, {
  FallbackComponent: () => null,
  onError() {},
});

(KSortBarWithErrorBoundary as ComponentType<KSortBarProps>).displayName = 'KSortBar';

export default memo(KSortBarWithErrorBoundary);

const styles = StyleSheet.create({
  list: {
    padding: KSpacingValue['1rem'],
  },
});
