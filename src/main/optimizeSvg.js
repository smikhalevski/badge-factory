import Svgo from 'svgo';

const SVGO = new Svgo();

export function optimizeSvg(code) {
  return new Promise(resolve => SVGO.optimize(code, result => resolve(result.data)));
}
