import Animated from 'react-native-reanimated';
import Base from './base';
import Avatar from './avatar';
import Thumbnail from './thumbnail';
import VectorIcons, { DroppiiNew } from './vectorIcons';
import CommonIcon from './commonIcon';
import Banner from './banner';

const AnimatedDroppiiIcons = Animated.createAnimatedComponent(DroppiiNew);

class KImage {
  Base = Base;

  Avatar = Avatar;

  Thumbnail = Thumbnail;

  VectorIcons = VectorIcons;

  CommonIcon = CommonIcon;

  Banner = Banner;

  AnimatedDroppiiIcons = AnimatedDroppiiIcons;
}

export default new KImage();
