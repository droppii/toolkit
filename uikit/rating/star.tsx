import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KStarProps } from '../../types';
import { TypoHelper } from '../../constants';
import KContainer from '../container';
import { KColors } from '../../constants';
import KImage from '../image';

const KStar = (props: KStarProps) => {
  const { point, theme = 'light', size, style, onPress, testID } = props;

  const colors = useMemo(() => {
    switch (theme) {
      case 'light':
        return {
          highlight: KColors.palette.warning.w400,
          blur: KColors.gray.light,
        };
      default:
        return {
          highlight: KColors.palette.warning.w400,
          blur: KColors.gray.dark,
        };
    }
  }, [theme]);

  const renderView = useMemo(() => {
    const { size: mSize } = TypoHelper.mapKRatingSizeToNumber(size);
    const name = point >= 0.5 && point < 1 ? 'star-half-b' : 'star-b';

    const mStyle = { opacity: point >= 0.5 ? 1 : 0.2 };

    return (
      <KImage.VectorIcons
        name={name}
        color={point >= 0.5 ? colors.highlight : colors.blur}
        style={[style, mStyle]}
        size={mSize}
        testID={testID}
      />
    );
  }, [point, size, colors, style, testID]);

  return onPress ? (
    <KContainer.Touchable onPress={onPress}>{renderView}</KContainer.Touchable>
  ) : (
    renderView
  );
};

(KStar as React.ComponentType<KStarProps>).defaultProps = {
  size: 'medium',
};

const KStarWithErrorBoundary = withErrorBoundary(KStar, {
  FallbackComponent: () => null,
  onError() {},
});

(KStarWithErrorBoundary as ComponentType<KStarProps>).displayName = 'KStar';

export default memo(KStarWithErrorBoundary);
