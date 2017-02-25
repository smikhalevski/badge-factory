import express from 'express';
import {createGistBadge} from './data-sources/createGistBadge';

if (DEBUG) {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      console.warn('Stop server due to hot module reload');
      process.exit();
    });
  }
}

const {PORT = 5000} = process.env;
const BadgeType = {
  GIST: 'gists'
};

startServer(PORT);

function startServer(port) {
  console.log(`Staring on port ${port}`);
  express()
      .use(express.static(__dirname))
      .get('/badges/:type/*', handleBadge)
      .listen(port);
}

export function handleBadge(request, response, next) {
  const {params: {type, 0: path}} = request;

  switch (type) {
    case BadgeType.GIST:
      createGistBadge(path, request.query)
          .then(svg => serveSvg(svg, request, response, next))
          .catch(next);
      break;

    default:
      new Error(`Data source ${type} does not exist`);
  }
}

export function serveSvg(svg, request, response, next) {
  const {maxAge = 3600} = request.query;
  response
      .set({
        'Content-Type': 'image/svg+xml',
        'Cache-Control': `public, max-age=${maxAge}`
      })
      .send(svg);
  next();
}
