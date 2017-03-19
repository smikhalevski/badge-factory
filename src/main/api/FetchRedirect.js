export const FetchRedirect = {
  /**
   * Automatically follow redirects.
   *
   * @type {String}
   */
  FOLLOW: 'follow',

  /**
   * Abort with an error if a redirect occurs.
   *
   * @type {String}
   */
  ERROR: 'error',

  /**
   * Handle redirects manually.
   *
   * @type {String}
   */
  MANUAL: 'manual'
};

Object.freeze(FetchRedirect);
