import express from 'express';
import {handleRequest} from './handleRequest';
import config from './config.json';

if (DEBUG) {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      console.warn('Stop server due to hot module reload');
      process.exit();
    });
  }
}

startServer(config);

export function startServer(config) {
  console.log(`Staring on port ${config.port}`);
  express()
      .use(express.static(__dirname))
      .use(handleRequest.bind(undefined, config))
      .listen(config.port);
}
