import memoize from 'lodash/memoize';
import pathToRegExp from 'path-to-regexp';
import SVGO from 'svgo';
import {createLabelSvg} from './generateLabels';

const compilePath = memoize((pattern, options) => {
  const keys = [];
  return {regExp: pathToRegExp(pattern, keys, options), keys};
}, (pattern, options) => pattern + JSON.stringify(options));


export function matchPath(pathname, path, options = {}) {
  const {exact = false, strict = false} = options;

  const {regExp, keys} = compilePath(path, {end: exact, strict});
  const match = regExp.exec(pathname);

  if (!match) {
    return null;
  }

  const [url, ...values] = match;
  const isExact = pathname === url;

  if (exact && !isExact) {
    return null;
  }
  return {
    path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact, // whether or not we matched exactly
    params: keys.reduce((params, key, index) => {
      params[key.name] = decodeURIComponent(values[index]);
      return params;
    }, {})
  }
}

export function handleRequest(req, res, next) {
  const match = matchPath(req.url, '/github-label/:color/:name', {exact: true});
  if (match) {
    const svgo = new SVGO;
    const svg = createLabelSvg(match.params);
    svgo.optimize(svg, result => {
      res.header('Content-Type', 'image/svg+xml');
      res.send(result.data);
      res.end();
      next();
    });
  } else {
    res.send('Use URL format <code>/github-label/:color/:name</code>');
    next();
  }
}
