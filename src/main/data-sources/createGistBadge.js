import {requestGithub} from './requestGithub';
import {renderSvgBadge} from '../renderSvgBadge';

export async function createGistBadge(path, params) {
  const [gistId, fileId] = path.split('/');
  const gist = await requestGithub('/gists/:gistId', {gistId, ...params});

  if (fileId in gist.files) {
    return renderSvgBadge(gist.files[fileId].content, params);
  }
  throw new Error(`File ${fileId} not found in gist ${gistId}`);
}
