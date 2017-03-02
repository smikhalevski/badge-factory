// @flow
import React from 'react';
import ReactDOM from 'react-dom/server';
import safeEval from 'safe-eval';
import Svgo from 'svgo';
import {parseTemplate} from './parseTemplate';
import {createGlobals} from './createGlobals';

const SVGO = new Svgo();

export function optimize(svg: string, svgo: Object = SVGO): Promise<string> {
  return new Promise((resolve, reject) => {
    svgo.optimize(svg, result => {
      const {error, data} = result;
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  });
}

export function renderTemplate(source: string, values: Object = {}): Promise<string> {
  const {code} = parseTemplate(source);
  const element = safeEval(code, {...values, ...createGlobals()});
  return optimize(ReactDOM.renderToStaticMarkup(element));
}
