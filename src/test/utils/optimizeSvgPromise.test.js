import React from 'react';
import {optimizeSvgPromise} from '../../main/utils/optimizeSvgPromise';

describe('optimizeSvgPromise', () => {

  test('optimizes input SVG string', async () => {
    const code = await optimizeSvgPromise('<svg><rect x="2" y="2" fill="#ffffff" width="2" height="2"/></svg>');
    expect(code).toBe('<svg><path fill="#fff" d="M2 2h2v2H2z"/></svg>');
  });

  test('reject with an error if given string is not a valid SVG', done => {
    optimizeSvgPromise('<svg').catch(error => done());
  });
});
