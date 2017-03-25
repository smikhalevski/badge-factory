// @flow
import uniq from 'lodash/uniq';
import {Font} from 'fonteditor-core';

export function createFontSubset(buffer: Buffer, string: string): Promise<Buffer> {
  const subset = uniq(string.split('')).map(char => char.charCodeAt(0));
  const fff = new Font(buffer, {type: 'ttf', subset});
  return fff.write({type: 'ttf', hinting: true});
}
