import React, { memo } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import View from './view';
import { KSkeletonProps } from '../../types';
import { KDims } from '../../constants';
import { KSpacingValue } from '../../constants';

const ITEM_RIGHT_WIDTH = KDims.width - KSpacingValue['1rem'] * 2 - 20 - 60;
const SPEED = 2000;

const Skeletons = (props: KSkeletonProps) => {
  return (
    <View testID={props.testID}>
      {Array.from({ length: props.size ?? 7 })
        .fill(1)
        .map((_, i) => {
          return (
            <View padding={'1rem'} key={`${i}`}>
              <SkeletonPlaceholder borderRadius={4} speed={SPEED} direction="right">
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                  <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                  <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item width={ITEM_RIGHT_WIDTH} height={20} />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={ITEM_RIGHT_WIDTH * 0.75}
                      height={20}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          );
        })}
    </View>
  );
};

export default memo(Skeletons);
