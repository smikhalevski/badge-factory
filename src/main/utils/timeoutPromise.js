// @flow
export function timeoutPromise<T>(delay: number, value?: T): Promise<T> {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}
