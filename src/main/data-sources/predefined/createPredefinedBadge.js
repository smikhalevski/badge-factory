import {renderSvgBadge} from '../../renderSvgBadge';
import githubLabelTemplate from './github-label.txt';

const PredefinedBadgeId = {
  GITHUB_LABEL: 'github-label'
};

export async function createPredefinedBadge(path, params) {
  switch (path) {

    case PredefinedBadgeId.GITHUB_LABEL:
      return renderSvgBadge(githubLabelTemplate, params);
  }
  throw new Error(`Predefined badge ${path} does not exist`);
}
