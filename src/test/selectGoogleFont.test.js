import {FontWeight} from '../main/api/FontWeight';
import {selectGoogleFont} from '../main/selectGoogleFont';
import {FontStyle} from '../main/api/FontStyle';
import {GoogleFontStyle} from '../main/api/GoogleFontStyle';

describe('selectGoogleFont', () => {

  const REGULAR = GoogleFontStyle.REGULAR;
  const REGULAR_BOLD = FontWeight.BOLD;
  const ITALIC = GoogleFontStyle.ITALIC;
  const ITALIC_BOLD = FontWeight.BOLD + GoogleFontStyle.ITALIC;

  const fontA = {
    family: 'A',
    files: {
      [REGULAR]: '//regular',
      [ITALIC]: '//italic',
      [REGULAR_BOLD]: '//700'
    }
  };

  const fontB = {
    family: 'B',
    files: {
      [REGULAR]: '//regular',
      [ITALIC_BOLD]: '//700italic'
    }
  };

  const fonts = [fontA, fontB];

  test('can select font by family name', () => {
    expect(selectGoogleFont(fonts, fontB.family)).toEqual({font: fontB, variant: REGULAR});
  });

  test('can select font by family name and weight', () => {
    expect(selectGoogleFont(fonts, fontA.family, {weight: FontWeight.BOLD})).toEqual({font: fontA, variant: REGULAR_BOLD});
  });

  test('can select font by family name, weight and style', () => {
    expect(selectGoogleFont(fonts, fontB.family, {weight: FontWeight.BOLD, style: FontStyle.ITALIC})).toEqual({font: fontB, variant: ITALIC_BOLD});
  });

  test('can select font by family name, style', () => {
    expect(selectGoogleFont(fonts, fontA.family, {style: FontStyle.ITALIC})).toEqual({font: fontA, variant: ITALIC});
  });

  test('returns null if font cannot be found', () => {
    expect(selectGoogleFont(fonts, 'C')).toBeNull();
    expect(selectGoogleFont(fonts, fontA.family, {weight: FontWeight.BOLD, style: FontStyle.ITALIC})).toBeNull();
  });
});
