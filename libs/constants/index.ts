import { createNavigationContainerRef } from '@react-navigation/native';
import {
  WithActionSheetProps,
  WithAlertDialogProps,
  WithBottomSheetProps,
  WithImageViewer,
  WithPopupProps,
  WithToastProps,
} from '@uikit/types';
import { createRef } from 'react';
import { View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';

export { default as KColors } from './colors';
export { default as KDims } from './dimensions';
export { default as Typography } from './typography';
export * from './typography';

export * from './fonts';

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
