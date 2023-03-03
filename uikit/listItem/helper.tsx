import React from 'react';
import { KListItemBaseItemProps } from '../../types';
import KImage from '../image';
import KButton from '../button';
import KContainer from '../container';
import KLabel from '../label';
import { KColors } from '../../constants';

const ListItemContent = (props: Pick<KListItemBaseItemProps, 'content'>) => {
  const { content } = props;
  if (!content) {
    return null;
  }

  if (content?.icon) {
    return (
      <KImage.CommonIcon
        {...content.icon}
        size={20}
        tintColor={content.icon.tintColor || KColors.gray.dark}
      />
    );
  }
  if (content?.button) {
    const { params, type } = content.button;
    const Wrapper =
      type === 'link'
        ? KButton.Link
        : type === 'outline'
        ? KButton.Outline
        : type === 'transparent'
        ? KButton.Transparent
        : KButton.Solid;
    return <Wrapper {...params} />;
  }
  if (content?.label) {
    return (
      <KLabel.Text typo={content.label?.typo ?? 'TextMdBold'} color={content.label?.color}>
        {content.label.text}
      </KLabel.Text>
    );
  }
  return content.jsx ?? null;
};

const ListItemLabelAndDes = (props: any) => {
  const {
    typo = 'TextMdMedium',
    label,
    customLabel,
    description,
    descriptionColor,
    content,
    tintColor,
  } = props;

  return (
    <KContainer.View flex>
      {customLabel || (
        <KLabel.Text typo={typo} color={tintColor}>
          {label}
        </KLabel.Text>
      )}
      {!!description && (
        <KLabel.Text
          color={descriptionColor ?? KColors.gray.light}
          typo="TextXsNormal"
          marginT={'0.25rem'}
        >
          {description}
        </KLabel.Text>
      )}
      {content && (
        <KContainer.View alignSelf="baseline" marginT={'0.5rem'}>
          <ListItemContent content={content} />
        </KContainer.View>
      )}
    </KContainer.View>
  );
};

export { ListItemContent, ListItemLabelAndDes };
