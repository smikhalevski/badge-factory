// @flow
import SVGO from 'svgo';

export function optimizeSvg(source: string, svgo?: Object = new SVGO): Promise<string> {
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
