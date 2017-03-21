// @flow
export type TemplateType = {
  /**
   * ES5 code of the template.
   */
  code: string,

  /**
   * List of variable names that are referenced but not declared in the template code.
   */
  params: string[]
};

export type GoogleFontType = {
  family: string,
  files: {[key: string]: string}
};
