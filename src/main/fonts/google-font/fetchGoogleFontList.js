// @flow
import type {GoogleFont} from './selectGoogleFont';

const {GOOGLE_FONTS_KEY = 'AIzaSyDAv8pWwGu2Yp2QoYLqN3ztkhc7Mqlx9Xw'} = process.env;

export async function fetchGoogleFontList(): Promise<GoogleFont[]> {
  const {error, items} = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + GOOGLE_FONTS_KEY)
      .then(response => response.json());
  if (error) {
    throw new Error(error.message);
  }
  return items;
}
