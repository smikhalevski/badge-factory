import {renderBadge} from './renderBadge';

export function handleGenerateBadge(request, response, next) {
  const {badgeSpec} = request.params;
  const [,badgeId] = badgeSpec.match(/^(.+)\.([^.]+)$/);

  const {maxAge = 3600, ...query} = request.query;

  renderBadge(badgeId, query)
      .then(source => {
        response
            .header({
              'Content-Type': 'image/svg+xml',
              'Cache-Control': `public, max-age=${maxAge}`
            })
            .send(source);
        next();
      })
      .catch(next);
}
