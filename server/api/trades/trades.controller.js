/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/trades              ->  index
 * POST    /api/trades              ->  create
 * GET     /api/trades/:id          ->  show
 * PUT     /api/trades/:id          ->  upsert
 * PATCH   /api/trades/:id          ->  patch
 * DELETE  /api/trades/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _trades = require('./trades.model');

var _trades2 = _interopRequireDefault(_trades);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Tradess
function index(req, res) {
  return _trades2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Trades from the DB
function show(req, res) {
  if (typeof req.query.ownerId !== 'undefined' && req.query.ownerId) {
    console.log("Getting trades by ownerId: " + req.query.ownerId);
    var trades = new _trades2.default({ ownerId: req.query.ownerId });
    return trades.findByOwnerId().lean().exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
  } else if (typeof req.query.requesterId !== 'undefined' && req.query.requesterId) {
    console.log("Getting trades by requesterId: " + req.query.requesterId);
    var trades = new _trades2.default({ requesterId: req.query.requesterId });
    return trades.findByRequesterId().lean().exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
  } else {
    console.log("Getting specific trade: " + req.params.id);
    return _trades2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
  }
}

// Creates a new Trades in the DB
function create(req, res) {
  return _trades2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Trades in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _trades2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Trades in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _trades2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Trades from the DB
function destroy(req, res) {
  return _trades2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=trades.controller.js.map
