const http = require('http');

const router = require('./router.js');
const scanResult = require('./scan-result');

const hostname = '0.0.0.0';
const port = 8080;
let db = null;
let server;

const getRoutes = () => [{
  method: 'GET',
  path: /\/result\/([0-9a-z]+)/,
  handler: scanResult.show(db)
},{
  method: 'GET',
  path: /\/result\?*\.*/,
  handler: scanResult.list(db)
}, {
  method: 'POST',
  path: '/result',
  handler: scanResult.create(db)
}]

const addCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if ( req.method === 'OPTIONS' ) {
    res.writeHead(200)
    res.end()
    return
  }
}

const startServer = () => {
  server = http.createServer((req, res) => {
    addCors(req, res)
    return router(req, res, getRoutes())
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

const initApp = () => {
  const MongoClient = require('mongodb').MongoClient;
  const url = "mongodb://mongo:27017/";

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, mongodb) {
    if (err) throw err;

    db = mongodb.db("scan-result");
    startServer();
  });
}

initApp();