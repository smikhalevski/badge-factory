import {default as express, Router} from 'express';
import {handleGenerateBadge} from './handleGenerateBadge';

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

  const router = Router();

  express()
      .use(express.static(__dirname))
      .use(router)
      .listen(PORT);

  router.get('/badges/:badgeSpec', handleGenerateBadge);
}
