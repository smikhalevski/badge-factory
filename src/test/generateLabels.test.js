import {getLuminosity} from '../main/generateLabels';

describe('getLuminosity', () => {

  test('returns color luminosity', () => {
    expect(getLuminosity('#fff')).toBe(255);
  });
});
