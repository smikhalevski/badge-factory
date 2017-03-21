// @flow
import type {TemplateType} from './types';
import {parse} from 'babylon';
import {transform} from 'babel-core';
import traverse from 'babel-traverse';
import generate from 'babel-generator';

export function parseTemplate(source: string): TemplateType {
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
  const {code} = transform(generate(ast).code, {presets: ['react', 'es2015', 'stage-0']});
  return {code, params: [...params]};
}
