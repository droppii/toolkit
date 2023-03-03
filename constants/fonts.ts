import { Platform } from 'react-native';

class LFonts {
  private prefix = Platform.OS === 'ios' ? 'SFProDisplay' : 'SF-Pro-Display';

  bold = `${this.prefix}-Heavy`;
  semiBold = `${this.prefix}-Bold`;
  medium = `${this.prefix}-Medium`;
  regular = `${this.prefix}-Regular`;
  regularItalic = `${this.prefix}-RegularItalic`;
}

class Fonts {
  private prefix = Platform.OS === 'ios' ? 'SFProText' : 'Roboto';

  bold = `${this.prefix}-Bold`;
  medium = `${this.prefix}-Medium`;
  regular = `${this.prefix}-Regular`;
}

export const KFonts = new Fonts();
export const LegacyFonts = new LFonts();
