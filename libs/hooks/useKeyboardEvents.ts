import { DependencyList, useEffect } from 'react';
import { Keyboard, Platform, KeyboardEvent } from 'react-native';

const useKeyboardEvents = (
  payload: {
    onShowHandler?: (e: KeyboardEvent) => void;
    onHideHandler?: (e: KeyboardEvent) => void;
  },
  deps?: DependencyList
) => {
  const { onShowHandler, onHideHandler } = payload;

  useEffect(() => {
    let showSub: any, hideSub: any;

    if (onShowHandler) {
      showSub = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        onShowHandler
      );
    }

    if (onHideHandler) {
      hideSub = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        onHideHandler
      );
    }

    return () => {
      showSub?.remove();
      hideSub?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useKeyboardEvents;
