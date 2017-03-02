// @flow
import {parse} from 'babylon';
import {transform} from 'babel-core';
import traverse from 'babel-traverse';
import generate from 'babel-generator';

export function parseTemplate(source: string): {code: string, params: string[]} {
  const ast = parse(source, {plugins: ['jsx']});
  const params = new Set;
  traverse(ast, {
    ReferencedIdentifier({node: {name}, scope}) {
      if (scope.hasBinding(name)) {
        return;
      }
      params.add(name);
    }
  });
  const {code} = transform(generate(ast).code, {presets: ['react']});
  return {code, params: [...params]};
}
