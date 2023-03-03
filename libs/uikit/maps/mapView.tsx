import { KMapViewProps } from '@uikit/types';
import React, { ComponentType, forwardRef, memo } from 'react';
import MapView from 'react-native-maps';

const KMapView = forwardRef<MapView, KMapViewProps>((props, ref) => {
  return <MapView ref={ref} {...props} />;
});

(KMapView as React.ComponentType<KMapViewProps>).defaultProps = {
  showsUserLocation: true,
  followsUserLocation: true,
  showsMyLocationButton: true,
  showsCompass: false,
};

(KMapView as ComponentType<KMapViewProps>).displayName = 'KMapView';

export default memo(KMapView);
