import React, { ComponentType, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KBottomActionsProps } from '@uikit/types';
import { KColors, KDims } from '../../constants';
import KContainer from '../container';
import { KSpacingValue } from '../../constants';

const KBottomActions = (props: KBottomActionsProps) => {
  const { buttons, topNode, border, background = KColors.white, row, ignoreEdge, testID } = props;

  const paddingBottom =
    KDims.bottomSafeHeight > 0 ? -KSpacingValue['0.5rem'] : KSpacingValue['1rem'];

  return (
    <KContainer.View
      edges={ignoreEdge ? undefined : ['bottom']}
      brTW={border ? 1 : 0}
      brC={KColors.border.light}
      background={background}
      row={row}
      padding="1rem"
      style={{ paddingBottom }}
      testID={testID}
    >
      {topNode}
      <KContainer.View row alignItems>
        {buttons.map((i, index) => (
          <KContainer.View
            key={`button-${index}`}
            flex={i.flex ?? 1}
            marginR={index === buttons.length - 1 ? 0 : '0.25rem'}
            marginL={index === 0 ? 0 : '0.25rem'}
          >
            {i.jsx}
          </KContainer.View>
        ))}
      </KContainer.View>
    </KContainer.View>
  );
};

const KBottomActionsWithErrorBoundary = withErrorBoundary(KBottomActions, {
  FallbackComponent: () => null,
  onError() {},
});

(KBottomActionsWithErrorBoundary as ComponentType<KBottomActionsProps>).defaultProps = {
  border: true,
};

(KBottomActionsWithErrorBoundary as ComponentType<KBottomActionsProps>).displayName =
  'KBottomActions';

export default memo(KBottomActionsWithErrorBoundary);
