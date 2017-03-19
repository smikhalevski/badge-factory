import React from 'react';

export function EmbeddedFont({font}) {
  return (
    <defs>
      <style>
        {`
          @font-face {
            font-family: "${font.font.family}";
            font-weight: ${font.font.weight};
            src: url("data:application/x-font-ttf;charset=utf-8;base64,${font.toBase64()}");
          }
        `}
      </style>
    </defs>
  );
}
