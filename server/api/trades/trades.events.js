/**
 * Trades model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _trades = require('./trades.model');

var _trades2 = _interopRequireDefault(_trades);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TradesEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
TradesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _trades2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    TradesEvents.emit(event + ':' + doc._id, doc);
    TradesEvents.emit(event, doc);
  };
}

exports.default = TradesEvents;
//# sourceMappingURL=trades.events.js.map
