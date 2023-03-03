import React, { ComponentType, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { get, isEmpty } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { KActionBarProps, KButtonProps } from '../../types';
import { KColors } from '../../constants';
import KContainer from '../container';
import KLabel from '../label';
import KButton from '../button';
import KImage from '../image';

const KActionBar = (props: KActionBarProps) => {
  const {
    buttons,
    destructiveIndex,
    primaryIndex = 0,
    type,
    containerStyle,
    background = KColors.white,
    testID,
  } = props;

  const renderHorizontalMenuIcon = useMemo(() => {
    return (
      <KContainer.View row>
        {buttons.map((i, index) => {
          const firstItem = index === 0;
          const lastItem = index === buttons.length - 1;
          const tintColor = get(KColors, `${i.kind}.normal`, KColors.gray.dark);

          return (
            <KContainer.Touchable
              key={`horizontal-menu-icon-${index}`}
              padding="1rem"
              flex
              center
              brC={KColors.border.light}
              brLW={!firstItem ? 0.5 : undefined}
              brRW={!lastItem ? 0.5 : undefined}
              onPress={i.onPress}
              testID={i.testID}
            >
              <KImage.CommonIcon {...i.icon} tintColor={tintColor} style={styles.icon} size={24} />
              <KLabel.Text numberOfLines={2} textAlign color={tintColor} typo="TextNmBold">
                {i.label}
              </KLabel.Text>
            </KContainer.Touchable>
          );
        })}
      </KContainer.View>
    );
  }, [buttons]);

  const renderMainRight = useMemo(() => {
    const clone = [...buttons];
    const primary = clone.shift();

    return (
      <KContainer.View row alignItems padding={'1rem'}>
        <KContainer.View flex row alignItems paddingR={'1rem'}>
          {clone.map((i, index) => {
            const firstItem = index === 0;
            const lastItem = index === buttons.length - 1;

            const tintColor =
              index === primaryIndex
                ? KColors.primary.normal
                : index === destructiveIndex
                ? KColors.danger.normal
                : get(KColors, `${i.kind}.normal`, KColors.gray.dark);

            return (
              <KContainer.Touchable
                key={`main-right-${index}`}
                marginL={!firstItem ? '0.5rem' : undefined}
                marginR={!lastItem ? '0.5rem' : undefined}
                onPress={i.onPress}
                testID={i.testID}
              >
                <KLabel.Text color={tintColor} typo="TextNmNormal">
                  {i.label}
                </KLabel.Text>
              </KContainer.Touchable>
            );
          })}
        </KContainer.View>
        <KButton.Solid
          kind="primary"
          size="lg"
          weight="bold"
          label={primary?.label}
          onPress={primary?.onPress}
          testID={primary?.testID}
        />
      </KContainer.View>
    );
  }, [buttons, primaryIndex, destructiveIndex]);

  const renderHorizontalButton = useMemo(() => {
    return (
      <KContainer.View row center paddingV={'1rem'}>
        {buttons.map((i, index) => {
          const firstItem = index === 0;
          const lastItem = index === buttons.length - 1;
          return (
            <KContainer.View
              key={`horizontal-button-${index}`}
              flex
              marginL={!firstItem ? '0.25rem' : undefined}
              marginR={!lastItem ? '0.25rem' : undefined}
            >
              <KButton.Solid
                kind={
                  index === primaryIndex
                    ? 'primary'
                    : index === destructiveIndex
                    ? 'danger'
                    : i.kind
                }
                weight={[primaryIndex, destructiveIndex].includes(index) ? 'bold' : 'normal'}
                size="lg"
                stretch
                label={i.label}
                onPress={i.onPress}
                testID={i.testID}
              />
            </KContainer.View>
          );
        })}
      </KContainer.View>
    );
  }, [buttons, primaryIndex, destructiveIndex]);

  const renderHorizontalMenu = useMemo(() => {
    return (
      <KContainer.View row center paddingH={'1rem'}>
        {buttons.map((i, index) => {
          const firstItem = index === 0;
          const lastItem = index === buttons.length - 1;
          return (
            <KContainer.View
              key={`horizontal-button-${index}`}
              flex
              brLW={!firstItem ? 0.5 : undefined}
              brRW={!lastItem ? 0.5 : undefined}
              brC={KColors.border.light}
            >
              <KButton.Transparent
                kind={
                  index === primaryIndex
                    ? 'primary'
                    : index === destructiveIndex
                    ? 'danger'
                    : i.kind
                }
                size="lg"
                weight={[primaryIndex, destructiveIndex].indexOf(index) ? 'bold' : 'normal'}
                stretch
                label={i.label}
                onPress={i.onPress}
                testID={i.testID}
              />
            </KContainer.View>
          );
        })}
      </KContainer.View>
    );
  }, [buttons, primaryIndex, destructiveIndex]);

  const renderSingle = useMemo(() => {
    const btn = buttons[0];
    return (
      <KContainer.View padding={'1rem'}>
        <KButton.Solid
          kind={primaryIndex === 0 ? 'primary' : destructiveIndex === 0 ? 'danger' : btn?.kind}
          size="lg"
          weight="bold"
          stretch
          label={btn?.label}
          onPress={btn?.onPress}
          testID={btn?.testID}
        />
      </KContainer.View>
    );
  }, [buttons, primaryIndex, destructiveIndex]);

  const renderVerticalMenu = useMemo(() => {
    return (
      <KContainer.View paddingH={'1rem'}>
        {buttons.map((i, index) => {
          const lastItem = index === buttons.length - 1;
          return (
            <KContainer.View
              key={`vertical-menu-${index}`}
              brBW={!lastItem ? 1 : undefined}
              brC={KColors.border.light}
            >
              <KButton.Transparent
                kind={destructiveIndex === index && primaryIndex !== index ? 'danger' : 'primary'}
                size="lg"
                weight={[primaryIndex, destructiveIndex].includes(index) ? 'bold' : 'normal'}
                stretch
                label={i.label}
                onPress={i.onPress}
                testID={i.testID}
              />
            </KContainer.View>
          );
        })}
      </KContainer.View>
    );
  }, [buttons, primaryIndex, destructiveIndex]);

  if (isEmpty(buttons)) {
    return null;
  }

  return (
    <KContainer.View style={containerStyle} background={background} testID={testID}>
      {type === 'horizontal-button'
        ? renderHorizontalButton
        : type === 'horizontal-menu'
        ? renderHorizontalMenu
        : type === 'horizontal-menu-icon'
        ? renderHorizontalMenuIcon
        : type === 'main-action-right'
        ? renderMainRight
        : type === 'single-button'
        ? renderSingle
        : renderVerticalMenu}
    </KContainer.View>
  );
};

const KActionBarWithErrorBoundary = withErrorBoundary(KActionBar, {
  FallbackComponent: () => null,
  onError() {},
});

(KActionBarWithErrorBoundary as ComponentType<KButtonProps>).defaultProps = {};

(KActionBarWithErrorBoundary as ComponentType<KButtonProps>).displayName = 'KActionBar';

export default memo(KActionBar);

const styles = StyleSheet.create({
  icon: {
    marginBottom: 10,
  },
});
