import React from 'react';
import {runInNewContext} from 'vm';
import {renderTemplate} from '../main2/renderTemplate';

describe('renderTemplate', () => {

  test('does not provide original React object to template context', async() => {
    const template = {
      code: '"use strict"; React.foo = 123; React.createElement("svg");',
      params: []
    };
    const code = await renderTemplate(template, runInNewContext);
    expect(React.foo).toBeUndefined();
    expect(code).toEqual('<svg></svg>');
  });

  test('fails if non element value is returned from template', done => {
    const template = {code: '123', params: []};
    renderTemplate(template, runInNewContext).catch(error => done());
  });
});
