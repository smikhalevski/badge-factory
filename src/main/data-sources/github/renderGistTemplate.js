import {requestGitHub, GitHubEndpoint} from './requestGitHub';
import {renderTemplate} from '../../renderTemplate';

export async function renderGistTemplate(gistId, fileId, query) {
  const gist = await requestGitHub(GitHubEndpoint.GIST, {...query, parts: {gistId}});

  if (fileId in gist.files) {
    return renderTemplate(gist.files[fileId].content, query);
  }
  throw new Error(`File ${fileId} not found in gist ${gistId}`);
}
