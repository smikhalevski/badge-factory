import React from 'react';
import {renderTemplate} from '../main/renderTemplate';

describe('renderTemplate', () => {

  test('does not provide original React object to template context', async () => {
    const svg = await renderTemplate(`<svg>{(function(){React.foo = 123})()}</svg>`);

    expect(React.foo).toBeUndefined();
    expect(svg).toEqual('<svg/>');
  });
});
