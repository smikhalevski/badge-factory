import fontkit from 'fontkit';
import {widthOfString} from '../widthOfString';
import {fetchGoogleFontList} from './fetchGoogleFontList';
import {fetchGoogleFont} from './fetchGoogleFont';
import {GoogleFontVariant} from '../../api/GoogleFontVariant';
import {createFontSubset} from '../createFontSubset';

export async function createGoogleFont(family, variant?: string = GoogleFontVariant.REGULAR) {
  const fonts = await fetchGoogleFontList();
  const buffer = await fetchGoogleFont(fonts, family, variant);
  const ttfFont = fontkit.create(buffer);

  const answer = {
    familyName: ttfFont.familyName,
    weight: parseInt(variant) || 500,
    buffer,
    subset: async string => {
      const buffer2 = await createFontSubset(buffer, string);
      return {...answer, buffer: buffer2};
    },
    widthOfString: (string, fontSize) => widthOfString(ttfFont, string, fontSize)
  };

  return answer;
}
