import path from 'path';
import pick from 'lodash/pick';
import PDFDocument from 'pdfkit';
import parse from 'tinycolor2';
import sfBoldPath from './fonts/San-Francisco-Bold.ttf';

const PDF = new PDFDocument;

const FontFamily = {
  HELVETICA: 'Helvetica',
  SAN_FRANCISCO_BOLD: 'San Francisco Bold'
};

const ColorFormat = {
  HEX: 'hex'
};

export function createContext() {
  return {
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,

    ...pick(Math, Object.getOwnPropertyNames(Math)),

    toColor:    color => parse(color).toString(ColorFormat.HEX),
    luminosity: color => parse(color).getLuminance(),
    alpha:      color => parse(color).getAlpha(),
    greyscale:  color => parse(color).greyscale().toString(ColorFormat.HEX),
    lighten:    (color, amount = 10) => parse(color).lighten(amount).toString(ColorFormat.HEX),
    darken:     (color, amount = 10) => parse(color).darken(amount).toString(ColorFormat.HEX),
    desaturate: (color, amount = 10) => parse(color).desaturate(amount).toString(ColorFormat.HEX),
    saturate:   (color, amount = 10) => parse(color).saturate(amount).toString(ColorFormat.HEX),
    spin:       (color, amount =  0) => parse(color).spin(amount).toString(ColorFormat.HEX),

    widthOfString(value, fontSize = 12, fontFamily = FontFamily.SAN_FRANCISCO_BOLD) {
      switch (fontFamily) {
        case FontFamily.HELVETICA:
          break;

        case FontFamily.SAN_FRANCISCO_BOLD:
          fontFamily = path.resolve(__dirname, sfBoldPath);
          break;

        default:
          throw new Error(`Font family ${fontFamily} does not exist`);
      }

      return PDF
          .font(fontFamily)
          .fontSize(fontSize)
          .widthOfString(value);
    }
  };
}
