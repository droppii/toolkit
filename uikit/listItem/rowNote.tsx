import React, { ComponentType, memo } from 'react';
import { KRowNoteProps } from '../../types';
import KLabel from '../label';
import KContainer from '../container';
import { KSpacingValue } from '../../constants';
import { KColors } from '../../constants';

const KRowNote = (props: KRowNoteProps) => {
  const { text, padding, brBC, brBW, color = KColors.gray.normal, typo, ...rest } = props;

  const pd = padding ? KSpacingValue[padding] : 0;

  return (
    <KContainer.View
      style={{ paddingTop: pd / 2, paddingBottom: pd }}
      brBC={brBC}
      brBW={brBW}
      {...rest}
    >
      <KLabel.Text typo={typo} color={color}>
        {text}
      </KLabel.Text>
    </KContainer.View>
  );
};

(KRowNote as ComponentType<KRowNoteProps>).displayName = 'KRowNote';
(KRowNote as ComponentType<KRowNoteProps>).defaultProps = {};

export default memo(KRowNote);
