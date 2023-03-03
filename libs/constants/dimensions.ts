import { Dimensions, Platform, StatusBar } from 'react-native';
import deviceInfoModule from 'react-native-device-info';

class KDims {
  os = Platform.OS;

  width = Dimensions.get('window').width;

  height = Dimensions.get('window').height;

  isIphoneX = Platform.OS === 'ios' && !deviceInfoModule.isTablet() && deviceInfoModule.hasNotch();

  topBarSafeHeight = this.isIphoneX ? 44 : this.os === 'ios' ? 20 : 0;

  statusBarHeight = Platform.select({
    ios: this.isIphoneX ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0,
  });

  bottomSafeHeight = this.isIphoneX ? 34 : 0;

  bottomTabHeight = 58;
}

export default new KDims();
