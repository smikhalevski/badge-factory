import React from 'react';
import Color from 'tinycolor2';
import {GoogleFont} from './utils/fetchGoogleFont';
import {EmbeddedSvgFont} from './utils/EmbeddedFont';
import regeneratorRuntime from 'regenerator-runtime';

export function createSandbox() {
  return {
    React: {createElement: ::React.createElement},
    Math,
    GoogleFont,
    EmbeddedSvgFont,
    Promise,
    Color,
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
