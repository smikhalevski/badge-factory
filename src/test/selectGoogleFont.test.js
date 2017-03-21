import {selectGoogleFont} from '../main/selectGoogleFont';
import {GoogleFontVariant} from '../main/api/GoogleFontVariant';

describe('selectGoogleFont', () => {

  const fontA = {
    family: 'A',
    files: {
      [GoogleFontVariant.REGULAR]: 'a1',
      [GoogleFontVariant.REGULAR_ITALIC]: 'a2',
      [GoogleFontVariant.BOLD]: 'a3'
    }
  };

  const fontB = {
    family: 'B',
    files: {
      [GoogleFontVariant.REGULAR]: 'b1',
      [GoogleFontVariant.BOLD_ITALIC]: 'b2'
    }
  };

  const fonts = [fontA, fontB];

  test('can select font by family name', () => {
    expect(selectGoogleFont(fonts, fontB.family)).toBe(fontB);
  });

  test('can select font by family name and variant', () => {
    expect(selectGoogleFont(fonts, fontA.family, GoogleFontVariant.BOLD)).toBe(fontA);
  });

  test('returns null if font cannot be found', () => {
    expect(selectGoogleFont(fonts, 'C')).toBeNull();
    expect(selectGoogleFont(fonts, fontA.family, 'foo')).toBeNull();
  });
});
