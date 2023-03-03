import { MutableRefObject, useEffect, useRef } from 'react';

const useCombineRefs = <T>(...refs: any[]): MutableRefObject<T> => {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as MutableRefObject<T>;
};

export default useCombineRefs;
