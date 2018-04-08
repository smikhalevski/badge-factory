import express from 'express';
import {renderGistTemplate} from './data-sources/github/renderGistTemplate';
import {handleIndex} from './handleIndex';

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

startServer(PORT);

function startServer(port) {
  console.log(`Staring on port ${port}`);
  express()
      .use(express.static(__dirname))
      .get('/', handleIndex)
      .get('/badges/gists/:gistId/:fileId', handleGist)
      .listen(port);
}

function handleGist(request, response, next) {
  const {gistId, fileId} = request.params;
  const {maxAge, ...query} = request.query;
  renderGistTemplate(gistId, fileId, query)
      .then(svg => sendContent(svg, {maxAge}, response))
      .then(next)
      .catch(next);
}

export function sendContent(content, {maxAge}, response) {
  response
      .set({
        'Content-Type': 'image/svg+xml',
        'Cache-Control': `public, max-age=${maxAge}`
      })
      .send(content);
}
