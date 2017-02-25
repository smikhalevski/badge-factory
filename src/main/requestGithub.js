import requestPromise from 'request-promise';

function requestGithub(path = '/', options = {}) {
  return requestPromise({
    method: 'GET',
    baseUrl: 'https://api.github.com',
    ...options,
    url: path.replace(/:[^/]+/g, part => options[part.slice(1)]),
    headers: {
      'User-Agent': '',
      ...options.headers
    },
    json: true
  });
}
