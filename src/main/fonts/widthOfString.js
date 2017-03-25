// @flow
import type {TTFFont} from './TTFFont';

export function widthOfString(
    font: TTFFont,
    string: string,
    fontSize?: number = 10,
    features?: []
): number {
  const {advanceWidth} = font.layout(string, features);
  return advanceWidth * fontSize / font.unitsPerEm;
}
