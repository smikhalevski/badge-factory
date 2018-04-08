import fs from 'fs';
import fontkit from 'fontkit';
import {foo} from '../../main2/fontkit/StandaloneTTFSubset';

describe('StandaloneTTFSubset', () => {

  test('encodes', () => {
    const font = fontkit.openSync(__dirname + '/font.ttf');
    const subset = foo(font);

    font.layout('ABC')
        .glyphs
        .forEach(glyph => subset.includeGlyph(glyph));

    subset.encodeStream()
        .pipe(fs.createWriteStream(__dirname + '/subset.ttf'));
  });
});
