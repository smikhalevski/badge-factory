// @flow
import type {TemplateType} from './types';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {runInNewContext} from 'vm';
import {createSandbox} from './createSandbox';

export async function renderTemplate(
    {code}: TemplateType,
    values?: Object = {},
    options?: Object
): Promise<string> {
  const sandbox = {...createSandbox(), ...values};
  const element = await runInNewContext(code, sandbox, options);

  console.log(element)

  return ReactDOM.renderToStaticMarkup(element);
}
