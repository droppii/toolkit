import React from 'react';
import { KButtonLink, KButtonOutline, KButtonSolid, KButtonTransparent } from './base';
import Group from './group';
import GroupControl from './groupControl';
import Stepper from './stepper';
import BottomActions from './bottomActions';
import { TestModifier } from '../../types';
import KImage from '../image';
import { KColors } from '../../constants';

class KButton {
  Link = KButtonLink;

  Outline = KButtonOutline;

  Solid = KButtonSolid;

  Transparent = KButtonTransparent;

  Group = Group;

  GroupControl = GroupControl;

  Stepper = Stepper;

  BottomActions = BottomActions;

  Close = (props: { size?: number; color?: string; onPress?: () => void } & TestModifier) => {
    return (
      <KImage.VectorIcons
        name="close-o"
        size={props.size || 24}
        color={props.color || KColors.gray.dark}
        onPress={props.onPress}
      />
    );
  };

  Back = (props: { size?: number; color?: string; onPress?: () => void }) => {
    return (
      <KImage.VectorIcons
        name="arrow-left-o"
        size={props.size}
        color={props.color}
        onPress={props.onPress}
      />
    );
  };
}

export default new KButton();
