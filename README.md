# Badge Factory

Tiny web service for generating badges from URL.

[![enhancement](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=84b6eb&name=enhancement&maxAge=100)](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=84b6eb&name=enhancement)
[![bug](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=ee0701&name=bug&maxAge=100)](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=ee0701&name=bug)
[![help wanted](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=128a0c&name=help%20wanted&maxAge=10)](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=128a0c&name=help%20wanted)
[![duplicate](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=ccc&name=duplicate&maxAge=100)](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=ccc&name=duplicate)
[![question](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=cc317c&name=question&maxAge=100)](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=cc317c&name=question)
[![question](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=fff&name=wontfix&maxAge=100)](http://badge-factory.herokuapp.com/badges/gists/f1f67f6ad0c93ef298bf87ac9f20574a/github-label.jsx?color=fff&name=wontfix)

### Providers

#### Github Gist

- Create new [Gist](https://gist.github.com/) that contains React SVG markup of your badge. For example, [Github label badge gist](https://gist.github.com/f1f67f6ad0c93ef298bf87ac9f20574a).

- Go to URL http://badge-factory.herokuapp.com/badges/gists/:gistHash/:filename?param=value where `:gistHash` is hash code of gist (ex. `f1f67f6ad0c93ef298bf87ac9f20574a`) and `:filename` is name of file from that gist (ex. `github-label.jsx`). 

Variables that were not declared in gist can be passed as query params. For example, if you have non declared variable `color` in your gist, you can provide its value via query parameter: `?color=fff`.

### API

Following functions and constants are available in templates:
- `toColor(color)` Convert string to valid HEX color.
- `luminosity(color)`
- `alpha(color)`
- `greyscale(color)`
- `lighten(color, amount = 10)`
- `darken(color, amount = 10)`
- `desaturate(color, amount = 10)`
- `saturate(color, amount = 10)`
- `spin(color, amount = 0)`
- `widthOfString(string, fontSize = 12)` Compute width of string in pixels.
