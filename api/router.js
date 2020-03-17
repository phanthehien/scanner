// const { parse } = require('querystring');
const helper = require('./helper');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
     try {
         let body = '';
         req.on('data', chunk => {
             body += chunk.toString(); // convert Buffer to string
         });

         req.on('end', () => {
             resolve(body);
         });
     }
     catch (e) {
       reject(e);
     }
  });
}

const router = async (req, res, routes) => {
  const route = routes.find((route) => {
      const methodMatch = route.method === req.method;
      const pathMatch = (typeof route.path === 'object') ? req.url.match(route.path) : route.path === req.url;

      return pathMatch && methodMatch;
  });

  if (!route) {
    return helper.error(res, 'Endpoint not found', 404);
  }

  let param = null;
  if (typeof route.path === 'object') {
    param = req.url.match(route.path)[1];
  }

  let body = null;
  if (req.method === 'POST' || req.method === 'PUT') {
    body = await getPostData(req);
  }

  return route.handler(req, res, param, JSON.parse(body));
};

module.exports = router;