// @flow
import type {TtfFont} from '../../main2/fontkit/TTFFont';

export function widthOfString(
    font: TtfFont,
    string: string,
    fontSize?: number = 10,
    features?: []
): number {
  const {advanceWidth} = font.layout(string, features);
  return advanceWidth * fontSize / font.unitsPerEm;
}
