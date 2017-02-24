import {Script, createContext} from 'vm';
import React from 'react';
import {transform} from 'babel-core';
import {parse} from 'babylon';
import generate from 'babel-generator';
import traverse from 'babel-traverse';
import {isMemberExpression} from 'babel-types';

export function parseTemplate(source, presets) {
  const ast = parse(source, {plugins: ['jsx']});
  const params = new Set;
  traverse(ast, {
    ReferencedIdentifier({node: {name}, scope}) {
      if (scope.hasBinding(name)) {
        // Variable is declared in scope of parseTemplate.
        return;
      }
      params.add(name);
    }
  });
  const {code} = transform(generate(ast).code, {presets});
  const script = new Script(code);

  return {
    render(params = {}) {
      // Safe script execution in virtual context.
      return script.runInNewContext({...params, React});
    },
    params: Array.from(params)
  };
}
