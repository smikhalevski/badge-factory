// @flow
import type {Template} from './parseTemplate';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {runInNewContext} from 'vm';
import {createSandbox} from './createSandbox';

export async function renderTemplate(
    {code}: Template,
    values?: Object = {},
    options?: Object
): Promise<string> {
  const sandbox = {...createSandbox(), ...values};
  const element = await runInNewContext(code, sandbox, options);
  return ReactDOM.renderToStaticMarkup(element);
}
