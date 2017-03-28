import {timeoutPromise} from './utils/timeoutPromise';
// @flow
export function runInWorkerContext(
    code: string,
    sandbox: Object,
    {timeout}: Object
): Promise<any> {
  code = `
    addEventListener('message', function(sandbox) {
      Object.assign(self, sandbox);
      var answer = (0,eval)(${code.code.replace(/'/g, "\\'").replace('\n', '\\n')})
      if (answer instanceof Promise) {
        answer
          .then(answer => postMessage(answer))
          .catch(error => postMessage(error));
      } else {
        postMessage(answer);
      }
    });
  `;

  const blob = new Blob([code], {type: 'text/javascript'});
  const worker = new Worker(URL.createObjectURL(blob));

  const answer = new Promise((resolve, reject) => {
    worker.addEventListener('message', answer => {
      resolve(answer);
      worker.terminate();
    });
    worker.addEventListener('error', error => {
      reject(error);
      worker.terminate();
    });
    worker.postMessage(sandbox);
  });
  if (timeout > 0) {
    const TIMEOUT_ANSWER = {};
    return Promise
        .race([answer, timeoutPromise(timeout, TIMEOUT_ANSWER)])
        .then(answer => {
          if (answer == TIMEOUT_ANSWER) {
            worker.terminate();
            throw new Error('Timeout');
          }
          return answer;
        });
  }
  return answer;
}
