import PDFDocument from 'pdfkit';

export function createLabelSvg(label) {
  const textColor = getLuminosity(label.color) > 128 ? '000' : 'fff';
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

export function getLuminosity(color) {
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
  return Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b); // ITU-R BT.709
}
