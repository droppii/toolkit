import React, { ComponentType, memo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KDividerProps } from '../../types';
import { KColors } from '../../constants';
import KContainer from '../container';

const KDivider = (props: KDividerProps) => {
  const { size, type, background, vertical, ...rest } = props;

  if (type === 'line') {
    if (vertical) {
      return (
        <KContainer.View
          {...rest}
          height={'100%'}
          paddingH={size === 'xs' ? '0.25rem' : size === 'sm' ? '0.5rem' : '1rem'}
        >
          <KContainer.View height={1} background={background} />
        </KContainer.View>
      );
    }
    return (
      <KContainer.View
        {...rest}
        width={'100%'}
        paddingV={size === 'xs' ? '0.25rem' : size === 'sm' ? '0.5rem' : '1rem'}
      >
        <KContainer.View height={1} background={background} />
      </KContainer.View>
    );
  }
  if (vertical) {
    <KContainer.View
      {...rest}
      background={background}
      height={'100%'}
      paddingH={
        size === 'hairline'
          ? undefined
          : size === 'xs'
          ? '0.25rem'
          : size === 'sm'
          ? '0.5rem'
          : '1rem'
      }
    >
      <KContainer.View width={1} />
    </KContainer.View>;
  }
  return (
    <KContainer.View
      {...rest}
      background={background}
      width={'100%'}
      paddingV={
        size === 'hairline'
          ? undefined
          : size === 'xs'
          ? '0.25rem'
          : size === 'sm'
          ? '0.5rem'
          : '1rem'
      }
    >
      <KContainer.View height={1} />
    </KContainer.View>
  );
};

const KDividerWithErrorBoundary = withErrorBoundary(KDivider, {
  FallbackComponent: () => null,
  onError() {},
});

(KDividerWithErrorBoundary as ComponentType<KDividerProps>).defaultProps = {
  background: KColors.pageBackground,
};

(KDividerWithErrorBoundary as ComponentType<KDividerProps>).displayName = 'KDivider';

export default memo(KDividerWithErrorBoundary);
