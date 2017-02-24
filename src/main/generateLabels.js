import path from 'path';
import fontPath from './verdana.ttf';
import PDFDocument from 'pdfkit';
import {getLuminosity} from './getLuminosity';

export function createLabelSvg(label) {
  const textColor = getLuminosity(label.color) > 128 ? '000' : 'fff';
  return `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${Math.round(widthOfString(label.name)) + 4}"
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

const document = new PDFDocument({size: 'A4', layout: 'landscape'})
    .font(path.resolve(__dirname, fontPath))
    .fontSize(12);

function widthOfString(value) {
  return document.widthOfString(value);
}
