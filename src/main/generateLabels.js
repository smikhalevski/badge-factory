import fs from 'fs';
import http from 'http';
import https from 'https';
import PDFDocument from 'pdfkit';
import SVGO from 'svgo';
import options from './config.json';

requestGithub('/repos/:owner/:repo/labels?per_page=100', options)
    .then(labels => {
      const svgo = new SVGO;
      for (const label of labels.slice(0, 1)) {
        const filePath = `../../target/out/${label.name.toLowerCase().replace(/\s/g, '-')}.svg`;
        const svg = createLabelSvg(label);
        svgo.optimize(svg, result => fs.writeFileSync(filePath, result.data));
      }
    })
    .catch(error => console.log(error.stack));

function createLabelSvg(label) {
  const textColor = getLuminosity(label.color) > .5 ? '000' : 'fff';
  return `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${Math.round(widthOfString(label.name)) + 6}"
         height="18">
      <rect fill="#${label.color}"
            rx="2"
            ry="2"
            width="100%"
            height="18"/>
      <text fill="#${textColor}"
            x="50%"
            y="13"
            text-anchor="middle"
            font-weight="600"
            font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
            font-size="12">
        ${label.name}
      </text>
    </svg>
  `;
}

function widthOfString(value, fontPath = '/System/Library/Fonts/SFNSText-Regular.otf') {
  return new PDFDocument({size: 'A4', layout: 'landscape'})
      .font(fontPath)
      .fontSize(12)
      .widthOfString(value);
}

function getLuminosity(color) {
  if (color.indexOf('#') == 0) {
    color = color.slice(1);
  }
  if (color.length == 3) {
    color = color.replace(/\w/g, char => char + char);
  }
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // ITU-R BT.709
}

function requestGithub(path = '/', options = {}) {
  return new Promise((resolve, reject) => {
    https
        .get({
          method: 'GET',
          host: 'api.github.com',
          ...options,
          path: path.replace(/:[^/]+/g, part => options[part.slice(1)]),
          headers: {
            'User-Agent': '',
            ...options.headers
          }
        }, res => {
          if (res.statusCode >= 300) {
            throw new Error(http.STATUS_CODES[res.statusCode]);
          }
          let json = '';
          res.on('data', chunk => json += chunk);
          res.on('end', () => resolve(JSON.parse(json)));
        })
        .on('error', reject);
  });
}
