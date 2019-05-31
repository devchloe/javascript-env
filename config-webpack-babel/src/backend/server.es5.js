"use strict";

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexHtmlContent = _fs.default.readFileSync(_path.default.join(__dirname, '/../../dist/index.html'));

_http.default.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(indexHtmlContent);
  } else if (req.url === '/bundle.js') {
    const bundleJsContent = _fs.default.readFileSync(_path.default.join(__dirname, '/../../dist/bundle.js'));

    res.writeHead(200, {
      'Content-Type': 'application/javascript'
    });
    res.end(bundleJsContent);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('Not Found');
  }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');

