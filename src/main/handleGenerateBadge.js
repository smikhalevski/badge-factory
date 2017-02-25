import {renderBadge} from './renderBadge';

export function handleGenerateBadge(request, response, next) {
  const {badgeSpec} = request.params;
  const [,badgeId] = badgeSpec.match(/^(.+)\.([^.]+)$/);

  renderBadge(badgeId, request.query)
      .then(source => {
        response
            .header('Content-Type', 'image/svg+xml')
            .send(source);
        next();
      })
      .catch(next);
}
