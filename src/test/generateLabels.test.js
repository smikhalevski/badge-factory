import {getLuminosity} from '../main/getLuminosity';

describe('getLuminosity', () => {

  test('returns color luminosity', () => {
    expect(getLuminosity('#fff')).toBe(255);
  });
});
