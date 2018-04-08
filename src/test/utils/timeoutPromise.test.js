import React from 'react';
import {timeoutPromise} from '../../main2/utils/timeoutPromise';

describe('timeoutPromise', () => {

  test('returns Promise that resolves in given timeout', async () => {
    const startTimestamp = Date.now();
    const value = await timeoutPromise(200);
    expect(Date.now() - startTimestamp).toBeGreaterThanOrEqual(200);
    expect(value).toBeUndefined();
  });

  test('resolves with provided value', async () => {
    const startTimestamp = Date.now();
    const value = await timeoutPromise(200, 'foo');
    expect(Date.now() - startTimestamp).toBeGreaterThanOrEqual(200);
    expect(value).toBe('foo');
  });
});
