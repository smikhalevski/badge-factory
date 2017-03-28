import React from 'react';
import {runInContext} from 'vm';
import {renderTemplate} from '../main/renderTemplate';

describe('renderTemplate', () => {

  test('does not provide original React object to template context', async() => {
    const template = {
      code: '"use strict"; React.foo = 123; React.createElement("svg");',
      params: []
    };
    const code = await renderTemplate(template, runInContext);
    expect(React.foo).toBeUndefined();
    expect(code).toEqual('<svg></svg>');
  });

  test('fails if non element value is returned from template', done => {
    const template = {code: '123', params: []};
    renderTemplate(template, runInContext).catch(error => done());
  });
});
