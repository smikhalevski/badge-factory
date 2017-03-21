import React from 'react';

export function EmbeddedSvgFont({font}) {
  return (
    <defs>
      <style>
        {`
          @font-face {
            font-family: "${font.font.family}";
            font-weight: ${font.font.weight};
            src: url("data:application/x-font-ttf;charset=utf-8;base64,${font.fff.write({type: 'ttf'}).toString('base64')}");
          }
        `}
      </style>
    </defs>
  );
}
