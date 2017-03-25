// @flow
import {Buffer} from 'buffer';
import {GoogleFontVariant} from '../../api/GoogleFontVariant';

export type GoogleFont = {
  family: string;
  files: {[key: string]: string};
};

export function selectGoogleFont(
    fonts: GoogleFont[],
    family: string,
    variant?: string = GoogleFontVariant.REGULAR
): GoogleFont | null {
  for (const font of fonts) {
    if (font.family == family) {
      if (variant in font.files) {
        return font;
      }
      break;
    }
  }
  return null;
}
