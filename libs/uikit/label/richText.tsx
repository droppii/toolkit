import React, { ComponentType, forwardRef, memo } from 'react';
import { RichTextOptions } from '@uikit/types';
import { Trans } from 'react-i18next';
import { Text as RNText } from 'react-native';
import Text from './text';

const KRichText = forwardRef<RNText, RichTextOptions>((props, ref) => {
  const { richTextOptions, ...rest } = props;

  return (
    <Text {...rest} ref={ref}>
      {/* @ts-ignore */}
      <Trans parent={Text} {...richTextOptions} {...rest} />
    </Text>
  );
});

(KRichText as ComponentType<RichTextOptions>).defaultProps = {};

(KRichText as ComponentType<RichTextOptions>).displayName = 'KRichText';

export default memo(KRichText);
