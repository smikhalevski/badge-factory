export const FetchMode = {
  /**
   * If a request is made to another origin with this mode set, the result is simply an error. You could use this
   * to ensure that a request is always being made to your origin.
   *
   * @type {String}
   */
  SAME_ORIGIN: 'same-origin',

  /**
   * Prevents the method from being anything other than HEAD, GET or POST. If any ServiceWorkers intercept
   * these requests, they may not add or override any headers except for these. In addition, JavaScript may not access
   * any properties of the resulting Response. This ensures that ServiceWorkers do not affect the semantics of the Web
   * and prevents security and privacy issues arising from leaking data across domains.
   *
   * @type {String}
   */
  NO_CORS: 'no-cors',

  /**
   * Allows cross-origin requests, for example to access various APIs offered by 3rd party vendors. These are expected
   * to adhere to the CORS protocol. Only a limited set of headers are exposed in the Response,
   * but the body is readable.
   *
   * @type {String}
   */
  CORS: 'cors',

  /**
   * A mode for supporting navigation. The navigate value is intended to be used only by HTML navigation.
   * A navigate request is created only while navigating between documents.
   *
   * @type {String}
   */
  NAVIGATE: 'navigate'
};

Object.freeze(FetchMode);
