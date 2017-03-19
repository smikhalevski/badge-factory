export const FetchCredentials = {
  /**
   * Never send cookies.
   *
   * @type {String}
   */
  OMIT: 'omit',

  /**
   * Only send cookies if the URL is on the same origin as the calling script.
   *
   * @type {String}
   */
  SAME_ORIGIN: 'same-origin',

  /**
   * Always send cookies, even for cross-origin calls.
   *
   * @type {String}
   */
  INCLUDE: 'include'
};

Object.freeze(FetchCredentials);
