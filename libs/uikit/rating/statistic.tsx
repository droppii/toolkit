import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { StyleSheet, View } from 'react-native';
import { KRatingStatisticProps } from '@uikit/types';
import Collapsible from 'react-native-collapsible';
import Stars from './stars';
import RatingKitHelper from './helper';
import Bar from './bar';
import { TypoHelper } from '../../constants';
import KLabel from '../label';
import { useAnimatedChevronButton } from '../../hooks';

const KRatingStatistic = (props: KRatingStatisticProps) => {
  const {
    orientation = 'horizontal',
    containerStyle,
    initialOpen = false,
    fixedAvg,
    testID,
    ...rest
  } = props;

  const { AnimatedChevronButton, isCollapsed } = useAnimatedChevronButton({ initialOpen });

  const renderBar = useMemo(() => <Bar {...rest} />, [rest]);

  const maxStars = useMemo(() => RatingKitHelper.getMaxStars(rest.values), [rest.values]);

  const totalRatings = useMemo(() => RatingKitHelper.getTotalRatings(rest.values), [rest.values]);

  const avg = useMemo(() => {
    if (!TypoHelper.isNullOrUndefined(fixedAvg)) {
      return fixedAvg as number;
    }
    const sumTotalRatings = RatingKitHelper.sumTotalRatings(rest.values);
    const result = sumTotalRatings / totalRatings;
    if (isNaN(result)) {
      return 0;
    }
    return result;
  }, [rest.values, totalRatings, fixedAvg]);

  const renderVertical = useMemo(() => {
    return (
      <View style={styles.row}>
        <View style={styles.flex}>
          <Stars points={5} currentPoints={avg} />
          <KLabel.Text typo="H4" marginB={'0.5rem'} marginT={'0.25rem'}>
            {RatingKitHelper.genStatisticLabelVertical(avg, maxStars)}
          </KLabel.Text>
        </View>
        {AnimatedChevronButton}
      </View>
    );
  }, [AnimatedChevronButton, avg, maxStars]);

  const renderHorizontal = useMemo(() => {
    return (
      <View style={styles.row}>
        <KLabel.Text typo="Display3xLgBold">{RatingKitHelper.fixScore(avg)}</KLabel.Text>
        <View style={[styles.flex, styles.center]}>
          <Stars points={5} currentPoints={avg} />
          <KLabel.Text typo="TextSmNormal">
            {RatingKitHelper.genStatisticLabelHorizontal(totalRatings)}
          </KLabel.Text>
        </View>
        {AnimatedChevronButton}
      </View>
    );
  }, [AnimatedChevronButton, totalRatings, avg]);

  return (
    <View style={containerStyle ? containerStyle : styles.container} testID={testID}>
      {orientation === 'horizontal' ? renderHorizontal : renderVertical}
      {/* @ts-ignore */}
      <Collapsible collapsed={isCollapsed}>{renderBar}</Collapsible>
    </View>
  );
};

(KRatingStatistic as React.ComponentType<KRatingStatisticProps>).defaultProps = {};

const KRatingStatisticWithErrorBoundary = withErrorBoundary(KRatingStatistic, {
  FallbackComponent: () => null,
  onError() {},
});

(KRatingStatisticWithErrorBoundary as ComponentType<KRatingStatisticProps>).displayName =
  'KRatingStatistic';

export default memo(KRatingStatisticWithErrorBoundary);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flexShrink: 1,
    flexGrow: 0,
    alignItems: 'flex-end',
    marginRight: 4,
  },
  labelLeft: {},
  right: {
    flexBasis: 'auto',
    flexShrink: 0,
    flexGrow: 1,
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    marginHorizontal: 8,
  },
  flex: {
    flex: 1,
  },
});
