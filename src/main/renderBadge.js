import React from 'react';
import ReactDOM from 'react-dom/server';
import safeEval from 'safe-eval';
import {parseTemplate} from './parseTemplate';
import {getBadgeById} from './getBadgeById';
import {optimizeSvg} from './optimizeSvg';
import templateContext from './templateContext';

export function renderBadge(badgeId, values = {}) {
  const source = getBadgeById(badgeId);
  const {code} = parseTemplate(source);

  const element = safeEval(code, {...templateContext, ...values, React});
  const svg = ReactDOM.renderToStaticMarkup(element);

  return optimizeSvg(svg);
}
