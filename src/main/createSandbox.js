import React from 'react';
import Color from 'tinycolor2';
import regeneratorRuntime from 'regenerator-runtime';
import {EmbeddedFont} from './fonts/EmbeddedFont';
import {createGoogleFont} from './fonts/google-font/createGoogleFont';

export function createSandbox() {
  return {
    React: {createElement: ::React.createElement},
    Math,
    EmbeddedFont,
    Color,
    Font: {createGoogleFont},
    regeneratorRuntime,

    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent
  };
}
