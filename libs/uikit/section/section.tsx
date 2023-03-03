import React, { ComponentType, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KSectionProps } from '@uikit/types';
import Block from './bock';
import KSectionHeader from './sectionHeader';
import KDivider from '../divider';
import KContainer from '../container';

const Section = (props: KSectionProps) => {
  const { style, header, dividerProps, blocks, marginT, testID } = props;

  return (
    <KContainer.View style={style} marginT={header ? undefined : marginT} testID={testID}>
      <KSectionHeader {...header} />
      {blocks.map((item, index) =>
        !item ? null : (
          <React.Fragment key={`block-${index}`}>
            <Block {...item} />
            {index < blocks.length - 1 && <KDivider {...dividerProps} />}
          </React.Fragment>
        )
      )}
    </KContainer.View>
  );
};

(Section as React.ComponentType<KSectionProps>).defaultProps = {
  dividerProps: {
    size: 'sm',
    transparent: true,
    type: 'space',
  },
};

const KSectionWithErrorBoundary = withErrorBoundary(Section, {
  FallbackComponent: () => null,
  onError() {},
});

(KSectionWithErrorBoundary as ComponentType<KSectionProps>).displayName = 'KSection';

export default memo(KSectionWithErrorBoundary);
