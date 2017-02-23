export function handleRequest(config, req, res, next) {
  res.send('Working!');
  next();
}
