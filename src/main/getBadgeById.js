const GITHUB_LABEL = `
  <svg xmlns="http://www.w3.org/2000/svg"
       width={Math.round(widthOfString(name)) + 5}
       height="18">
    <rect fill={'#' + color}
          rx="2"
          ry="2"
          width="100%"
          height="18"/>
    <text fill={Color('#' + color).luminosity() > .5 ? '#000' : '#fff'}
          x="50%"
          y="13"
          textAnchor="middle"
          fontWeight="600"
          fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
          fontSize="12">
      {name}
    </text>
  </svg>
`;

export function getBadgeById(id) {
  if (id == 'github-label') {
    return GITHUB_LABEL;
  }
  throw new Error(`Template ${id} could not be found`);
}
