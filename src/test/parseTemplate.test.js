import React from 'react';
import {runInNewContext} from 'vm';
import {parseTemplate} from '../main2/parseTemplate';

describe('parseTemplate', () => {

  test('render does not require parameter', () => {
    const {code, params} = parseTemplate(`<svg/>`);
    expect(params).toEqual([]);
    expect(runInNewContext(code, {React})).toEqual(<svg/>);
  });

  test('inserts values', () => {
    const {code, params} = parseTemplate(`<svg>{value}</svg>`);
    expect(params).toEqual(['value']);
    expect(runInNewContext(code, {React, value: 'foo'})).toEqual(<svg>foo</svg>);
  });

  test('throws error on global function invocations', () => {
    const {code, params} = parseTemplate(`<svg>{console.log('foo')}</svg>`);
    expect(params).toEqual(['console']);
    expect(() => runInNewContext(code, {React})).toThrow();
  });
});
