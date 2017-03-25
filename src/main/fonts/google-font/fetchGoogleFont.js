// @flow
import {GoogleFont, selectGoogleFont} from './selectGoogleFont';
import {GoogleFontVariant} from '../../api/GoogleFontVariant';

export async function fetchGoogleFont(
    fonts: GoogleFont[],
    family: string,
    variant?: string = GoogleFontVariant.REGULAR
): Promise<Buffer> {
  const googleFont = selectGoogleFont(fonts, family, variant);
  if (googleFont) {
    return fetch(googleFont.files[variant]).then(response => response.buffer());
  }
  return null;
}
