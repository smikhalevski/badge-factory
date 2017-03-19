import fs from 'fs-extra';
import path from 'path';
import {GoogleFont, fetchGoogleFont} from '../../main/utils/fetchGoogleFont';
import {renderTemplate} from '../../main/renderTemplate';
import {parseTemplate} from '../../main/parseTemplate';

describe('fetchGoogleFont', () => {

  test('can fetch Google Font by family name', async() => {
    const font = await GoogleFont.loadFont('Alegreya Sans SC');
    expect(font.widthOfString('foo', 10)).toBeCloseTo(14.95);
  });

  test('', async() => {

    const template = parseTemplate(`
      async function render() {
        const font = await GoogleFont.loadFont('Baloo Bhaina');
        
        return (
          <svg width="100" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <EmbeddedFont font={font}/>
            <text x="50%" y="50%" textAnchor="middle" fontFamily={font.font.family}>
              Fooo
            </text>
          </svg>
        );
      };
      
      render();
    `);

    const code = await renderTemplate(template);

    fs.outputFileSync(path.resolve('./font-cache/test.svg'), code);
  });
});
