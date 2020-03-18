
const validationError = (res, error = 'Data provided is not valid') => {
  addHeaders(res);

  res.statusCode = 422;

  res.end(JSON.stringify({
      status: 'fail',
          error
  }, null, 3));
};

const notFoundError = (res, error = 'Data provided is not valid') => {
  addHeaders(res);

  res.statusCode = 404;

  res.end(JSON.stringify({
      status: 'fail',
      error
  }, null, 3));
};

const error = (res, error = 'An unknown error occurred', statusCode = 500) => {
  addHeaders(res);

  res.statusCode = statusCode;

  res.end(JSON.stringify({
      status: 'fail',
      error
  }, null, 3));
};

const success = (res, data = null) => {
  addHeaders(res);
  
  res.statusCode = 200;
  res.end(JSON.stringify({
      status: 'success',
      data
  }, null, 3));
};

const addHeaders = (res) => {
  return res.setHeader('Content-Type', 'application/json');
}

module.exports = {
  validationError,
  notFoundError,
  error, 
  success,
}
