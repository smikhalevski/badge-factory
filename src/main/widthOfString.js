import path from 'path';
import PDFDocument from 'pdfkit';
import verdanaPath from './verdana.ttf';

const PDF = new PDFDocument({size: 'A4', layout: 'landscape'}).font(path.resolve(__dirname, verdanaPath));

export function widthOfString(value, fontSize = 12) {
  return PDF.fontSize(fontSize).widthOfString(value);
}
