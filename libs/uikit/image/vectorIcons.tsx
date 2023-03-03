import React, { ComponentType, memo, useMemo } from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { withErrorBoundary } from 'react-error-boundary';
import { KVectorIconsProps } from '@uikit/types';
import { KColors } from '../../constants';
import { JSONAssets } from '../../assets';
import KContainer from '../container';

const Droppii = createIconSetFromIcoMoon(JSONAssets.bcaFontSelection);
export const DroppiiNew = createIconSetFromIcoMoon(JSONAssets.droppiiFontSelection);

const KVectorIcon = memo((props: KVectorIconsProps) => {
  const { provider = 'DroppiiNew', containerStyle, onPress, testID, style, ...rest } = props;
  const Provider = useMemo(() => {
    switch (provider) {
      case 'Droppii':
        return Droppii;
      case 'DroppiiNew':
        return DroppiiNew;
      case 'Entypo':
        return Entypo;
      case 'EvilsIcons':
        return EvilIcons;
      case 'Feather':
        return Feather;
      case 'FontAwesome':
        return FontAwesome;
      case 'Foundation':
        return Foundation;
      case 'SimpleLineIcons':
        return SimpleLineIcons;
      case 'MaterialIcons':
        return MaterialIcons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      case 'Octicons':
        return Octicons;
      case 'Zocial':
        return Zocial;
      default:
        return Ionicons;
    }
  }, [provider]);

  if (onPress) {
    return (
      <KContainer.Touchable onPress={onPress} style={containerStyle}>
        {/* @ts-ignore */}
        <Provider {...rest} testID={testID} style={style as any} />
      </KContainer.Touchable>
    );
  }

  if (containerStyle) {
    return (
      <KContainer.View style={containerStyle}>
        {/* @ts-ignore */}
        <Provider {...rest} testID={testID} style={style as any} />
      </KContainer.View>
    );
  }
  return <Provider {...rest} testID={testID} style={style as any} />;
});

const KVectorIconsWithErrorBoundary = withErrorBoundary(KVectorIcon, {
  FallbackComponent: () => null,
  onError() {},
});

(KVectorIconsWithErrorBoundary as ComponentType<KVectorIconsProps>).defaultProps = {
  provider: 'DroppiiNew',
  name: 'ios-search',
  color: KColors.gray.dark,
  size: 20,
};

(KVectorIconsWithErrorBoundary as ComponentType<KVectorIconsProps>).displayName = 'KVectorIcons';

export default memo(KVectorIconsWithErrorBoundary);
