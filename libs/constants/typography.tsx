import { StyleSheet, TextProps, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { get } from 'lodash';
import {
  LayoutModifiers,
  SpacingModifiers,
  StylingModifiers,
  TextModifiers,
  Appearance,
  KRatingSize,
  KSpacing,
  KRadius,
  KThumbnailSize,
  KThumbnailType,
  TypographyModifier,
} from '@uikit/types';
import { KColors, KFonts, KDims } from '../constants';

class Typography {
  private _appearance: Appearance = 'light';
  private _fontScale = 1;

  Page: ViewStyle = {};

  H1: ViewStyle = {};
  H2: ViewStyle = {};
  H3: ViewStyle = {};
  H4: ViewStyle = {};
  H5: ViewStyle = {};
  H6: ViewStyle = {};

  TitleSection: TextStyle = {};
  TitleBlockMedium: TextStyle = {};
  TitleBlockSmall: TextStyle = {};
  TitleBlockSmallUpper: TextStyle = {};

  FormFieldLabel: TextStyle = {};
  TextNote: TextStyle = {};
  ItemPriceBefore: TextStyle = {};
  ItemPriceCurrent: TextStyle = {};
  ItemCommission: TextStyle = {};
  ScreenTitle: TextStyle = {};
  ScreenSubTitle: TextStyle = {};

  Text3xLgBold: TextStyle = {};
  Text2xLgBold: TextStyle = {};
  TextXLgBold: TextStyle = {};
  TextLgBold: TextStyle = {};
  TextMdBold: TextStyle = {};
  TextNmBold: TextStyle = {};
  TextSmBold: TextStyle = {};
  TextXsBold: TextStyle = {};
  Text2XsBold: TextStyle = {};

  Text3xLgMedium: TextStyle = {};
  Text2xLgMedium: TextStyle = {};
  TextXLgMedium: TextStyle = {};
  TextLgMedium: TextStyle = {};
  TextMdMedium: TextStyle = {};
  TextNmMedium: TextStyle = {};
  TextSmMedium: TextStyle = {};
  TextXsMedium: TextStyle = {};
  Text2XsMedium: TextStyle = {};

  Text3xLgNormal: TextStyle = {};
  Text2xLgNormal: TextStyle = {};
  TextXLgNormal: TextStyle = {};
  TextLgNormal: TextStyle = {};
  TextMdNormal: TextStyle = {};
  TextNmNormal: TextStyle = {};
  TextSmNormal: TextStyle = {};
  TextXsNormal: TextStyle = {};
  Text2XsNormal: TextStyle = {};

  Display3xLgBold: TextStyle = {};
  Display2xLgBold: TextStyle = {};
  DisplayXLgBold: TextStyle = {};
  DisplayLgBold: TextStyle = {};
  DisplayMdBold: TextStyle = {};
  DisplayNmBold: TextStyle = {};
  DisplaySmBold: TextStyle = {};
  DisplayXsBold: TextStyle = {};
  Display2XsBold: TextStyle = {};

  Display3xLgMedium: TextStyle = {};
  Display2xLgMedium: TextStyle = {};
  DisplayXLgMedium: TextStyle = {};
  DisplayLgMedium: TextStyle = {};
  DisplayMdMedium: TextStyle = {};
  DisplayNmMedium: TextStyle = {};
  DisplaySmMedium: TextStyle = {};
  DisplayXsMedium: TextStyle = {};
  Display2XsMedium: TextStyle = {};

  Display3xLgNormal: TextStyle = {};
  Display2xLgNormal: TextStyle = {};
  DisplayXLgNormal: TextStyle = {};
  DisplayLgNormal: TextStyle = {};
  DisplayMdNormal: TextStyle = {};
  DisplayNmNormal: TextStyle = {};
  DisplaySmNormal: TextStyle = {};
  DisplayXsNormal: TextStyle = {};
  Display2XsNormal: TextStyle = {};

  get appearance() {
    return this._appearance;
  }

  get fontScale() {
    return this._fontScale;
  }

  updateValue(appearance: Appearance, fontScale: number) {
    this._appearance = appearance;
    this._fontScale = fontScale;

    this.Page = {
      backgroundColor: this._appearance === 'light' ? KColors.white : KColors.black,
    };

    this.H1 = this.generateTextStyle(32, KFonts.bold, 51.2);
    this.H2 = this.generateTextStyle(28, KFonts.bold, 44.8);
    this.H3 = this.generateTextStyle(24, KFonts.bold, 38.4);
    this.H4 = this.generateTextStyle(20, KFonts.bold, 32);
    this.H5 = this.generateTextStyle(16, KFonts.bold, 25.6);
    this.H6 = this.generateTextStyle(12, KFonts.bold, 19.2);

    this.TitleSection = this.generateTextStyle(14, KFonts.bold, 22.4);
    this.TitleBlockMedium = this.generateTextStyle(18, KFonts.bold, 28.8);
    this.TitleBlockSmall = this.generateTextStyle(14, KFonts.bold, 22.4);
    this.TitleBlockSmallUpper = this.generateTextStyle(14, KFonts.bold, 22.4, 1, {
      textTransform: 'uppercase',
    });

    this.FormFieldLabel = this.generateTextStyle(14, KFonts.bold, 22.4);
    this.TextNote = this.generateTextStyle(13, KFonts.regular, 20.8);
    this.ItemPriceBefore = this.generateTextStyle(10, KFonts.regular, 16, 1, {
      textDecorationLine: 'line-through',
    });
    this.ItemPriceCurrent = this.generateTextStyle(14, KFonts.bold, 22.4, 1, {
      color: KColors.warning.normal,
    });
    this.ItemCommission = this.generateTextStyle(12, KFonts.bold, 19.2, 1, {
      color: KColors.secondary.normal,
    });
    this.ScreenTitle = this.generateTextStyle(18, KFonts.bold, 28.8, 1, {
      color: KColors.white,
      textTransform: 'uppercase',
    });
    this.ScreenSubTitle = this.generateTextStyle(13, KFonts.regular, 20.8, 1, {
      color: KColors.gray.light,
    });

    this.Text3xLgBold = this.generateTextStyle(25, KFonts.bold, 40);
    this.Text2xLgBold = this.generateTextStyle(22, KFonts.bold, 35.2);
    this.TextXLgBold = this.generateTextStyle(20, KFonts.bold, 32);
    this.TextLgBold = this.generateTextStyle(18, KFonts.bold, 28.8);
    this.TextMdBold = this.generateTextStyle(16, KFonts.bold, 25.6);
    this.TextNmBold = this.generateTextStyle(14, KFonts.bold, 22.4);
    this.TextSmBold = this.generateTextStyle(13, KFonts.bold, 20.8);
    this.TextXsBold = this.generateTextStyle(12, KFonts.bold, 19.2);
    this.Text2XsBold = this.generateTextStyle(10, KFonts.bold, 16);

    this.Text3xLgMedium = this.generateTextStyle(25, KFonts.medium, 40);
    this.Text2xLgMedium = this.generateTextStyle(22, KFonts.medium, 35.2);
    this.TextXLgMedium = this.generateTextStyle(20, KFonts.medium, 32);
    this.TextLgMedium = this.generateTextStyle(18, KFonts.medium, 28.8);
    this.TextMdMedium = this.generateTextStyle(16, KFonts.medium, 25.6);
    this.TextNmMedium = this.generateTextStyle(14, KFonts.medium, 22.4);
    this.TextSmMedium = this.generateTextStyle(13, KFonts.medium, 20.8);
    this.TextXsMedium = this.generateTextStyle(12, KFonts.medium, 19.2);
    this.Text2XsMedium = this.generateTextStyle(10, KFonts.medium, 16);

    this.Text3xLgNormal = this.generateTextStyle(25, KFonts.regular, 40);
    this.Text2xLgNormal = this.generateTextStyle(22, KFonts.regular, 35.2);
    this.TextXLgNormal = this.generateTextStyle(20, KFonts.regular, 32);
    this.TextLgNormal = this.generateTextStyle(18, KFonts.regular, 28.8);
    this.TextMdNormal = this.generateTextStyle(16, KFonts.regular, 25.6);
    this.TextNmNormal = this.generateTextStyle(14, KFonts.regular, 22.4);
    this.TextSmNormal = this.generateTextStyle(13, KFonts.regular, 20.8);
    this.TextXsNormal = this.generateTextStyle(12, KFonts.regular, 19.2);
    this.Text2XsNormal = this.generateTextStyle(10, KFonts.regular, 16);

    this.Display3xLgBold = this.generateTextStyle(25, KFonts.bold, 40, 2);
    this.Display2xLgBold = this.generateTextStyle(22, KFonts.bold, 35.2, 2);
    this.DisplayXLgBold = this.generateTextStyle(20, KFonts.bold, 32, 2);
    this.DisplayLgBold = this.generateTextStyle(18, KFonts.bold, 28.8, 2);
    this.DisplayMdBold = this.generateTextStyle(16, KFonts.bold, 25.6, 2);
    this.DisplayNmBold = this.generateTextStyle(14, KFonts.bold, 22.4, 2);
    this.DisplaySmBold = this.generateTextStyle(13, KFonts.bold, 20.8, 2);
    this.DisplayXsBold = this.generateTextStyle(12, KFonts.bold, 19.2, 2);
    this.Display2XsBold = this.generateTextStyle(10, KFonts.bold, 16, 2);

    this.Display3xLgMedium = this.generateTextStyle(25, KFonts.medium, 40, 2);
    this.Display2xLgMedium = this.generateTextStyle(22, KFonts.medium, 35.2, 2);
    this.DisplayXLgMedium = this.generateTextStyle(20, KFonts.medium, 32, 2);
    this.DisplayLgMedium = this.generateTextStyle(18, KFonts.medium, 28.8, 2);
    this.DisplayMdMedium = this.generateTextStyle(16, KFonts.medium, 25.6, 2);
    this.DisplayNmMedium = this.generateTextStyle(14, KFonts.medium, 22.4, 2);
    this.DisplaySmMedium = this.generateTextStyle(13, KFonts.medium, 20.8, 2);
    this.DisplayXsMedium = this.generateTextStyle(12, KFonts.medium, 19.2, 2);
    this.Display2XsMedium = this.generateTextStyle(10, KFonts.medium, 16, 2);

    this.Display3xLgNormal = this.generateTextStyle(25, KFonts.regular, 40, 2);
    this.Display2xLgNormal = this.generateTextStyle(22, KFonts.regular, 35.2, 2);
    this.DisplayXLgNormal = this.generateTextStyle(20, KFonts.regular, 32, 2);
    this.DisplayLgNormal = this.generateTextStyle(18, KFonts.regular, 28.8, 2);
    this.DisplayMdNormal = this.generateTextStyle(16, KFonts.regular, 25.6, 2);
    this.DisplayNmNormal = this.generateTextStyle(14, KFonts.regular, 22.4, 2);
    this.DisplaySmNormal = this.generateTextStyle(13, KFonts.regular, 20.8, 2);
    this.DisplayXsNormal = this.generateTextStyle(12, KFonts.regular, 19.2, 2);
    this.Display2XsNormal = this.generateTextStyle(10, KFonts.regular, 16, 2);
  }

  getColor = () => (this._appearance === 'light' ? KColors.gray.dark : KColors.gray.light);

  calSize = (size: number) => {
    return TypoHelper.scaleFont(size * this._fontScale);
  };

  generateTextStyle = (
    KFontsize: number,
    fontFamily: string,
    lineHeight: number,
    factor = 1,
    customStyle: TextStyle = {}
  ): TextStyle => ({
    fontSize: this.calSize(KFontsize) * factor,
    fontFamily,
    lineHeight: this.calSize(lineHeight) * factor,
    color: this.getColor(),
    textAlignVertical: 'center',
    ...customStyle,
  });
}

class Helper {
  isNullOrUndefined = (item: any) => item === null || item === undefined || item === 'undefined';

  destructLayoutProps = (props: LayoutModifiers = {}) => {
    const style: StyleProp<ViewStyle> = {};

    let direction: any = props.row ? 'row' : '';
    if (direction && props.reverse) {
      direction += '-reverse';
    }
    if (direction) {
      delete props.row;
      delete props.reverse;
      style.flexDirection = direction;
    }

    if (props.center) {
      style.alignItems = 'center';
      style.justifyContent = 'center';
      delete props.center;
      delete props.justifyContent;
      delete props.alignItems;
    } else {
      if (props.alignItems) {
        style.alignItems = props.alignItems === true ? 'center' : props.alignItems;
        delete props.alignItems;
      }

      if (props.justifyContent) {
        style.justifyContent = props.justifyContent === true ? 'center' : props.justifyContent;
        delete props.justifyContent;
      }
    }

    if (props.alignSelf) {
      style.alignSelf = props.alignSelf === true ? 'center' : props.alignSelf;
    }

    if (props.flex) {
      style.flex = props.flex === true ? 1 : props.flex;
      delete props.flex;
    }

    if (props.flexW) {
      style.flexWrap = props.flexW;
      delete props.flexW;
    }

    if (props.flexS) {
      style.flexShrink = props.flexS;
      delete props.flexS;
    }

    if (props.flexG) {
      style.flexGrow = props.flexG;
      delete props.flexG;
    }
    return style;
  };

  destructSpacingProps = (props: SpacingModifiers = {}) => {
    const style: StyleProp<ViewStyle> = {};
    if (!this.isNullOrUndefined(props.margin)) {
      style.margin = this.mapKSpacingToNumber(props.margin);
      delete props.margin;
    }
    if (!this.isNullOrUndefined(props.marginV)) {
      style.marginVertical = this.mapKSpacingToNumber(props.marginV);
      delete props.marginV;
    }
    if (!this.isNullOrUndefined(props.marginH)) {
      style.marginHorizontal = this.mapKSpacingToNumber(props.marginH);
      delete props.marginH;
    }
    if (!this.isNullOrUndefined(props.marginL)) {
      style.marginLeft = this.mapKSpacingToNumber(props.marginL);
      delete props.marginL;
    }
    if (!this.isNullOrUndefined(props.marginR)) {
      style.marginRight = this.mapKSpacingToNumber(props.marginR);
      delete props.marginR;
    }
    if (!this.isNullOrUndefined(props.marginB)) {
      style.marginBottom = this.mapKSpacingToNumber(props.marginB);
      delete props.marginB;
    }
    if (!this.isNullOrUndefined(props.marginT)) {
      style.marginTop = this.mapKSpacingToNumber(props.marginT);
      delete props.marginT;
    }
    if (!this.isNullOrUndefined(props.padding)) {
      style.padding = this.mapKSpacingToNumber(props.padding);
      delete props.padding;
    }
    if (!this.isNullOrUndefined(props.paddingV)) {
      style.paddingVertical = this.mapKSpacingToNumber(props.paddingV);
      delete props.paddingV;
    }
    if (!this.isNullOrUndefined(props.paddingH)) {
      style.paddingHorizontal = this.mapKSpacingToNumber(props.paddingH);
      delete props.paddingH;
    }
    if (!this.isNullOrUndefined(props.paddingL)) {
      style.paddingLeft = this.mapKSpacingToNumber(props.paddingL);
      delete props.paddingL;
    }
    if (!this.isNullOrUndefined(props.paddingR)) {
      style.paddingRight = this.mapKSpacingToNumber(props.paddingR);
      delete props.paddingR;
    }
    if (!this.isNullOrUndefined(props.paddingB)) {
      style.paddingBottom = this.mapKSpacingToNumber(props.paddingB);
      delete props.paddingB;
    }
    if (!this.isNullOrUndefined(props.paddingT)) {
      style.paddingTop = this.mapKSpacingToNumber(props.paddingT);
      delete props.paddingT;
    }

    if (props.size) {
      style.width = props.size;
      style.height = props.size;
      delete props.size;
    }
    if (props.minH) {
      style.minHeight = props.minH;
      delete props.minH;
    }
    if (props.maxH) {
      style.maxHeight = props.maxH;
      delete props.maxH;
    }
    if (props.minW) {
      style.minWidth = props.minW;
      delete props.minW;
    }
    if (props.maxW) {
      style.maxWidth = props.maxW;
      delete props.maxW;
    }
    if (props.width) {
      style.width = props.width;
      delete props.width;
    }
    if (props.height) {
      style.height = props.height;
      delete props.height;
    }

    return style;
  };

  destructStylingProps = (props: StylingModifiers = {}) => {
    const style: StyleProp<ViewStyle> = {};
    if (props.background) {
      style.backgroundColor = props.background;
      delete props.background;
    }

    if (!this.isNullOrUndefined(props.br)) {
      style.borderRadius = this.mapKRadiusToNumber(props.br);
      delete props.br;
    }
    if (!this.isNullOrUndefined(props.brTL)) {
      style.borderTopLeftRadius = this.mapKRadiusToNumber(props.brTL);
      delete props.brTL;
    }
    if (!this.isNullOrUndefined(props.brTR)) {
      style.borderTopRightRadius = this.mapKRadiusToNumber(props.brTR);
      delete props.brTR;
    }
    if (!this.isNullOrUndefined(props.brBL)) {
      style.borderBottomLeftRadius = this.mapKRadiusToNumber(props.brBL);
      delete props.brBL;
    }
    if (!this.isNullOrUndefined(props.brBR)) {
      style.borderBottomRightRadius = this.mapKRadiusToNumber(props.brBR);
      delete props.brBR;
    }

    if (props.brW) {
      style.borderWidth = props.brW;
      delete props.brW;
    }
    if (props.brBW) {
      style.borderBottomWidth = props.brBW;
      delete props.brBW;
    }
    if (props.brTW) {
      style.borderTopWidth = props.brTW;
      delete props.brTW;
    }
    if (props.brLW) {
      style.borderLeftWidth = props.brLW;
      delete props.brLW;
    }
    if (props.brRW) {
      style.borderRightWidth = props.brRW;
      delete props.brRW;
    }

    if (props.brC) {
      style.borderColor = props.brC;
      delete props.brC;
    }
    if (props.brBC) {
      style.borderBottomColor = props.brBC;
      delete props.brBC;
    }
    if (props.brTC) {
      style.borderTopColor = props.brTC;
      delete props.brTC;
    }
    if (props.brLC) {
      style.borderLeftColor = props.brLC;
      delete props.brLC;
    }
    if (props.brRC) {
      style.borderRightColor = props.brRC;
      delete props.brRC;
    }
    if (props.hiddenOverflow) {
      style.overflow = 'hidden';
      delete props.hiddenOverflow;
    }

    return style;
  };

  destructTextProps = (props: TextModifiers & TextProps = {}) => {
    const style: StyleProp<TextStyle> = {};

    if (props.color) {
      style.color = props.color;
      delete props.color;
    }
    if (props.textAlign) {
      style.textAlign = props.textAlign === true ? 'center' : props.textAlign;
      delete props.textAlign;
    }
    if (props.underlineColor) {
      style.textDecorationColor = props.underlineColor;
      delete props.underlineColor;
    }
    if (props.underline) {
      style.textDecorationLine = props.underline ? 'underline' : undefined;
      delete props.underline;
    }
    if (props.textTransform) {
      style.textTransform = props.textTransform;
      delete props.textTransform;
    }

    const flatten = StyleSheet.flatten([style, props.style]);
    return flatten;
  };

  destructPropsToStyle = <T extends {}>(props: T) => {
    const layout = this.destructLayoutProps(props);
    const spacing = this.destructSpacingProps(props);
    const styling = this.destructStylingProps(props);
    const text = this.destructTextProps(props);

    return {
      mStyle: {
        layout,
        spacing,
        styling,
        text,
      },
      mProps: props,
    };
  };

  scaleFont = (KFontsize: number) => KFontsize;

  sizeWidth = (size: number) => {
    return size * KDims.width;
  };

  sizeHeight = (size: number) => {
    return size * KDims.height;
  };

  mapKRatingSizeToNumber = (kSize?: KRatingSize) => {
    switch (kSize) {
      case 'x-large':
        return {
          size: 40,
          spacing: 8,
        };
      case 'large':
        return {
          size: 32,
          spacing: 4,
        };
      case 'small':
        return {
          size: 16,
          spacing: 2,
        };
      case 'x-small':
        return {
          size: 12,
          spacing: 2,
        };
      default:
        return {
          size: 24,
          spacing: 2,
        };
    }
  };

  mapKThumbnailSizeAndTypeToStyle = (kSize?: KThumbnailSize, kType?: KThumbnailType) => {
    const getHeight = () => {
      switch (kSize) {
        case 'xs':
          return 24;
        case 'sm':
          return 32;
        case 'lg':
          return 48;
        case 'xlg':
          return 56;
        case '2xlg':
          return 64;
        case '3xlg':
          return 72;
        case '4xlg':
          return 80;
        default:
          return 40;
      }
    };
    const size = getHeight();
    switch (kType) {
      case 'circle':
        return {
          width: size,
          height: size,
        };
      case 'landscape':
        return {
          width: size * 2,
          height: size,
        };
      default:
        return {
          width: size,
          height: size,
        };
    }
  };

  mapKSpacingToNumber = (spacing?: KSpacing | number) => {
    if (typeof spacing === 'number') {
      return spacing;
    }
    if (!spacing) {
      return 0;
    }
    const base = 16;
    let factor = 0;
    try {
      const factorString = spacing?.split('rem')?.[0] || '';
      const factorFloat = parseFloat(factorString);
      if (typeof factorFloat === 'number') {
        factor = factorFloat;
      }
    } catch (error) {
      //
    }
    return factor * base;
  };

  mapKRadiusToNumber = (radius?: KRadius | 0) => {
    if (radius === 0) {
      return 0;
    }
    const base = 4;
    switch (radius) {
      case 'x':
        return base;
      case '2x':
        return base * 2;
      case '3x':
        return base * 3;
      case '4x':
        return base * 4;
      case '6x':
        return base * 6;
      case 'round':
        return 10000;
      default:
        return 0;
    }
  };

  ratio = 1.2;

  getKFontSizeByTypo = (typo: TypographyModifier = 'TextNmNormal') => {
    const style = instance[typo];
    return get(style, 'fontSize', 14);
  };
}

const instance = new Typography();
const TypoHelper = new Helper();

const KSpacingValue = {
  '0.25rem': TypoHelper.mapKSpacingToNumber('0.25rem'),
  '0.5rem': TypoHelper.mapKSpacingToNumber('0.5rem'),
  '0.75rem': TypoHelper.mapKSpacingToNumber('0.75rem'),
  '1rem': TypoHelper.mapKSpacingToNumber('1rem'),
  '1.25rem': TypoHelper.mapKSpacingToNumber('1.25rem'),
  '1.5rem': TypoHelper.mapKSpacingToNumber('1.5rem'),
  '2rem': TypoHelper.mapKSpacingToNumber('2rem'),
  '2.5rem': TypoHelper.mapKSpacingToNumber('2.5rem'),
  '3rem': TypoHelper.mapKSpacingToNumber('3rem'),
  '4rem': TypoHelper.mapKSpacingToNumber('4rem'),
  '5rem': TypoHelper.mapKSpacingToNumber('5rem'),
  '6rem': TypoHelper.mapKSpacingToNumber('6rem'),
  '8rem': TypoHelper.mapKSpacingToNumber('8rem'),
  '10rem': TypoHelper.mapKSpacingToNumber('10rem'),
  '12rem': TypoHelper.mapKSpacingToNumber('12rem'),
  '14rem': TypoHelper.mapKSpacingToNumber('14rem'),
  '16rem': TypoHelper.mapKSpacingToNumber('16rem'),
};

const KRadiusValue = {
  x: TypoHelper.mapKRadiusToNumber('x'),
  '2x': TypoHelper.mapKRadiusToNumber('2x'),
  '3x': TypoHelper.mapKRadiusToNumber('3x'),
  '4x': TypoHelper.mapKRadiusToNumber('4x'),
  '6x': TypoHelper.mapKRadiusToNumber('6x'),
  round: TypoHelper.mapKRadiusToNumber('round'),
};

export default instance;
export { TypoHelper, KSpacingValue, KRadiusValue };
