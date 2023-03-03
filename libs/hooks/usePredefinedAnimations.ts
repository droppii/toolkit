import { useCallback, useState } from 'react';
import { runOnJS } from 'react-native-reanimated';

const usePredefinedAnimations = (entering: any, exiting: any) => {
  const [displayed, setDisplayed] = useState(false);

  const onDisplayed = useCallback((dp: boolean) => {
    setDisplayed(dp);
  }, []);

  return {
    displayed: displayed,
    entering: entering.withCallback((finished: boolean) => {
      'worklet';
      if (finished) {
        runOnJS(onDisplayed)(true);
      }
    }),
    exiting: exiting.withCallback((finished: boolean) => {
      'worklet';
      if (finished) {
        runOnJS(onDisplayed)(false);
      }
    }),
  };
};

export default usePredefinedAnimations;
