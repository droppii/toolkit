declare module '@uikit/types' {
  import { MutableRefObject, RefObject } from 'react';
  import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
  import {
    ActionSheetIOSOptions,
    ImageStyle,
    ScrollViewProps,
    StyleProp,
    SwitchProps,
    TextInput,
    TextInputProps,
    TextProps,
    ViewProps,
    ViewStyle,
  } from 'react-native';
  import { FastImageProps } from 'react-native-fast-image';
  import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
  import { CollapsibleProps } from 'react-native-collapsible';
  import { FlashListProps } from '@shopify/flash-list';
  import { FlatListProps } from 'react-native';
  import { MapViewProps } from 'react-native-maps';

  export type TypographyModifier =
    | 'Page'
    | 'H1'
    | 'H2'
    | 'H3'
    | 'H4'
    | 'H5'
    | 'H6'
    | 'TitleSection'
    | 'TitleBlockMedium'
    | 'TitleBlockSmall'
    | 'TitleBlockSmallUpper'
    | 'FormFieldLabel'
    | 'TextNote'
    | 'ItemPriceBefore'
    | 'ItemPriceCurrent'
    | 'ItemCommission'
    | 'ScreenTitle'
    | 'ScreenSubTitle'
    | 'Text3xLgBold'
    | 'Text2xLgBold'
    | 'TextXLgBold'
    | 'TextLgBold'
    | 'TextMdBold'
    | 'TextNmBold'
    | 'TextSmBold'
    | 'TextXsBold'
    | 'Text2XsBold'
    | 'Text3xLgMedium'
    | 'Text2xLgMedium'
    | 'TextXLgMedium'
    | 'TextLgMedium'
    | 'TextMdMedium'
    | 'TextNmMedium'
    | 'TextSmMedium'
    | 'TextXsMedium'
    | 'Text2XsMedium'
    | 'Text3xLgNormal'
    | 'Text2xLgNormal'
    | 'TextXLgNormal'
    | 'TextLgNormal'
    | 'TextMdNormal'
    | 'TextNmNormal'
    | 'TextSmNormal'
    | 'TextXsNormal'
    | 'Text2XsNormal'
    | 'Display3xLgBold'
    | 'Display2xLgBold'
    | 'DisplayXLgBold'
    | 'DisplayLgBold'
    | 'DisplayMdBold'
    | 'DisplayNmBold'
    | 'DisplaySmBold'
    | 'DisplayXsBold'
    | 'Display2XsBold'
    | 'Display3xLgMedium'
    | 'Display2xLgMedium'
    | 'DisplayXLgMedium'
    | 'DisplayLgMedium'
    | 'DisplayMdMedium'
    | 'DisplayNmMedium'
    | 'DisplaySmMedium'
    | 'DisplayXsMedium'
    | 'Display2XsMedium'
    | 'Display3xLgNormal'
    | 'Display2xLgNormal'
    | 'DisplayXLgNormal'
    | 'DisplayLgNormal'
    | 'DisplayMdNormal'
    | 'DisplayNmNormal'
    | 'DisplaySmNormal'
    | 'DisplayXsNormal'
    | 'Display2XsNormal';

  export type Appearance = 'dark' | 'light';

  export interface IImage {
    url: string;
  }

  export interface ImageViewerParams {
    images: IImage[];
    initIndex?: number;
    download?: boolean;
    pagination?: boolean;
    logParams?: any;
  }

  export interface TextModifiers {
    color?: string;
    underline?: true;
    underlineColor?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    typo?: TypographyModifier;
    textAlign?: true | 'center' | 'left' | 'right';
  }

  export interface LayoutModifiers {
    flex?: number | true; // flex value, if flex === true, it means flex = 1
    flexS?: number; // flexShirk
    flexG?: number; // flexGrow
    flexW?: 'wrap' | 'nowrap' | 'wrap-reverse';
    row?: boolean;
    reverse?: boolean;
    alignItems?: true | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined;
    alignSelf?: true | 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    justifyContent?:
      | true
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    center?: boolean;
  }

  export interface MarginModifiers {
    margin?: KSpacing | 0;
    marginL?: KSpacing | 0;
    marginR?: KSpacing | 0;
    marginT?: KSpacing | 0;
    marginB?: KSpacing | 0;
    marginH?: KSpacing | 0;
    marginV?: KSpacing | 0;
  }

  export interface PaddingModifiers {
    padding?: KSpacing | 0;
    paddingL?: KSpacing | 0;
    paddingR?: KSpacing | 0;
    paddingT?: KSpacing | 0;
    paddingB?: KSpacing | 0;
    paddingH?: KSpacing | 0;
    paddingV?: KSpacing | 0;
  }

  export interface SpacingModifiers extends MarginModifiers, PaddingModifiers {
    width?: number | string;
    height?: number | string;

    minW?: number | string;
    maxW?: number | string;
    minH?: number | string;
    maxH?: number | string;
    size?: number | string;
  }

  export interface StylingModifiers {
    background?: string;
    opacity?: number;
    hiddenOverflow?: boolean;

    br?: KRadius | 0; // border radius
    brW?: number; // border width
    brC?: string; // border color

    brTL?: KRadius | 0; // border top left radius
    brTR?: KRadius | 0; // border top right radius
    brBL?: KRadius | 0; // border bottom left radius
    brBR?: KRadius | 0; // border bottom right radius

    brBW?: number | 0; // border bottom width
    brTW?: number | 0; // border top width
    brLW?: number | 0; // border left width
    brRW?: number | 0; // border right width

    brBC?: string; // border bottom color
    brTC?: string; // border top color
    brLC?: string; // border left color
    brRC?: string; // border right color
  }

  export interface TestModifier {
    testID?: string;
  }

  export interface KViewProps
    extends React.PropsWithChildren<ViewProps>,
      SpacingModifiers,
      StylingModifiers,
      LayoutModifiers,
      TestModifier {
    edges?: Array<'bottom' | 'top' | 'left' | 'right'>;
  }

  export type KRatingSize = 'x-large' | 'large' | 'medium' | 'small' | 'x-small';

  export type KInputSize = KRatingSize;

  export type KSort = 'asc' | 'desc';

  export type KStarValue = {
    points: number;
    reviews: number;
  };

  export interface KStarProps extends TestModifier {
    onPress?: () => void;
    point: number;
    size?: KRatingSize;
    style?: ImageStyle;
    theme?: 'dark' | 'light';
  }

  export interface KStarsProps extends TestModifier {
    points?: number;
    currentPoints: number;
    reviews?: number; // unset to hide it
    showAvg?: boolean;
    size?: KRatingSize;
    theme?: 'dark' | 'light';
    onPress?: (index: number) => void;
  }

  export interface KRatingBarProps extends TestModifier {
    type: 'icon' | 'text';
    values: Array<KStarValue>;
    genPluralLabel?: (stars: number) => string;
    labelWidth?: number;
    sort?: KSort;
  }

  export interface KRatingStatisticProps extends KRatingBarProps {
    orientation?: 'vertical' | 'horizontal';
    containerStyle?: ViewStyle;
    initialOpen?: boolean;
    fixedAvg?: number;
  }

  export interface KTextProps
    extends TextProps,
      SpacingModifiers,
      StylingModifiers,
      LayoutModifiers,
      TextModifiers,
      TestModifier {}

  export interface RichTextOptions extends Omit<KTextProps, 'children'> {
    richTextOptions: {
      i18nKey: string;
      values?: any;
      components?: {
        [key: string]: React.ReactNode;
      };
    };
  }

  export interface KInputProps
    extends Omit<TextInputProps, 'clearButtonMode'>,
      SpacingModifiers,
      StylingModifiers,
      LayoutModifiers,
      Omit<TextModifiers, 'textAlign' | 'typo'>,
      TestModifier {
    inputType?: 'phone' | 'username' | 'email' | 'password' | 'text';
    nextRef?: RefObject<TextInput> | MutableRefObject<TextInput>;
    clearButtonMode?: 'show' | 'hidden';
    size?: 'x-large' | 'large' | 'medium' | 'small' | 'x-small';
    radius?: 'borderless' | 'round';
    border?: 'entire' | 'bottom';
    messageStatus?: 'success' | 'warning' | 'danger';
    message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    hint?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    searchIconLeftColor?: string;
    rightNode?: (hasFocus: boolean) => JSX.Element;
    leftNode?: JSX.Element;
    onPress?: () => void;
    highlightOnValidate?: boolean;
  }

  export type KRadius =
    | 'x' // 4px
    | '2x' // 8px
    | '3x' // 12px
    | '4x' // 16px
    | '6x' // 24px
    | 'round'; // round
  export type KSpacing =
    | '0.25rem' // 4px
    | '0.5rem' // 8px
    | '0.75rem' // 12px
    | '1rem' // 16px
    | '1.25rem' // 20px
    | '1.5rem' // 24px
    | '2rem' // 32px
    | '2.5rem' // 40px
    | '3rem' // 48px
    | '4rem' // 64px
    | '5rem' // 80px
    | '6rem' // 96px
    | '8rem' // 128px
    | '10rem' // 160px
    | '12rem' // 192px
    | '14rem' // 234px
    | '16rem'; // 256px
  export type KContainer = 'sm' | 'md' | 'lg' | 'xl';
  export type KThickness = 'thin' | 'thick';
  export type KButtonSize = 'xlg' | 'lg' | 'md' | 'nm' | 'sm' | 'xs';
  export type KButtonKind = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light';
  export type KButtonLabelWeight = 'normal' | 'medium' | 'bold';
  export interface KButtonProps extends TestModifier, MarginModifiers {
    br?: KRadius;
    brC?: string;
    kind?: KButtonKind;
    size?: KButtonSize;
    weight?: KButtonLabelWeight;
    label?: string;
    icon?: KButtonIconProps;
    iconAlignment?: 'left' | 'right';
    disabled?: boolean;
    loading?: boolean;
    stretch?: boolean | 'left' | 'right';
    revert?: boolean;
    thickness?: KThickness;

    onPress?: () => void;
    onLongPress?: () => void;
    enhanceStyle?: StyleProp<ViewStyle>;
    brW?: number;
  }

  export interface KButtonBaseProps extends KButtonProps {
    background: string;
    tintColor: string;
    isLink: boolean;
  }

  export interface KButtonGroupProps extends TestModifier {
    activeIndex?: number;
    withRadio?: boolean;
    buttons: Array<
      {
        title: string;
        typo?: TypographyModifier;
        disabled?: boolean;
        onPress?: () => void;
      } & TestModifier
    >;
    iconSize?: number;
    tintColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    background?: string;
  }

  export interface KButtonGroupControlProps extends TestModifier {
    onLeftPress?: () => void;
    onRightPress?: () => void;
    onCenterPress?: () => void;
    iconSize?: number;
    tintColor?: string;
    testIDLeft?: string;
    testIDCenter?: string;
    testIDRight?: string;
  }

  export interface KBottomActionsProps extends TestModifier {
    buttons: Array<{ flex?: number; jsx: JSX.Element }>;
    topNode?: JSX.Element;
    border?: boolean;
    background?: string;
    row?: boolean;
    ignoreEdge?: boolean;
  }

  export interface KButtonStepperProps extends TestModifier {
    maxValue?: number;
    minValue?: number;
    initialValue?: number;
    stepCount?: number;
    type?:
      | 'square-center' // default
      | 'square-left'
      | 'square-right'
      | 'circle-center'
      | 'circle-left'
      | 'circle-right';
    border?: boolean; // true is default
    size?: 'small' | 'large'; // large is default
    tintColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    stepBackground?: string;
    testIDPlus: string;
    testIDMinus: string;
  }

  export interface KRadioGroupControlProps {
    iconSize?: number;
    tintColor?: string;
    activeColor?: string;
  }

  export interface KListItemBaseItemProps extends TestModifier {
    label?: string;
    customLabel?: any;
    description?: string;
    descriptionColor?: string;
    leftNode?: {
      icon?: Omit<KButtonIconProps, 'size'>;
      thumbnail?: KThumbnailProps;
    };
    rightNode?: {
      icon?: Omit<KButtonIconProps, 'size'> & { onPress?: () => void };
      button?: {
        type: 'solid' | 'transparent' | 'link' | 'outline';
        params: KButtonProps;
      };
      jsx?: JSX.Element;
    };
    content?: {
      icon?: Omit<KButtonIconProps, 'size'>;
      button?: {
        type: 'solid' | 'transparent' | 'link' | 'outline';
        params: KButtonProps;
      };
      label?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      jsx?: JSX.Element;
    };
    contentBreakLine?: boolean;
    border?: boolean;
    background?: string;
    tintColor?: string;
    paddingH?: KSpacing;
    onPress?: () => void;
  }

  export interface KListItemBaseProps extends TestModifier {
    data: Array<KListItemBaseItemProps>;
    typo?: TypographyModifier;
    renderType?: 'map-item' | 'flatlist';
    showChevron?: boolean;
  }

  export interface KCheckboxProps
    extends Omit<KListItemBaseItemProps, 'onPress' | 'leftNode' | 'contentPosition' | 'content'>,
      TestModifier {
    activeColor?: string;
    typo?: TypographyModifier;
    checked?: boolean;
    thumbnail?: KThumbnailProps;
    isLastItem?: boolean;
    shape?: 'square' | 'circle';
    paddingV?: KSpacing;
    iconSize?: number;
    onChange?: (value: boolean) => void;
    changeLabelColor?: boolean;
  }

  export interface KCheckboxesProps
    extends Omit<KCheckboxProps, 'checked' | 'onChange'>,
      Pick<KListItemBaseProps, 'renderType'>,
      TestModifier {
    initialIndexes?: number[];
    items: Array<
      {
        label: string;
        description?: string;
        thumbnail?: KThumbnailProps;
        rightNode?: {
          icon?: Omit<KButtonIconProps, 'size'>;
          button?: {
            type: 'solid' | 'transparent' | 'link' | 'outline';
            params: KButtonProps;
          };
        };
        onPress?: () => void;
      } & TestModifier
    >;
    onChange?: (params: number[]) => void;
  }

  export interface KRadioProps extends Omit<KCheckboxProps, 'thickness' | 'br'> {}

  export interface KRadioGroupProps
    extends Omit<KCheckboxesProps, 'initialIndex' | 'onChange' | 'shape'> {
    initialIndex?: number;
    onChange?: (param: number) => void;
  }

  export type KThumbnailType = 'square' | 'circle' | 'landscape';

  export type KThumbnailSize = 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | '2xlg' | '3xlg' | '4xlg';
  export type KAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | '2xlg' | '3xlg' | '4xlg';
  export interface KImageProps extends Omit<FastImageProps, 'source'>, TestModifier {
    uri: string | number;
    size?: number;
    width?: number;
    height?: number;
    br?: KRadius;
    flashListForceRenderKey?: string;
    placeholder?: number;
    disabled?: boolean;
    onPress?: () => void;
  }

  export interface KThumbnailProps
    extends Pick<KImageProps, 'uri' | 'onPress' | 'br' | 'resizeMode' | 'placeholder'>,
      TestModifier {
    size?: KThumbnailSize;
    type?: KThumbnailType;
  }

  export interface KBannerProps
    extends Pick<KImageProps, 'uri' | 'onPress' | 'br' | 'resizeMode' | 'placeholder'>,
      TestModifier {
    width: number;
    ratio:
      | '2:1'
      | '3:1'
      | '4:1'
      | '3:2'
      | '1.78:1'
      | '1:2'
      | '1:3'
      | '1:4'
      | '2:3'
      | '1:1.78'
      | '1:1';
  }

  export interface KAvatarProps
    extends React.PropsWithChildren<{
        uri: string | number;
        size?: KAvatarSize;
        showOnlineDot?: boolean;
        isOnline?: boolean;
        placeholder?: number;
        tintColor?: string;
        border?: {
          width: number;
          color?: string;
        };
        onPress?: () => void;
      }>,
      TestModifier {}

  export type KVectorIconsProvider =
    | 'Droppii'
    | 'DroppiiNew'
    | 'Entypo'
    | 'EvilsIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'Zocial'
    | 'SimpleLineIcons';

  export interface KVectorIconsProps extends TestModifier, Pick<TextProps, 'style'> {
    name: string;
    size?: number;
    color?: string;
    provider?: KVectorIconsProvider;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    getImageSource?: (name: string, size?: number, color?: string) => Promise<any>;
    getRawGlyphMap?: () => { [name: string]: number };
    loadFont?: (file?: string) => Promise<void>;
    hasIcon?: (name: string) => boolean;
    disabled?: boolean;
  }

  export interface KButtonIconProps {
    vectorName?: string; // for vector icon
    vectorProvider?: KVectorIconsProvider; // for vector icon
    imageSource?: string | number; // for image icon,
    tintColor?: string;
    size?: number;
  }

  export type KPopupActionProps = {
    label: string;
    weight?: KButtonLabelWeight;
    icon?: KButtonIconProps;
    onPress?: () => void;
    kind?: KButtonKind;
  };

  export type KPopupActionsProps = {
    type?:
      | 'vertical-menu'
      | 'inline'
      | 'single'
      | 'horizontal-menu'
      | 'primary-action'
      | 'horizontal-button';
    buttons: Array<KPopupActionProps>;
    primaryIndex?: number; // the highest priority
    destructiveIndex?: number; // the normal priority
  };

  export interface KPopupProps {
    body: {
      message?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      renderContent?: (dismiss: () => void) => any;
      scrollable?: boolean;
    };
    header?: {
      title?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      subTitle?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      alignment?: 'center' | 'left';
      logo?: KAvatarProps;
      showCloseButton?: boolean;
    };
    actions?: KPopupActionsProps;
    position?: 'top' | 'center' | 'bottom';
    touchOutsideToDismiss?: boolean;
    backgroundColor?: string;
  }

  export type KDialogActionsProps = {
    type?: 'solid' | 'transparent';
    buttons: Array<{
      kind: KButtonKind;
      label: string;
      onPress?: () => void;
      icon?: Omit<KButtonIconProps, 'tintColor'>;
    }>;
    primaryIndex?: number; // the highest priority
    destructiveIndex?: number; // the normal priority
  };

  export interface KActionBarProps extends TestModifier {
    type?:
      | 'vertical-link'
      | 'horizontal-button'
      | 'main-action-right'
      | 'single-button'
      | 'horizontal-menu'
      | 'horizontal-menu-icon';
    buttons: Array<
      {
        label: string;
        onPress?: () => void;
        icon?: Omit<KButtonIconProps, 'tintColor'>;
        kind?: KButtonKind;
      } & TestModifier
    >;
    primaryIndex?: number; // the highest priority
    destructiveIndex?: number; // the normal priority
    containerStyle?: StyleProp<ViewStyle>;
    background?: string;
  }

  export interface KDialogProps {
    body?: {
      message?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      // dismiss function: to call dismiss Dialog inside dynamic content
      renderContent?: (dismiss: () => void) => any;
    };
    header?: {
      title?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      subTitle?: {
        text: string;
        typo?: TypographyModifier;
        color?: string;
      };
      showCloseButton?: boolean;
      alignment?: 'center' | 'left';
    };
    actions?: KActionBarProps;
    position?: 'top' | 'center';
    touchOutsideToDismiss?: boolean;
  }

  export interface KAlertProps {
    message?: ((dismiss: () => void) => JSX.Element) | string;
    messageTypo?: TypographyModifier;
    messageColor?: string;
    title: string;
    titleTypo?: TypographyModifier;
    titleColor?: string;
    titleAlignment?: 'center' | 'left';
    buttons?: Array<{
      label: string;
      color?: string;
      weight?: 'bold' | 'normal' | 'medium';
      onPress?: () => void;
    }>;
    vertical?: boolean;
    primaryIndex?: number;
    destructiveIndex?: number;
    touchOutsideToDismiss?: boolean;
  }

  export interface KBottomSheetProps extends KDialogProps {
    onDismiss?: () => void;
  }

  export interface InputBaseModifiers {
    size?: KInputSize;
    status?: {
      id: 'success' | 'warning' | 'error';
      label?: string;
    };
    leftIcon: 1;
    textCenter?: boolean;
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic';
    bold?: boolean;
    letterSpacing?: number;
    underline?: true;
    underlineColor?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    darkModeColor?: string;
    typo?: TypographyModifier;
    textAlign?: 'center' | 'left' | 'right';
  }

  export interface KTabBarButtonProps extends TestModifier {
    label: string;
    icon?: KButtonIconProps;
  }

  export type KTabBarType = 'underline' | 'solid' | 'outline';

  export type KTabBarTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark';

  export interface KTabBarProps extends TestModifier {
    theme?: KTabBarTheme;
    type: KTabBarType;
    buttons: KTabBarButtonProps[];
    initialIndex?: number;
    iconAlignment?: 'top' | 'left' | 'bottom' | 'right';
    containerStyle?: StyleProp<ViewStyle>;
    paddingH?: KSpacing | 0;
    onChanged: (index: number) => void;
  }

  export interface KToastBarProps {
    theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light';
    type?: 'full-fill' | 'half-fill' | 'revert';
    icon?: Omit<KButtonIconProps, 'tintColor'> & { size?: number };
    title?: string;
    description?: string;
    textAlign?: true | 'center' | 'left' | 'right';
    showCloseButton?: boolean;
    contentAlignment?: 'center' | 'left';
    action?: {
      label: string;
      onPress?: () => void;
    };
    br?: KRadius;
    visibleTimeout?: number;
    position?: 'bottom' | 'top';
    stretch?: boolean;
    content?: JSX.Element;
    onPressContent?: () => void;
  }

  export interface KDividerProps extends TestModifier {
    type?: 'line' | 'space';
    size?: 'hairline' | 'xs' | 'sm' | 'md';
    transparent?: boolean;
    background?: string;
    vertical?: boolean;
  }

  export interface KBlockProps extends TestModifier {
    header?: {
      title?: string;
      icon?: KButtonIconProps;
      withChevron?: boolean;
      size?: 'small' | 'medium' | 'xmedium';
      uppercase?: boolean;
      description?: string;
      subTitle?: string;
      rightNode?: JSX.Element;
      marginContent?: KSpacing;
    };
    tabbar?: Omit<KTabBarProps, 'iconAlignment' | 'buttons'> & {
      buttons: string[];
    };
    border?: boolean;
    isLastItem?: boolean;
    content: JSX.Element | React.ReactNode | (() => JSX.Element);
    background?: string;
  }

  export interface KSectionHeaderProps extends TestModifier {
    title?: {
      text?: string;
      color?: string;
      typo?: TypographyModifier;
    };
    subTitle?: {
      text?: string;
      color?: string;
      typo?: TypographyModifier;
    };
  }

  export interface KSectionProps extends TestModifier {
    header?: KSectionHeaderProps;
    style?: StyleProp<ViewStyle>;
    dividerProps?: KDividerProps;
    blocks: Array<KBlockProps | undefined>;
    marginT?: KSpacing;
  }

  interface KSortBarButtonEnhancer {
    isActive?: boolean;
  }

  export interface KSortBarProps extends TestModifier {
    size?: Pick<KButtonProps, 'size'>;
    background?: string;
    buttons: Array<Pick<KButtonProps, 'label' | 'onPress'> & KSortBarButtonEnhancer & TestModifier>;
  }

  export interface KFilterBarProps extends KSortBarProps {
    titleAlignment?: 'top' | 'left';
    checkBoxes?: Array<{ label: string; onChange?: (value: boolean) => void } & TestModifier>;
    buttons: Array<
      Pick<KButtonProps, 'label' | 'onPress'> &
        KSortBarButtonEnhancer &
        TestModifier & {
          title?: string;
        }
    >;
    filterOptions?: {
      icon?: KButtonIconProps;
      label?: {
        text?: string;
        color?: string;
        typo?: TypographyModifier;
      };
      onPress: () => void;
    };
  }

  export type KHeaderNavigationTheme = 'primary' | 'secondary' | 'light' | 'dark';

  export interface KHeaderNavigationButtonProps {
    id: string;
    index: number;
    jsx?: JSX.Element;
    icon?: KButtonIconProps;
    iconStyle?: StyleProp<ViewStyle>;
    iconAlignment?: 'left' | 'right';
    backgroundColor?: string;
    tintColor?: string;
    disabled?: boolean;
    title?: string;
    titleWeight?: 'normal' | 'bold' | 'medium';
    br?: KRadius;
    badge?: number;
    loading?: boolean;
    onPress?: () => void;
  }

  export interface KHeaderNavigationProps extends TestModifier {
    title?: string;
    subTitle?: string;
    alignment?: 'left' | 'center';
    size?: 'large' | 'small';
    theme?: KHeaderNavigationTheme;
    logoSource?: number | string;
    leftNode?: any;
    leftButton?: Omit<KHeaderNavigationButtonProps, 'index'>;
    hideLeftButton?: boolean;
    rightButton?: KHeaderNavigationButtonProps;
    initRightButtons?: KHeaderNavigationButtonProps[];
    isCollapsed?: boolean;
    onChevronPress?: () => void;
    searchProps?: KInputProps & {
      position: 'center' | 'bottom';
      ref?: React.RefObject<TextInput> | React.MutableRefObject<TextInput>;
    };
    tabbar?: Omit<KTabBarProps, 'theme'> & {
      theme?: KHeaderNavigationTheme;
    };
    shadow?: boolean;
    transparent?: boolean;
    containerPaddingHorizontal?: KSpacing;
  }

  export interface KActionSheetProps extends ActionSheetIOSOptions {
    callback: (index: number) => void;
  }

  export interface WithActionSheetProps {
    open: (payload: KActionSheetProps) => void;
    dismiss: () => void;
  }

  export interface WithAlertDialogProps {
    open: (payload: KAlertProps) => void;
    dismiss: () => void;
    dismissAll: () => void;
  }

  export interface WithPopupProps {
    open: (payload: KPopupProps) => void;
    dismiss: () => void;
    dismissAll: () => void;
  }

  export interface WithBottomSheetProps {
    open: (payload: KBottomSheetProps) => void;
    dismiss: () => void;
  }

  export interface WithToastProps {
    open: (payload: KToastBarProps) => void;
    dismiss: () => void;
  }

  export interface WithImageViewer {
    open: (payload: ImageViewerParams) => void;
    dismiss: () => void;
  }

  export interface KRowNoteProps extends TestModifier {
    padding?: KSpacing;
    text: string;
    typo?: TypographyModifier;
    color?: string;
    brBC?: string;
    brBW?: number;
  }

  export interface KBadgeProps extends MarginModifiers, TestModifier {
    badge?: string | number;
    containerStyle?: StyleProp<ViewStyle>;
    labelContainerStyle?: StyleProp<ViewStyle>;
    icon: KButtonIconProps & { jsx?: JSX.Element };
    tintColor?: string;
    colors?: string[];
    border?: boolean;
    onPress?: () => void;
  }

  export interface KCommonIconProps extends KButtonIconProps, TestModifier {
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    br?: KRadius;
    brC?: string;
    brW?: number;
  }

  export interface KChipProps extends TestModifier {
    label: string;
    typo?: TypographyModifier;
    type?: 'outline' | 'solid' | 'light' | 'gradient';
    status?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray';
    size?: 'xs' | 'sm' | 'md';
    leftNode?: Node;
    rightNode?: Node;
    isActive?: boolean;
    br?: KRadius;
    onPress?: () => void;
  }

  export interface KAwareScrollViewProps
    extends React.PropsWithChildren<KeyboardAwareScrollViewProps>,
      TestModifier {}

  export interface KCollapsibleView
    extends React.PropsWithChildren<CollapsibleProps>,
      TestModifier {}

  export interface KFlashListProps<T = any>
    extends React.PropsWithChildren<FlashListProps<T>>,
      TestModifier {}

  export interface KFlatListProps<T = any>
    extends React.PropsWithChildren<FlatListProps<T>>,
      TestModifier {
    keyExtractorId?: string;
  }

  export interface KPageProps extends KViewProps {}

  export interface KScrollViewProps extends React.PropsWithChildren<ScrollViewProps>, TestModifier {
    isGestureScrollView?: boolean;
  }

  export interface KSkeletonProps extends TestModifier {
    size?: number;
  }

  export interface KRowListProps extends ViewProps, TestModifier {
    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    background?: string;
    brBW?: number;
    brBC?: string;
    padding?: KSpacing;
    note?: KRowNoteProps;
    onPress?: () => void;
  }

  export interface KMapViewProps extends MapViewProps, TestModifier {}

  export interface KProgressLineProps extends TestModifier {
    percent: number;
    thin?: number;
    color?: string;
    backgroundColor?: string;
    labelTypo?: TypographyModifier;
    showLabel?: boolean;
  }

  export interface KSwitchProps extends SwitchProps, TestModifier {}
}
