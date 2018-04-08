// @flow
export function replacePathTokens(path: string, tokens: {[key: string]: string}): string {
  return path.replace(/:[^/]+/g, token => tokens[token.slice(1)]);
}
