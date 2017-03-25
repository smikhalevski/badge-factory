// @flow
import {Readable} from 'stream';

declare class TTFFont {
  postscriptName: string;
  fullName: string;
  familyName: string;
  subfamilyName: string;
  copyright: string;
  version: string;

  /**
   * The size of the font’s internal coordinate grid.
   */
  unitsPerEm: number;

  /**
   * The font’s ascender.
   */
  ascent: number;

  /**
   * The font’s descender.
   */
  descent: number;

  /**
   * The amount of space that should be included between lines.
   */
  lineGap: number;

  /**
   * the offset from the normal underline position that should be used.
   */
  UnderlinePosition: number;

  /**
   * The weight of the underline that should be used.
   */
  underlineThickness: number;

  /**
   * If this is an italic font, the angle the cursor should be drawn at to match the font design.
   */
  italicAngle: number;

  /**
   * The height of capital letters above the baseline. See here for more details.
   */
  capHeight: number;

  /**
   * The height of lower case letters. See here for more details.
   */
  xHeight: number;

  /**
   * The font’s bounding box, i.e. the box that encloses all glyphs in the font.
   */
  bbox: Object;

  /**
   * the number of glyphs in the font
   */
  numGlyphs: number;

  /**
   * an array of all of the unicode code points supported by the font
   */
  characterSet: number[];

  /**
   * an array of all OpenType feature tags (or mapped AAT tags) supported by the font.
   */
  availableFeatures: string[];

  /**
   * Returns an object describing the available variation axes. Keys are 4 letter axis tags,
   * and values include name, min, default, and max properties for the axis.
   */
  variationAxes: Object;

  /**
   * The font designer may have picked out some variations that they think look particularly good,
   * for example a light, regular, and bold weight which would traditionally be separate fonts.
   * This property returns an object describing these named variation instances that the designer
   * has specified. Keys are variation names, and values are objects with axis settings.
   */
  namedVariations: Object;

  /**
   * Maps a single unicode code point (number) to a Glyph object.
   * Does not perform any advanced substitutions (there is no context to do so).
   */
  glyphForCodePoint(codePoint: number): Glyph;

  /**
   * Returns whether there is glyph in the font for the given unicode code point.
   */
  hasGlyphForCodePoint(codePoint): Glyph;

  /**
   * This method returns an array of Glyph objects for the given string.
   * This is only a one-to-one mapping from characters to glyphs. For most uses,
   * you should use font.layout (described below), which provides a much more
   * advanced mapping supporting AAT and OpenType shaping.
   */
  glyphsForString(string: string);

  /**
   * Returns the advance width for a single glyph id.
   */
  widthOfGlyph(glyphId: string);

  /**
   * This method returns a `GlyphRun` object, which includes an array of Glyphs and
   * GlyphPositions for the given string. Glyph objects are described below. GlyphPosition
   * objects include 4 properties: xAdvance, yAdvance, xOffset, and yOffset.
   *
   * The features parameter is an array of OpenType feature tags to be applied in addition
   * to the default set. If this is an AAT font, the OpenType feature tags are mapped to
   * AAT features.
   */
  layout(string: string, features: string[] = []): Object;

  /**
   * Returns a new font object representing this variation, from which you can get glyphs and perform
   * layout as normal. The variation parameter can either be a variation settings object or a string
   * variation name. Variation settings objects have axis names as keys, and numbers as values
   * (should be in the range specified by font.variationAxes).
   */
  getVariation(variation: Object): Font;

  /**
   * Returns a glyph object for the given glyph id. You can pass the array of code points this glyph
   * represents for your use later, and it will be stored in the glyph object.
   */
  getGlyph(glyphId: string, codePoints: number[] = []): Glyph;

  /**
   * Returns a Subset object for this font.
   */
  createSubset(): FontSubset;
}

/**
 * Glyph objects represent a glyph in the font. They have various properties for accessing metrics
 * and the actual vector path the glyph represents, and methods for rendering the glyph to a
 * graphics context.
 *
 * You do not create glyph objects directly. They are created by various methods on the font object,
 * described above. There are several subclasses of the base Glyph class internally that may be
 * returned depending on the font format, but they all include the following API.
 *
 * Fontkit has support for several different color emoji font formats. Currently, these include
 * Apple’s SBIX table (as used by the “Apple Color Emoji” font), and Microsoft’s COLR table (supported
 * by Windows 8.1). Here is an overview of the various color font formats out there.
 */
declare class Glyph {
  /**
   * The glyph id in the font
   */
  id: string;

  /**
   * An array of unicode code points that are represented by this glyph.
   * There can be multiple code points in the case of ligatures and other glyphs that represent
   * multiple visual characters.
   */
  codePoints: number[];

  /**
   * A vector Path object representing the glyph
   */
  path: Path;

  /**
   * the glyph’s bounding box, i.e. the rectangle that encloses the glyph outline
   * as tightly as possible.
   */
  bbox: Object;

  /**
   * The glyph’s control box. This is often the same as the bounding box, but is
   * faster to compute. Because of the way bezier curves are defined, some of the
   * control points can be outside of the bounding box. Where bbox takes this into
   * account, cbox does not. Thus, cbox is less accurate, but faster to compute.
   * See here for a more detailed description.
   */
  cbox: Object;

  /**
   * The glyph’s advance width.
   */
  advanceWidth: number;

  /**
   * For COLR glyphs, which are vector based, this returns an array of objects representing
   * the glyphs and colors for each layer in render order.
   */
  layers: Glyph[];

  /**
   * Renders the glyph to the given graphics context, at the specified font size.
   */
  render(context: Object, size: number): any;

  /**
   * For SBIX glyphs, which are bitmap based, this returns an object containing some
   * properties about the image, along with the image data itself (usually PNG).
   */
  getImageForSize(size: number): Buffer;
}

/**
 * Fontkit can perform font subsetting, i.e. the process of creating a new font from an existing
 * font where only the specified glyphs are included. This is useful to reduce the size of large
 * fonts, such as in PDF generation or for web use.
 *
 * Currently, subsets produce minimal fonts designed for PDF embedding that may not work as
 * standalone files. They have no cmap tables and other essential tables for standalone use.
 * This limitation will be removed in the future.
 *
 * You create a Subset object by calling font.createSubset(), described above. The API on Subset
 * objects is as follows.
 */
declare class FontSubset {
  /**
   * Includes the given glyph object or glyph ID in the subset.
   */
  includeGlyph(glyph: Glyph): void;

  /**
   * Returns a stream containing the encoded font file that can be piped to a destination, such as a file.
   */
  encodeStream(): Readable;
}

/**
 * Path objects are returned by glyphs and represent the actual vector outlines for each
 * glyph in the font. Paths can be converted to SVG path data strings, or to functions
 * that can be applied to render the path to a graphics context.
 */
declare class Path {

  /**
   * Moves the virtual pen to the given x, y coordinates.
   */
  moveTo(x: number, y: number): Path;

  /**
   * Adds a line to the path from the current point to the given x, y coordinates.
   */
  lineTo(x: number, y: number): Path;

  /**
   * Adds a quadratic curve to the path from the current point to the given x, y
   * coordinates using cpx, cpy as a control point.
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): Path;

  /**
   * Adds a bezier curve to the path from the current point to the given x, y
   * coordinates using cp1x, cp1y and cp2x, cp2y as control points.
   */
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);

  /**
   * Closes the current sub-path by drawing a straight line back to the starting point.
   */
  closePath(): Path;

  /**
   * Compiles the path to a JavaScript function that can be applied with a graphics
   * context in order to render the path.
   */
  toFunction(): Function;

  /**
   * Converts the path to an SVG path data string.
   */
  toSVG(): string;

  /**
   * This property represents the path’s bounding box, i.e. the smallest rectangle that
   * contains the entire path shape. This is the exact bounding box, taking into account
   * control points that may be outside the visible shape.
   */
  bbox: Object;

  /**
   * This property represents the path’s control box. It is like the bounding box, but it
   * includes all points of the path, including control points of bezier segments.
   * It is much faster to compute than the real bounding box, but less accurate if there
   * are control points outside of the visible shape.
   */
  cbox: Object;
}
