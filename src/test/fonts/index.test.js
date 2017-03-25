import 'isomorphic-fetch';
import fs from 'fs-extra';
import path from 'path';
import {renderTemplate} from '../../main/renderTemplate';
import {parseTemplate} from '../../main/parseTemplate';
import {optimizeSVG} from '../../main/utils/optimizeSVG';

describe('fonts', () => {

  test('can be used in template', async() => {

    const template = parseTemplate(`
      async function render() {
        const text = 'Fooo';
        
        const font = await Font.createGoogleFont('Baloo Bhaina')
        
        // Reduce font size via subsetting
        const fontSubset = await font.subset(text);
        const fontSize = 20;
      
        return (
          <svg width={Math.round(fontSubset.widthOfString(text, fontSize) + 10)}
               height={fontSize * 1.3}
               version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <defs>
              <EmbeddedFont font={fontSubset}/>
            </defs>
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
                  fontFamily={font.familyName}
                  fontSize={fontSize}>
              {text}
            </text>
          </svg>
        );
      };
      
      render();
    `);

    const svg = await renderTemplate(template);

    const optimizedSvg = await optimizeSVG(svg);


    // console.log(code)

    fs.outputFileSync(path.resolve('./font-cache/test.svg'), optimizedSvg);
  });
});
