const GITHUB_LABEL = `
  <svg xmlns="http://www.w3.org/2000/svg"
       width={Math.round(widthOfString(name)) + 6}
       height="20">
    <rect fill={'#' + color}
          stroke={color == 'fff' ? '#eee' : null}
          x="1"
          y="1"
          rx="2"
          ry="2"
          width={Math.round(widthOfString(name)) + 4}
          height="18"/>
    <text fill={Color('#' + color).luminosity() > .4 ? '#000' : '#fff'}
          x="50%"
          y="14"
          textAnchor="middle"
          fontWeight="600"
          fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
          fontSize="12">
      {name}
    </text>
  </svg>
`;

export function getBadgeById(badgeId) {
  switch (badgeId) {
    case 'github-label':
      return GITHUB_LABEL;
  }
  throw new Error(`Template ${id} could not be found`);
}
