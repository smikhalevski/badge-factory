// @flow
import type {Template} from './parseTemplate';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {createSandbox} from '../main/createSandbox';

export async function renderTemplate(
    {code, params}: Template,
    safeExecute: (code: string, sandbox: Object, options?: Object) => Promise<any>,
    values?: Object,
    options?: Object
): Promise<string> {
  const sandbox = createSandbox();
  for (const param of params) {
    sandbox[param] = null;
  }
  Object.assign(sandbox, values);
  const element = await safeExecute(code, sandbox, options);
  return ReactDOM.renderToStaticMarkup(element);
}
