import startCase from 'lodash/startCase';
import path from 'path';
import glob from 'glob';
import PDFDocument from 'pdfkit';

const PDF = new PDFDocument;

const FontFamily = {
  HELVETICA: 'Helvetica'
};

const FONT_EXT = '.ttf';

const FONTS = glob
    .sync(path.join(__dirname, '**/*' + FONT_EXT))
    .reduce((fonts, file) => {
      const fontFamily = startCase(path.basename(file, FONT_EXT));
      fonts[fontFamily] = file;
      return fonts;
    }, {});

// Populate predefined PDF fonts.
for (const font of Object.values(FontFamily)) {
  FONTS[font] = font;
}

export function widthOfString(value, fontSize = 12, fontFamily = FontFamily.HELVETICA) {
  const font = FONTS[fontFamily];
  if (font == undefined) {
    throw new Error(`Font family "${fontFamily}" does not exist: ${Object.keys(FONTS)}`);
  }
  return PDF
      .font(font)
      .fontSize(fontSize)
      .widthOfString(value);
}
