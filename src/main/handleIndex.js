export function handleIndex(request, response, next) {
  response.send('hello');
  next();
}
