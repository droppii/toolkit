import { SafeAreaView } from 'react-native-safe-area-context';
import Page from './page';
import View from './view';
import ScrollView from './scrollView';
import Touchable from './touchable';
import AwareScrollView from './awareScrollView';
import FlatList from './flatList';
import FlashList from './flashList';
import Collapsible from './collapsible';
import Skeletons from './skeletons';

class KContainer {
  View = View;

  Page = Page;

  ScrollView = ScrollView;

  AwareScrollView = AwareScrollView;

  FlatList = FlatList;

  FlashList = FlashList;

  Touchable = Touchable;

  SafeAreaView = SafeAreaView;

  Collapsible = Collapsible;

  Skeletons = Skeletons;
}

export default new KContainer();
