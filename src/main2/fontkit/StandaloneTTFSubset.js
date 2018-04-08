import cloneDeep from "lodash/cloneDeep";
import Directory from "fontkit/src/tables/directory";
import Tables from "fontkit/src/tables/index";

function encode(stream) {
  // tables required by PDF spec:
  //   head, hhea, loca, maxp, cvt , prep, glyf, hmtx, fpgm
  //
  // additional tables required for standalone fonts:
  //   name, cmap, OS/2, post

  this.glyf = [];
  this.offset = 0;
  this.loca = {
    offsets: []
  };

  this.hmtx = {
    metrics: [],
    bearings: []
  };

  // include all the glyphs
  // not using a for loop because we need to support adding more
  // glyphs to the array as we go, and CoffeeScript caches the length.
  let i = 0;
  while (i < this.glyphs.length) {
    this._addGlyph(this.glyphs[i++]);
  }

  let maxp = cloneDeep(this.font.maxp);
  maxp.numGlyphs = this.glyf.length;

  this.loca.offsets.push(this.offset);
  this.loca::Tables.loca.preEncode();

  let head = cloneDeep(this.font.head);
  head.indexToLocFormat = this.loca.version;

  let hhea = cloneDeep(this.font.hhea);
  hhea.numberOfMetrics = this.hmtx.metrics.length;

  const map = [];
  for (let index = 0; index < 256; index++) {
    map[index] = index < maxp.numGlyphs ? index : 0;
  }

  const cmap = {
    version: 0,
    numSubtables: 1,
    tables: [{
      platformID: 1,
      encodingID: 0,
      table: {
        version: 0,
        length: 262,
        language: 0,
        codeMap: map
      }
    }]
  };

  // TODO: subset prep, cvt, fpgm?
  Directory.encode(stream, {
    tables: {
      head,
      hhea,
      loca: this.loca,
      maxp,
      'cvt ': this.font['cvt '],
      prep: this.font.prep,
      glyf: this.glyf,
      hmtx: this.hmtx,
      fpgm: this.font.fpgm,

      name: cloneDeep(this.font.name),
      'OS/2': cloneDeep(this.font['OS/2']),
      post: cloneDeep(this.font.post),
      cmap
    }
  });
}

export function foo(font) {
  const subset = font.createSubset();
  subset.encode = encode;
  return subset;
}
