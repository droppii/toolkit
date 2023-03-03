import { useCallback, useState } from 'react';
import { KeyboardEvent } from 'react-native';
import useKeyboardEvents from './useKeyboardEvents';

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onShowHandler = useCallback((e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  }, []);

  const onHideHandler = useCallback(() => {
    setKeyboardHeight(0);
  }, []);

  useKeyboardEvents({
    onShowHandler,
    onHideHandler,
  });

  return keyboardHeight;
};

export default useKeyboardHeight;
