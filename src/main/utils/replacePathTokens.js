// @flow
export function replacePathTokens(path, tokens) {
  return path.replace(/:[^/]+/g, token => tokens[token.slice(1)]);
}
