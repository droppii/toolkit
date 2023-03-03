import { createNavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import {
  WithActionSheetProps,
  WithAlertDialogProps,
  WithBottomSheetProps,
  WithImageViewer,
  WithPopupProps,
  WithToastProps,
} from '../types';

export { default as KColors } from './colors';
export { default as KDims } from './dimensions';
export { default as Typography } from './typography';
export * from './typography';

export * from './fonts';
export const bcaFontSelection = require('./bcaFontSelection.json');
export const droppiiFontSelection = require('./droppiiFontSelection.json');

export const navigationRef = createNavigationContainerRef<any>();
export const drawerContentRef = createRef<View>();
export const drawerRef = createRef<DrawerLayout>() as React.MutableRefObject<DrawerLayout>;
export const actionSheetRef = createRef<WithActionSheetProps>();
export const alertRef = createRef<WithAlertDialogProps>();
export const popupRef = createRef<WithPopupProps>();
export const bottomSheetRef = createRef<WithBottomSheetProps>();
export const toastRef = createRef<WithToastProps>();
export const imageViewerRef = createRef<WithImageViewer>();
export const Z_INDEX_PRIORITY = {
  alert: Number.MAX_SAFE_INTEGER,
  overlay: Number.MAX_SAFE_INTEGER - 1,
  toast: Number.MAX_SAFE_INTEGER - 2,
  actionSheet: Number.MAX_SAFE_INTEGER - 3,
  imageViewer: Number.MAX_SAFE_INTEGER - 4,
  bottomSheet: Number.MAX_SAFE_INTEGER - 5,
  popup: Number.MAX_SAFE_INTEGER - 6,
};
