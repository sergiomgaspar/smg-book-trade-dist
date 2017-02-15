'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooksSchema = new _mongoose2.default.Schema({
  ownerId: String,
  ownerName: String,
  title: String,
  authors: [],
  publishedDate: String,
  description: String,
  descriptionFull: String,
  categories: [],
  averageRating: Number,
  thumbnail: String
});

/* Search Books by ID of owner */
BooksSchema.methods.findByUser = function (cb) {
  return this.model('Books').find({ ownerId: this.ownerId }, cb);
};

exports.default = _mongoose2.default.model('Books', BooksSchema);
//# sourceMappingURL=books.model.js.map
