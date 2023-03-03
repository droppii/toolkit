import { Appearance } from '@uikit/types';
import { useMemo } from 'react';
import { Typography } from '../constants';

const useTheme = (theme: Appearance = 'light', fontScale = 1) => {
  const typo = useMemo(() => {
    Typography.updateValue(theme, fontScale);
    return Typography;
  }, [theme, fontScale]);

  return typo;
};

export default useTheme;
