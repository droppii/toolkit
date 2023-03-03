import React, { ComponentType, memo, useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { KBlockProps } from '@uikit/types';
import KContainer from '../container';
import KImage from '../image';
import KLabel from '../label';
import KNavigation from '../navigation';
import { KColors } from '../../constants';

const KBlock = (props: KBlockProps) => {
  const { tabbar, header, border, content, background, testID } = props;
  const {
    description,
    icon,
    size = 'medium',
    subTitle,
    title,
    uppercase,
    withChevron,
    rightNode,
    marginContent,
  } = header || {};

  const titleLabel = useMemo(
    () => (
      <KLabel.Text
        typo={
          size === 'small'
            ? uppercase
              ? 'TitleBlockSmallUpper'
              : 'TitleBlockSmall'
            : size === 'medium'
            ? 'TitleBlockMedium'
            : 'TextMdBold'
        }
      >
        {title}
      </KLabel.Text>
    ),
    [title, uppercase, size]
  );

  return (
    <KContainer.View background={background} testID={testID}>
      {header && (
        <KContainer.View>
          <KContainer.View row alignItems padding={'1rem'}>
            {icon && (
              <KContainer.View marginR={'1rem'}>
                <KImage.CommonIcon
                  {...icon}
                  tintColor={icon.tintColor || KColors.gray.dark}
                  size={24}
                />
              </KContainer.View>
            )}

            <KContainer.View flex>
              <KContainer.View>
                {subTitle && (
                  <KLabel.Text typo="TextSmBold" color={KColors.gray.light} marginB="0.25rem">
                    {subTitle}
                  </KLabel.Text>
                )}
                {titleLabel}
                {description && (
                  <KLabel.Text typo="TextXsNormal" color={KColors.gray.light} marginT="0.25rem">
                    {description}
                  </KLabel.Text>
                )}
              </KContainer.View>
            </KContainer.View>

            {rightNode}

            {withChevron && <KImage.VectorIcons name="angle-right-o" size={20} />}
          </KContainer.View>

          {tabbar && (
            <KContainer.View paddingB={marginContent}>
              <KNavigation.TabBar {...tabbar} buttons={tabbar?.buttons?.map(i => ({ label: i }))} />
            </KContainer.View>
          )}

          {border && (
            <KContainer.View
              marginH={'1rem'}
              paddingB={marginContent}
              brC={KColors.border.light}
              brTW={1}
            />
          )}
        </KContainer.View>
      )}
      {typeof content === 'function' ? content() : content}
    </KContainer.View>
  );
};

(KBlock as React.ComponentType<KBlockProps>).defaultProps = {
  background: KColors.white,
};

const KBlockWithErrorBoundary = withErrorBoundary(KBlock, {
  FallbackComponent: () => null,
  onError() {},
});

(KBlockWithErrorBoundary as ComponentType<KBlockProps>).displayName = 'KBlock';

export default memo(KBlockWithErrorBoundary);
