'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TradesSchema = new _mongoose2.default.Schema({
  status: Number,
  bookId: String,
  title: String,
  thumbnail: String,
  ownerId: String,
  ownerName: String,
  insertDate: String,
  requesterId: String,
  requesterName: String
});

/* Search Books by ID of owner */
TradesSchema.methods.findByOwnerId = function (cb) {
  return this.model('Trades').find({ ownerId: this.ownerId, status: 0 }, cb);
};

/* Search Books by ID of Requester */
TradesSchema.methods.findByRequesterId = function (cb) {
  return this.model('Trades').find({ requesterId: this.requesterId, status: 0 }, cb);
};

exports.default = _mongoose2.default.model('Trades', TradesSchema);
//# sourceMappingURL=trades.model.js.map
