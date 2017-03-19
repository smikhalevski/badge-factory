import {GoogleFont} from './types';
import {FontStyle} from './api/FontStyle';
import {FontWeight} from './api/FontWeight';
import {GoogleFontStyle} from './api/GoogleFontStyle';

export function selectGoogleFont(
    fonts: GoogleFont[],
    family: string,
    {weight = FontWeight.NORMAL, style = FontStyle.NORMAL}?: Object = {}
): {font: GoogleFont, variant: string} {
  const variant = style == FontStyle.NORMAL
      ? weight == FontWeight.NORMAL ? GoogleFontStyle.REGULAR : weight
      : weight == FontWeight.NORMAL ? GoogleFontStyle.ITALIC : weight + GoogleFontStyle.ITALIC;

  for (const font of fonts) {
    if (font.family == family) {
      if (variant in font.files) {
        return {font, variant};
      }
      break;
    }
  }
  return null;
}
