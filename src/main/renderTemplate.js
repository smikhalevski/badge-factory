// @flow
import type {Template} from './parseTemplate';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {createSandbox} from './createSandbox';

export type RunInContext = (code: string, sandbox: Object, options: Object) => Promise<any>;

export async function renderTemplate(
    {code, params}: Template,
    runInContext: RunInContext,
    values: Object,
    options?: Object
): Promise<string> {
  const sandbox = createSandbox();
  for (const param of params) {
    sandbox[param] = null;
  }
  Object.assign(sandbox, values);
  const element = await runInContext(code, sandbox, options);
  return ReactDOM.renderToStaticMarkup(element);
}
