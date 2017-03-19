import 'isomorphic-fetch';
import {HttpMethod} from './api/HttpMethod';


export const GOOGLE_FONTS_KEY = 'AIzaSyDAv8pWwGu2Yp2QoYLqN3ztkhc7Mqlx9Xw';


export async function fetchGoogleFonts({key, ...options}?: Object = {key: GOOGLE_FONTS_KEY}): GoogleFont[] {
  return fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + key, options)
      .then(res => res.json())
      .then(list => list.items);
}
