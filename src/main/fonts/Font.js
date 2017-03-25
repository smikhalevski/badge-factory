export type Font = {
  familyName: number;
  weight: number;
  buffer: Buffer;
  subset(string: string): Buffer;
  widthOfString(string: string): number;
};
