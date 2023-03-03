import React, { ComponentType, memo, useMemo, useRef } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { StyleSheet, View } from 'react-native';
import Stars from './stars';
import RatingKitHelper from './helper';
import { KRatingBarProps, KRatingSize } from '../../types';
import { TypoHelper } from '../../constants';
import KLabel from '../label';
import KProgress from '../progress';

const KRatingBar = (props: KRatingBarProps) => {
  const {
    type = 'icon',
    values,
    sort = RatingKitHelper.sort,
    labelWidth = RatingKitHelper.labelWidth,
    genPluralLabel = RatingKitHelper.genPluralLabel,
    testID,
  } = props;

  const sizeRef = useRef<KRatingSize>('x-small');

  const maxStars = useMemo(() => RatingKitHelper.getMaxStars(values), [values]);

  const { size: mSize, spacing } = useMemo(
    () => TypoHelper.mapKRatingSizeToNumber(sizeRef.current),
    []
  );

  const starsWidth = useMemo(
    () => mSize * maxStars + spacing * (maxStars - 1),
    [mSize, maxStars, spacing]
  );

  const mValues = useMemo(() => {
    return RatingKitHelper.handleSort(values, sort);
  }, [values, sort]);

  const totalRatings = useMemo(() => RatingKitHelper.getTotalRatings(mValues), [mValues]);

  const renderWithIcon = useMemo(() => {
    return (
      <View testID={testID}>
        {mValues.map((i, index) => {
          return (
            <View style={styles.wrapper} key={`rating-bar-${index}`}>
              <View style={[styles.left, { flexBasis: starsWidth }]}>
                <Stars points={i.points} currentPoints={0} theme={'dark'} size={sizeRef.current} />
              </View>
              <View style={styles.right}>
                <KProgress.Line
                  percent={(i.reviews / totalRatings) * 100}
                  labelTypo="TextXsNormal"
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }, [mValues, starsWidth, totalRatings, testID]);

  const renderWithLabel = useMemo(() => {
    return (
      <View testID={testID}>
        {mValues.map((i, index) => {
          const label = genPluralLabel?.(i.points);
          return (
            <View style={styles.wrapper} key={`rating-bar-${index}`}>
              <View style={[styles.left, styles.labelLeft, { flexBasis: labelWidth }]}>
                <KLabel.Text typo="TextXsMedium">{`${i.points} ${label}`}</KLabel.Text>
              </View>
              <View style={styles.right}>
                <KProgress.Line
                  percent={(i.reviews / totalRatings) * 100}
                  labelTypo="TextXsNormal"
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }, [mValues, labelWidth, totalRatings, genPluralLabel, testID]);

  return type === 'icon' ? renderWithIcon : renderWithLabel;
};

(KRatingBar as React.ComponentType<KRatingBarProps>).defaultProps = {};

const KRatingBarWithErrorBoundary = withErrorBoundary(KRatingBar, {
  FallbackComponent: () => null,
  onError() {},
});

(KRatingBarWithErrorBoundary as ComponentType<KRatingBarProps>).displayName = 'KRatingBar';

export default memo(KRatingBarWithErrorBoundary);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  left: {
    flexShrink: 1,
    flexGrow: 0,
    alignItems: 'flex-end',
    marginRight: 4,
  },
  labelLeft: {
    // alignItems: 'flex-start',
  },
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
  avg: {},
});
