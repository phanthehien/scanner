const helper = require('./helper');
const mongo = require('mongodb');
const querystring = require('querystring');

const Url = require('url');

const collectionName = 'ScanResult';

const statuses = ['Queued', 'In Progress', 'Success', 'Failure'];

function sleep(duration) {
  return new Promise(function(resolve) {
    setTimeout(()=> { resolve(0) }, duration);
  })
}

const list = (db) => async (req, res) => {
  try {
    let filter = {}
    const url = new Url.parse(req.url);
    
    if (url && url.query) {
      const query = querystring.parse(url.query);
      filter.status = statuses.indexOf(query.status) >= 0 ? query.status : null;
    }

    const items = await db.collection(collectionName)
      .find(filter)
      .toArray();

    await sleep(500)

    return helper.success(res, items);
  }
  catch (error) {
    return helper.error(res, error);
  }
}

const show = (db) => async (_, res, param) => {
  try {
    const query = { _id: mongo.ObjectID(param) };
    const item = await db.collection(collectionName).findOne(query);
    await sleep(500)

    if (item) {
      return helper.success(res, item);
    }

    return helper.notFoundError(res);
  }
  catch (error) {
    return helper.error(res, error);
  }
}

const create = (db) => async (_, res, param, postData) => {
  try {
    const { 
      status = statuses[0],
      repositoryName, 
      findings, 
      queuedAt = new Date().getTime(), 
      scanningAt, 
      finishedAt 
    } = postData;

    const response = await db.collection(collectionName)
        .insertOne({
          status, 
          repositoryName, 
          findings: JSON.parse(findings), 
          queuedAt , 
          scanningAt, 
          finishedAt
        });

    if (response.result.ok) {
      return helper.success(res, response.insertedId);
    }

    return helper.error(res, 'insert error')
  }
  catch (error) {
    return helper.error(res, error);
  }
}

module.exports = {
  list,
  show,
  create,
}