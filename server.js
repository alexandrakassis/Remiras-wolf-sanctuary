const http = require('http');
const fs = require('fs');
const path = require('path');
const localtunnel = require('localtunnel');

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = ext === '.css' ? 'text/css' : 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3000, async () => {
  console.log('Server running on port 3000');

  try {
    const tunnel = await localtunnel({ port: 3000 });
    console.log('');
    console.log('========================================');
    console.log('PUBLIC URL:', tunnel.url);
    console.log('========================================');
    console.log('');
    console.log('Open this URL on your iPad!');
  } catch (e) {
    console.log('Tunnel error:', e.message);
  }
});
