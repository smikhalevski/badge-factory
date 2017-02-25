import React from 'react';
import safeEval from 'safe-eval';
import {parseTemplate} from '../main/parseTemplate';

describe('parseTemplate', () => {

  test('render does not require parameter', () => {
    const tpl = parseTemplate(`<svg/>`);

    expect(tpl.params).toEqual([]);
    expect(safeEval(tpl.code, {React})).toEqual(<svg/>);
  });

  test('inserts values', () => {
    const tpl = parseTemplate(`<svg>{value}</svg>`);

    expect(tpl.params).toEqual(['value']);
    expect(safeEval(tpl.code, {React, value: 'foo'})).toEqual(<svg>foo</svg>);
  });

  test('throws error on global function invocations', () => {
    const tpl = parseTemplate(`<svg>{console.log('foo')}</svg>`);

    // `console` is not defined in template's scope.
    expect(tpl.params).toEqual(['console']);
    expect(() => safeEval(tpl.code, {React})).toThrow();
  });
});
