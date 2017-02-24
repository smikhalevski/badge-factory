export function getLuminosity(color) {
  if (color.indexOf('#') == 0) {
    color = color.slice(1);
  }
  if (color.length == 3) {
    color = color.replace(/\w/g, char => char + char);
  }
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b); // ITU-R BT.709
}
