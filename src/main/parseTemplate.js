// @flow
import {parse} from 'babylon';
import {transform} from 'babel-core';
import traverse from 'babel-traverse';
import generate from 'babel-generator';

const TEMPLATE_PLUGINS = ['jsx'];
const TEMPLATE_PRESETS = ['react', 'es2015', 'stage-0'];

export type Template = {
  /**
   * Node-compatible code of the template.
   */
  code: string;

  /**
   * List of variable names that are referenced but not declared in the template code.
   */
  params: string[];
};

export function parseTemplate(source: string): Template {
  const ast = parse(source, {plugins: TEMPLATE_PLUGINS});
  const params = new Set;
  traverse(ast, {
    ReferencedIdentifier({node: {name}, scope}) {
      if (scope.hasBinding(name)) {
        return;
      }
      params.add(name);
    }
  });
  const {code} = transform(generate(ast).code, {presets: TEMPLATE_PRESETS});
  return {code, params: [...params]};
}
