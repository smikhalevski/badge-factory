import {replacePathTokens} from '../../main2/utils/replacePathTokens';

describe('replacePathTokens', () => {

  test('replaces single token', () => {
    expect(replacePathTokens(':a', {a: 'b'})).toBe('b');
  });

  test('replaces token in the beginning of the string', () => {
    expect(replacePathTokens(':a/x', {a: 'b'})).toBe('b/x');
  });

  test('replaces token in the middle of the string', () => {
    expect(replacePathTokens('x/:a1/y/:a2/z', {a1: '_q1', a2: '_q2'})).toBe('x/_q1/y/_q2/z');
  });
});
