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

  test('can be used in template', async() => {

    const template = parseTemplate(`
      async function render() {
        const font = await GoogleFont.loadFont('Baloo Bhaina');
        const fontSize = 20;
        const text = 'Fooo';
      
        return (
          <svg width={Math.round(font.widthOfString(text, fontSize) + 10)}
               height={fontSize * 1.3}
               version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <EmbeddedFont font={font}/>
            <rect x="0"
                  y="0"
                  rx="4"
                  ry="4"
                  width="100%"
                  height="100%"
                  fill="#dedede"/>
            <text x="50%"
                  y={fontSize}
                  textAnchor="middle"
                  fontFamily={font.font.family}
                  fontSize={fontSize}>
              {text}
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
