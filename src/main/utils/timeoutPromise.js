// @flow
export function timeoutPromise(delay: number, value?: any) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}
