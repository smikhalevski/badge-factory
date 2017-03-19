export const FetchReferrerPolicy = {
  /**
   * The simplest policy is "no-referrer", which specifies that no referrer information is to be sent along
   * with requests made from a particular request client to any origin. The header will be omitted entirely.
   *
   * @type {String}
   */
  NO_REFERRER: 'no-referrer',

  /**
   * The "no-referrer-when-downgrade" policy sends a full URL along with requests
   * from a TLS-protected environment settings object to a a priori authenticated URL,
   * and requests from request clients which are not TLS-protected to any origin.
   *
   * Requests from TLS-protected request clients to non-a priori authenticated URLs, on the other hand,
   * will contain no referrer information. A Referer HTTP header will not be sent.
   *
   * This is a user agent’s default behavior, if no policy is otherwise specified.
   *
   * @type {String}
   */
  NO_REFERRER_WHEN_DOWNGRADE: 'no-referrer-when-downgrade',

  /**
   * The "same-origin" policy specifies that a full URL, stripped for use as a referrer,
   * is sent as referrer information when making same-origin requests from a particular request client.
   *
   * Cross-origin requests, on the other hand, will contain no referrer information.
   * A Referer HTTP header will not be sent.
   *
   * @type {String}
   */
  SAME_ORIGIN: 'same-origin',

  /**
   * The "origin" policy specifies that only the ASCII serialization of the origin of the request client
   * is sent as referrer information when making both same-origin requests
   * and cross-origin requests from a particular request client.
   *
   * @type {String}
   */
  ORIGIN: 'origin',

  /**
   * The "strict-origin" policy sends the ASCII serialization of the origin of the request client when making requests:
   * - from a TLS-protected environment settings object to a a priori authenticated URL, and
   * - from non-TLS-protected environment settings objects to any origin.
   *
   * Requests from TLS-protected request clients to non-a priori authenticated URLs, on the other hand,
   * will contain no referrer information. A Referer HTTP header will not be sent.
   *
   * @type {String}
   */
  STRICT_ORIGIN: 'strict-origin',

  /**
   * The "origin-when-cross-origin" policy specifies that a full URL, stripped for use as a referrer,
   * is sent as referrer information when making same-origin requests from a particular request client,
   * and only the ASCII serialization of the origin of the request client is sent as referrer information
   * when making cross-origin requests from a particular request client.
   *
   * @type {String}
   */
  ORIGIN_WHEN_CROSS_ORIGIN: 'origin-when-cross-origin',

  /**
   * The "strict-origin-when-cross-origin" policy specifies that a full URL, stripped for use as a referrer,
   * is sent as referrer information when making same-origin requests from a particular request client,
   * and only the ASCII serialization of the origin of the request client when making cross-origin requests:
   * - from a TLS-protected environment settings object to a a priori authenticated URL, and
   * - from non-TLS-protected environment settings objects to any origin.
   *
   * Requests from TLS-protected request clients to non-a priori authenticated URLs, on the other hand,
   * will contain no referrer information. A Referer HTTP header will not be sent.
   *
   * @type {String}
   */
  STRICT_ORIGIN_WHEN_CROSS_ORIGIN: 'strict-origin-when-cross-origin',

  /**
   * The "unsafe-url" policy specifies that a full URL, stripped for use as a referrer, is sent along
   * with both cross-origin requests and same-origin requests made from a particular request client.
   *
   * @type {String}
   */
  UNSAFE_URL: 'unsafe-url'
};

Object.freeze(FetchReferrerPolicy);
