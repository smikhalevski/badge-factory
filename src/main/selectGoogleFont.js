import {GoogleFontType} from './types';
import {Buffer} from 'buffer';
import streamToPromise from 'stream-to-promise';
import {GoogleFontVariant} from './api/GoogleFontVariant';

export function selectGoogleFont(
    fonts: GoogleFontType[],
    family: string,
    variant?: string = GoogleFontVariant.REGULAR
): GoogleFontType | null {
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

export function widthOfString(font, text: string, size: number, features: []): number {
  const {advanceWidth} = font.layout(text, features);
  return advanceWidth * size / font.unitsPerEm;
}

export function subset(font, text: string): Promise<Buffer> {
  const subset = font.createSubset();
  for (const glyph of font.glyphsForString(text)) {
    subset.includeGlyph(glyph);
  }
  return streamToPromise(subset.encodeStream());
}

export async function fetchEndpoint(url: string) {
  const response = await fetch(url);
  const buffer = await res.blob();
  return fontkit.create(buffer);
}
