import React, { ComponentType, memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withErrorBoundary } from 'react-error-boundary';
import { get } from 'lodash';
import { KChipNode, KChipProps } from '../../types';
import KContainer from '../container';
import KColors from '../../constants/colors';
import KImage from '../image';
import { KSpacingValue } from '../../constants';
import KLabel from '../label';

const KChips = memo(
  ({
    label,
    leftNode,
    rightNode,
    size,
    type,
    isActive,
    status,
    br = '2x',
    typo,
    onPress,
    testID,
  }: KChipProps) => {
    const Wrapper = onPress ? KContainer.Touchable : KContainer.View;
    const options = useMemo(() => {
      const color = get(KColors, `${status}.dark`, KColors.primary.dark);
      const outlineColor = get(KColors, `palette.${status}.w25`, KColors.palette.primary.w25);
      const solidActiveColor = get(KColors, `${status}.dark`, KColors.primary.dark);
      const solidInActiveColor = get(KColors, `${status}.normal`, KColors.primary.normal);
      const lightActiveColor = get(KColors, `${status}.normal`, KColors.primary.normal);
      const lightInActiveColor = get(KColors, `palette.${status}.w25`, KColors.palette.primary.w25);
      const gradientColor = get(
        KColors,
        `gradients.${status}.light`,
        KColors.gradients.primary.light
      );

      return {
        typo: typo || (size === 'xs' ? 'Text2XsBold' : size === 'sm' ? 'TextXsBold' : 'TextNmBold'),
        iconSize: size === 'md' ? 20 : 16,
        tintColor: type === 'outline' || (type === 'light' && !isActive) ? color : KColors.white,
        borderWidth: type === 'outline' ? 1 : 0,
        height: size === 'xs' ? 28 : size === 'sm' ? 32 : 40,
        colors:
          type === 'outline'
            ? isActive
              ? [outlineColor, outlineColor]
              : [KColors.white, KColors.white]
            : type === 'solid'
            ? isActive
              ? [solidActiveColor, solidActiveColor]
              : [solidInActiveColor, solidInActiveColor]
            : type === 'light'
            ? isActive
              ? [lightActiveColor, lightActiveColor]
              : [lightInActiveColor, lightInActiveColor]
            : gradientColor,
      };
    }, [isActive, size, status, type, typo]);

    const renderNode = useCallback(
      (node: KChipNode | undefined, isLeft?: boolean) => {
        if (!node) {
          return null;
        }
        const { icon, onPress: onIconPress, avatarUri } = node;
        const mg = KSpacingValue['0.25rem'];
        const style = { marginLeft: isLeft ? 0 : mg, marginRight: isLeft ? mg : 0 };
        return (
          <KImage.CommonIcon
            imageSource={avatarUri}
            {...icon}
            tintColor={options.tintColor}
            size={options.iconSize}
            onPress={onIconPress}
            containerStyle={style}
          />
        );
      },
      [options]
    );

    return label ? (
      <Wrapper
        onPress={onPress}
        br={br}
        style={styles.wrapper}
        brW={options.borderWidth}
        brC={options.tintColor}
        justifyContent
        testID={testID}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={options.colors}
          style={[styles.container, { height: options.height }]}
        >
          {renderNode(leftNode, true)}
          <KLabel.Text typo={options.typo as any} color={options.tintColor}>
            {label}
          </KLabel.Text>
          {renderNode(rightNode)}
        </LinearGradient>
      </Wrapper>
    ) : null;
  }
);

const KChipsWithErrorBoundary = withErrorBoundary(KChips, {
  FallbackComponent: () => null,
  onError() {},
});

(KChipsWithErrorBoundary as ComponentType<KChipProps>).defaultProps = {};

(KChipsWithErrorBoundary as ComponentType<KChipProps>).displayName = 'KChips';

export default KChipsWithErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: KSpacingValue['0.5rem'],
  },
  wrapper: {
    overflow: 'hidden',
  },
});
