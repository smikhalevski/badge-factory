// @flow
import type {Template} from './parseTemplate';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {runInNewContext} from 'vm';
import {createSandbox} from './createSandbox';
import {optimizeSvgPromise} from './utils/optimizeSvgPromise';

export async function renderTemplate({code}: Template, values: Object = {}, options, Object): Promise<string> {
  const sandbox = {...createSandbox(), ...values};
  const element = await runInNewContext(code, sandbox, options);
  if (React.isValidElement(element)) {
    return optimizeSvgPromise(ReactDOM.renderToStaticMarkup(element));
  }
  throw new Error('Expected template to return a valid React element');
}
