import requestPromise from 'request-promise';

export function requestGithub(path, options = {}) {
  let {auth} = options;
  if (auth) {
    const [user, pass] = auth.split(':');
    auth = {user, pass};
  }
  return requestPromise({
    method: 'GET',
    baseUrl: 'https://api.github.com',
    ...options,
    auth,
    url: path.replace(/:[^/]+/g, part => options[part.slice(1)]),
    headers: {
      'User-Agent': '',
      ...options.headers
    },
    json: true
  });
}
