import PDFDocument from 'pdfkit';
import parse from 'tinycolor2';

const PDF = new PDFDocument;

const FontFamily = {
  HELVETICA: 'Helvetica'
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
    ...Math,

    toColor:    color => parse(color).toString(ColorFormat.HEX),
    luminosity: color => parse(color).getLuminance(),
    alpha:      color => parse(color).getAlpha(),
    greyscale:  color => parse(color).greyscale().toString(ColorFormat.HEX),
    lighten:    (color, amount = 10) => parse(color).lighten(amount).toString(ColorFormat.HEX),
    darken:     (color, amount = 10) => parse(color).darken(amount).toString(ColorFormat.HEX),
    desaturate: (color, amount = 10) => parse(color).desaturate(amount).toString(ColorFormat.HEX),
    saturate:   (color, amount = 10) => parse(color).saturate(amount).toString(ColorFormat.HEX),
    spin:       (color, amount =  0) => parse(color).spin(amount).toString(ColorFormat.HEX),

    widthOfString(value, fontSize = 12) {
      return PDF
          .font(FontFamily.HELVETICA)
          .fontSize(fontSize)
          .widthOfString(value);
    }
  };
}
