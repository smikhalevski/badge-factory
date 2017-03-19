// @flow
import requestPromise from 'request-promise';

const {GITHUB_API_AUTH} = process.env;

export const GitHubEndpoint = {
  GIST: '/gists/:gistId'
};

export function requestGitHub(path: string, options: Object = {}): Object {
  const {tokens = {}, auth = GITHUB_API_AUTH} = options;

  const config = {
    method: 'GET',
    ...options,
    baseUrl: 'https://api.github.com',
    uri: path.replace(/:[^/]+/g, token => tokens[token.slice(1)]),
    headers: {
      'User-Agent': '',
      ...options.headers
    },
    json: true
  };

  if (/:/.test(auth)) {
    const [user, pass] = auth.split(':');
    config.auth = {user, pass};
  }

  return requestPromise(config);
}
