// @flow
import React from 'react';

export function EmbeddedFont({font}: Object): Object {
  return (
    <style>{`
      @font-face {
        font-family: "${font.familyName}";
        font-weight: ${font.weight};
        src: url("data:application/x-font-ttf;charset=utf-8;base64,${font.buffer.toString('base64')}");
      }`}
    </style>
  );
}
