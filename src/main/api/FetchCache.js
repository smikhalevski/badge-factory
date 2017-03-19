export const FetchCache = {
  /**
   * Fetch will inspect the HTTP cache on the way to the network. If there is a fresh response it will be used.
   * If there is a stale response a conditional request will be created, and a normal request otherwise.
   * It then updates the HTTP cache with the response. [HTTP]
   *
   * @type {String}
   * */
  DEFAULT: 'default',

  /**
   * Fetch behaves as if there is no HTTP cache at all.
   *
   * @type {String}
   */
  NO_STORE: 'no-store',

  /**
   * Fetch behaves as if there is no HTTP cache on the way to the network.
   * Ergo, it creates a normal request and updates the HTTP cache with the response.
   *
   * @type {String}
   * */
  RELOAD: 'reload',

  /**
   * Fetch creates a conditional request if there is a response in the HTTP cache and a normal request otherwise.
   * It then updates the HTTP cache with the response.
   *
   * @type {String}
   * */
  NO_CACHE: 'no-cache',

  /**
   * Fetch uses any response in the HTTP cache matching the request, not paying attention to staleness.
   * If there was no response, it creates a normal request and updates the HTTP cache with the response.
   *
   * @type {String}
   * */
  FORCE_CACHE: 'force-cache',

  /**
   * Fetch uses any response in the HTTP cache matching the request, not paying attention to staleness.
   * If there was no response, it returns a network error. (Can only be used when request's mode is "same-origin".
   * Any cached redirects will be followed assuming request's redirect mode is "follow"and the redirects do not violate
   * request's mode.)
   *
   * @type {String}
   * */
  ONLY_IF_CACHED: 'only-if-cached'
};

Object.freeze(FetchCache);
