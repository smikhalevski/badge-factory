export function timeoutPromise(delay, value) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}
