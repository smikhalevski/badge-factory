import 'isomorphic-fetch';
import requestPromise from 'request-promise';
import path from 'path';
import fs from 'fs-extra';
import PDFDocument from 'pdfkit';
import {Font} from 'fonteditor-core';

const GOOGLE_FONTS_API_KEY = 'AIzaSyDAv8pWwGu2Yp2QoYLqN3ztkhc7Mqlx9Xw';
const FONT_CACHE_DIR = 'font-cache';

export function fetchGoogleFontList(options = {}) {
  return requestPromise({
    method: 'GET',
    ...options,
    baseUrl: 'https://www.googleapis.com',
    uri: '/webfonts/v1/webfonts?key=' + GOOGLE_FONTS_API_KEY,
    headers: {
      'Referer': 'http://localhost:5000/',
      ...options.headers
    },
    json: true
  });
}

export async function fetchGoogleFont(family, variant = 'regular') {
  const fontList = await fetchGoogleFontList();
  for (const font of fontList.items) {
    if (font.family == family) {
      if (variant in font.files) {
        const buffer = await requestPromise({uri: font.files[variant], encoding: null});
        return {font, variant, buffer, weight: 500};
      }
      break;
    }
  }
  return null;
}

export async function getGoogleFont(family, vvv) {
  const {font, variant, buffer} = await fetchGoogleFont(family, vvv);

  // const fff = new Font(buffer, {type: 'ttf'});
  const fff = new Font(buffer, {type: 'ttf', subset: [...'o'].map(char => char.charCodeAt(0))});

  console.log(fff)

  vvv = variant;
  const fontPath = path.resolve(FONT_CACHE_DIR, path.basename(font.files[vvv]));
  fs.outputFileSync(fontPath, buffer);
  return {font, fontPath, vvv, base64: buffer.toString('base64'), fff}
}

export class GoogleFont {

  static async loadFont(family, variant) {
    const fontEnvelope = await getGoogleFont(family, variant);
    return new GoogleFont(fontEnvelope);
  }

  constructor(fontEnvelope) {
    Object.assign(this, fontEnvelope);
    this.document = new PDFDocument().font(fontEnvelope.fontPath);
  }

  widthOfString(value, size = 10) {
    return this.document.fontSize(size).widthOfString(value);
  }

  toBase64() {
    return this.base64;
  }
}
