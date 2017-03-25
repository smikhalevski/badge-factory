import React from 'react';
import {optimizeSVG} from '../../main/utils/optimizeSVG';

describe('optimizeSVG', () => {

  test('optimizes input SVG string', async () => {
    const code = await optimizeSVG('<svg><rect x="2" y="2" fill="#ffffff" width="2" height="2"/></svg>');
    expect(code).toBe('<svg><path fill="#fff" d="M2 2h2v2H2z"/></svg>');
  });

  test('reject with an error if given string is not a valid SVG', done => {
    optimizeSVG('<svg').catch(error => done());
  });
});
