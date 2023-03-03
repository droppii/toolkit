import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { StyleSheet, View } from 'react-native';
import Star from './star';
import RatingKitHelper from './helper';
import { KStarsProps } from '../../types';
import KLabel from '../label';
import { KColors } from '../../constants';
import { TypoHelper } from '../../constants';

const KStars = (props: KStarsProps) => {
  const {
    points = 5,
    currentPoints = 0,
    reviews,
    showAvg,
    size,
    theme = 'light',
    onPress,
    testID,
  } = props;

  const { spacing } = useMemo(() => TypoHelper.mapKRatingSizeToNumber(size), [size]);

  const textSize = useMemo(() => RatingKitHelper.mapSizeToTextTypo(size), [size]);

  const renderViews = useMemo(() => {
    const arr = new Array(points).fill(1);
    return (
      <View style={styles.row}>
        {arr.map((_, index) => {
          const style = { marginRight: index === arr.length - 1 ? 0 : spacing };
          return (
            <Star
              style={style}
              key={`star-${index}`}
              theme={theme}
              size={size}
              point={currentPoints - index}
              onPress={onPress?.bind(null, index)}
            />
          );
        })}
      </View>
    );
  }, [points, currentPoints, size, theme, spacing, onPress]);

  const renderAvg = useMemo(() => {
    if (!showAvg) {
      return null;
    }

    return (
      <KLabel.Text typo={textSize.avg} style={{ marginRight: spacing }}>
        {currentPoints?.toFixed(1) || ''}
      </KLabel.Text>
    );
  }, [currentPoints, showAvg, spacing, textSize]);

  const renderCount = useMemo(() => {
    if (reviews === undefined || isNaN(reviews)) {
      return null;
    }
    return (
      <KLabel.Text
        typo={textSize.reviews}
        color={KColors.gray.light}
        style={{ marginLeft: spacing }}
      >
        {`(${reviews})`}
      </KLabel.Text>
    );
  }, [reviews, spacing, textSize]);

  return (
    <View style={styles.row} testID={testID}>
      {renderAvg}
      {renderViews}
      {renderCount}
    </View>
  );
};

(KStars as React.ComponentType<KStarsProps>).defaultProps = {};

const KStarsWithErrorBoundary = withErrorBoundary(KStars, {
  FallbackComponent: () => null,
  onError() {},
});

(KStarsWithErrorBoundary as ComponentType<KStarsProps>).displayName = 'KStars';

export default memo(KStarsWithErrorBoundary);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
