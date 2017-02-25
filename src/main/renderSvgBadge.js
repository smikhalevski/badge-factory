import React from 'react';
import ReactDOM from 'react-dom/server';
import safeEval from 'safe-eval';
import Svgo from 'svgo';
import {parseTemplate} from './parseTemplate';
import {createContext} from './createContext';

const SVGO = new Svgo();

export function renderSvgBadge(source, params = {}) {
  const {code} = parseTemplate(source);
  const context = {...createContext(), ...params, React};
  const element = safeEval(code, context);
  const svg = ReactDOM.renderToStaticMarkup(element);
  return new Promise(resolve => SVGO.optimize(svg, result => resolve(result.data)));
}
