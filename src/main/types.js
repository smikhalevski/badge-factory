// @flow
export type Template = {
  /**
   * ES5 code of the template.
   */
  code: string,

  /**
   * List of variable names that are referenced but not declared in the template code.
   */
  params: string[]
};

export type GoogleFont = {
  family: string,
  files: {[key: string]: string}
};
