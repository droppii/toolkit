import React, { ComponentType, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KSectionProps, KSectionHeaderProps } from '../../types';
import KContainer from '../container';
import KLabel from '../label';
import { KColors } from '../../constants';

const KSectionHeader = (props: KSectionHeaderProps) => {
  const { title, subTitle, testID } = props;

  if (!title && !subTitle) {
    return null;
  }

  return (
    <KContainer.View
      padding={'1rem'}
      paddingT="1.5rem"
      background={KColors.pageBackground}
      testID={testID}
    >
      {title && (
        <KLabel.Text typo={title.typo || 'TitleSection'} color={title.color || KColors.gray.light}>
          {title.text}
        </KLabel.Text>
      )}

      {subTitle && (
        <KLabel.Text
          marginT={title ? '0.25rem' : 0}
          typo={subTitle.typo || 'TextXsNormal'}
          color={subTitle.color || KColors.gray.light}
        >
          {subTitle.text}
        </KLabel.Text>
      )}
    </KContainer.View>
  );
};

(KSectionHeader as React.ComponentType<KSectionProps>).defaultProps = {
  dividerProps: {
    size: 'sm',
    transparent: true,
    type: 'space',
  },
};

const KSectionHeaderWithErrorBoundary = withErrorBoundary(KSectionHeader, {
  FallbackComponent: () => null,
  onError() {},
});

(KSectionHeaderWithErrorBoundary as ComponentType<KSectionProps>).displayName = 'KSectionHeader';

export default memo(KSectionHeaderWithErrorBoundary);
