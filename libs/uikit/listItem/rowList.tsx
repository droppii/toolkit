import React, { ComponentType, forwardRef, memo } from 'react';
import { View } from 'react-native';
import { KRowListProps } from '@uikit/types';
import RowNote from './rowNote';
import { KColors } from '../../constants';
import KContainer from '../container';

const KRowList = forwardRef<View, KRowListProps>((props, ref) => {
  const {
    padding = '1rem',
    containerStyle,
    contentStyle,
    background,
    brBC,
    brBW,
    note,
    onPress,
    testID,
    ...rest
  } = props;

  const Wrapper = onPress ? KContainer.Touchable : KContainer.View;

  return (
    <Wrapper
      onPress={onPress}
      // @ts-ignore
      ref={ref}
      style={containerStyle}
      paddingH={padding}
      background={background}
      testID={testID}
    >
      <KContainer.View flex style={contentStyle} brBC={brBC} brBW={brBW} paddingV={padding}>
        <KContainer.View {...rest} flex style={contentStyle} row alignItems />
      </KContainer.View>
      {note && <RowNote {...note} brBC={brBC} brBW={brBW} padding={padding} />}
    </Wrapper>
  );
});

(KRowList as ComponentType<KRowListProps>).displayName = 'KRowList';
(KRowList as ComponentType<KRowListProps>).defaultProps = {
  brBC: KColors.border.light,
  brBW: 1,
};

export default memo(KRowList);
