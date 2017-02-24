import express from 'express';
import {handleRequest} from './handleRequest';

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

startServer();

export function startServer() {
  console.log(`Staring on port ${PORT}`);
  express()
      .use(express.static(__dirname))
      .use(handleRequest)
      .listen(PORT);
}
