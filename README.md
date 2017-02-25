# Badge Factory

Tiny web service for generating badges from URL.

[![enhancement](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=84b6eb&name=enhancement&maxAge=100)](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=84b6eb&name=enhancement)
[![bug](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=ee0701&name=bug&maxAge=100)](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=ee0701&name=bug)
[![help wanted](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=128a0c&name=help%20wanted&maxAge=10)](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=128a0c&name=help%20wanted)
[![duplicate](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=ccc&name=duplicate&maxAge=100)](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=ccc&name=duplicate)
[![question](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=cc317c&name=question&maxAge=100)](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=cc317c&name=question)
[![question](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=fff&name=wontfix&maxAge=100)](http://badge-factory.herokuapp.com/badges/predefined/github-label?color=fff&name=wontfix)

### Providers

#### Predefined

Currently there's only one predefined badge – [Github-styled label](src/main/data-sources/predefined/github-label.txt).

http://badge-factory.herokuapp.com/badges/predefined/github-label?color=red&name=Bug

#### Github Gist

- Create new [Gist](https://gist.github.com/) that contains React SVG markup of your badge. For example, [Github label badge gist](https://gist.github.com/f1f67f6ad0c93ef298bf87ac9f20574a).

- Go to URL http://badge-factory.herokuapp.com/badges/gists/:gistHash/:filename?param=value where `:gistHash` is hash code of gist (ex. `f1f67f6ad0c93ef298bf87ac9f20574a`) and `:filename` is name of file from that gist (ex. `github-label.jsx`). 

Variables that were not declared in gist can be passed as query params. For example, if you have non declared variable `color` in your gist, you can provide its value via query parameter: `?color=fff`.

### API

Following functions and constants are available in templates:

`decodeURI`

`decodeURIComponent`

`encodeURI`

`encodeURIComponent`

`toColor`

`luminosity`

`alpha`

`greyscale`

`lighten`

`darken`

`desaturate`

`saturate`

`spin`

`widthOfString(string, fontSize = 12)` Compute width of string in pixels.

`isFinite`

`isNaN`

`parseFloat`

`parseInt`

`E` Euler's constant and the base of natural logarithms, approximately 2.718.

`LN2` Natural logarithm of 2, approximately 0.693.

`LN10` Natural logarithm of 10, approximately 2.303.

`LOG2E` Base 2 logarithm of E, approximately 1.443.

`LOG10E` Base 10 logarithm of E, approximately 0.434.

`PI` Ratio of the circumference of a circle to its diameter, approximately 3.14159.

`SQRT1_2` Square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707.

`SQRT2` Square root of 2, approximately 1.414.

`abs(x)` Returns the absolute value of a number.

`acos(x)` Returns the arccosine of a number.

`acosh(x)` Returns the hyperbolic arccosine of a number.

`asin(x)` Returns the arcsine of a number.

`asinh(x)` Returns the hyperbolic arcsine of a number.

`atan(x)` Returns the arctangent of a number.

`atanh(x)` Returns the hyperbolic arctangent of a number.

`atan2(y, x)` Returns the arctangent of the quotient of its arguments.

`cbrt(x)` Returns the cube root of a number.

`ceil(x)` Returns the smallest integer greater than or equal to a number.

`clz32(x)` Returns the number of leading zeroes of a 32-bit integer.

`cos(x)` Returns the cosine of a number.

`cosh(x)` Returns the hyperbolic cosine of a number.

`exp(x)` Returns Ex, where x is the argument, and E is Euler's constant (2.718…), the base of the natural logarithm.

`expm1(x)` Returns subtracting 1 from exp(x).

`floor(x)` Returns the largest integer less than or equal to a number.

`fround(x)` Returns the nearest single precision float representation of a number.

`hypot([x[, y[, …]]])` Returns the square root of the sum of squares of its arguments.

`imul(x, y)` Returns the result of a 32-bit integer multiplication.

`log(x)` Returns the natural logarithm (loge, also ln) of a number.

`log1p(x)` Returns the natural logarithm (loge, also ln) of 1 + x for a number x.

`log10(x)` Returns the base 10 logarithm of a number.

`log2(x)` Returns the base 2 logarithm of a number.

`max([x[, y[, …]]])` Returns the largest of zero or more numbers.

`min([x[, y[, …]]])` Returns the smallest of zero or more numbers.

`pow(x, y)` Returns base to the exponent power, that is, baseexponent.

`random()` Returns a pseudo-random number between 0 and 1.

`round(x)` Returns the value of a number rounded to the nearest integer.

`sign(x)` Returns the sign of the x, indicating whether x is positive, negative or zero.

`sin(x)` Returns the sine of a number.

`sinh(x)` Returns the hyperbolic sine of a number.

`sqrt(x)` Returns the positive square root of a number.

`tan(x)` Returns the tangent of a number.

`tanh(x)` Returns the hyperbolic tangent of a number.

`trunc(x)` Returns the integral part of the number x, removing any fractional digits.
