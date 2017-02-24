import React from 'react';
import {parseTemplate} from '../main/parseTemplate';

describe('parseTemplate', () => {

  test('render does not require parameter', () => {
    const tpl = parseTemplate(`<svg/>`, ['react']);

    expect(tpl.params).toEqual([]);
    expect(tpl.render()).toEqual(<svg/>);
  });

  test('inserts values', () => {
    const tpl = parseTemplate(`<svg>{value}</svg>`, ['react']);

    expect(tpl.params).toEqual(['value']);
    expect(tpl.render({value: 'foo'})).toEqual(<svg>foo</svg>);
  });

  test('throws error on global function invocations', () => {
    const tpl = parseTemplate(`<svg>{console.log('foo')}</svg>`, ['react']);

    // `console` is not defined in template's scope.
    expect(tpl.params).toEqual(['console']);
    expect(::tpl.render).toThrow();
  });
});
