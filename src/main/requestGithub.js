import http from 'http';
import https from 'https';

requestGithub('/repos/:owner/:repo/labels?per_page=100', options)
    .then(labels => {
      const svgo = new SVGO;
      for (const label of labels.slice(0, 1)) {
        const filePath = `../../target/out/${label.name.toLowerCase().replace(/\s/g, '-')}.svg`;
        const svg = createLabelSvg(label);
        svgo.optimize(svg, result => fs.writeFileSync(filePath, result.data));
      }
    })
    .catch(error => console.log(error.stack));

function requestGithub(path = '/', options = {}) {
  return new Promise((resolve, reject) => {
    https
        .get({
          method: 'GET',
          host: 'api.github.com',
          ...options,
          path: path.replace(/:[^/]+/g, part => options[part.slice(1)]),
          headers: {
            'User-Agent': '',
            ...options.headers
          }
        }, res => {
          if (res.statusCode >= 300) {
            throw new Error(http.STATUS_CODES[res.statusCode]);
          }
          let json = '';
          res.on('data', chunk => json += chunk);
          res.on('end', () => resolve(JSON.parse(json)));
        })
        .on('error', reject);
  });
}
