/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/books              ->  index
 * POST    /api/books              ->  create
 * GET     /api/books/:id          ->  show
 * PUT     /api/books/:id          ->  upsert
 * PATCH   /api/books/:id          ->  patch
 * DELETE  /api/books/:id          ->  destroy
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

var _books = require('./books.model');

var _books2 = _interopRequireDefault(_books);

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

// Gets a list of Bookss
function index(req, res) {
  return _books2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Books from the DB
function show(req, res) {
  var books = new _books2.default({ ownerId: req.params.id });

  if (req.params.id === 'count') return _books2.default.count().exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));else return books.findByUser().lean().exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Books in the DB
function create(req, res) {
  return _books2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Books in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return _books2.default.findOneAndUpdate({ _id: req.params.id }, { ownerId: req.body.ownerId,
    ownerName: req.body.ownerName }, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Books in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _books2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Books from the DB
function destroy(req, res) {
  return _books2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=books.controller.js.map
