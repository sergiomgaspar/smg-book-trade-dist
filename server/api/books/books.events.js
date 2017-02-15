/**
 * Books model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _books = require('./books.model');

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooksEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BooksEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _books2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BooksEvents.emit(event + ':' + doc._id, doc);
    BooksEvents.emit(event, doc);
  };
}

exports.default = BooksEvents;
//# sourceMappingURL=books.events.js.map
