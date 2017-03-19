// @flow
import Svgo from 'svgo';

export function optimizeSvgPromise(source: string, svgo?: Object = new Svgo): Promise<string> {
  return new Promise((resolve, reject) => {
    svgo.optimize(source, result => {
      const {error, data} = result;
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  });
}
