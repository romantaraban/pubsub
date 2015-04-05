/**!
 * PubSub
 * @author romantaraban <rom.taraban@gmail.com>
 * @license MIT
 */

(function(root, factory) {
if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define([], factory);
} else if (typeof exports === 'object') {
  // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = factory();
} else {
  // Browser globals (root is window)
  root.PubSub = factory();
}
}(this, function() {
  "use strict";

  var PubSub = function() {};

  PubSub.prototype = {
    trigger: function(event, data) {
      if (!this.events || !this.events[event]) {
        return false;
      }

      var subscribers = this.events[event];
      var len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].callback.call(subscribers[len].context, event, data);
      }

      return this;
    },
    on: function(event, func, context) {
      this.events || (this.events = {});
      this.events[event] || (this.events[event] = []);

      //if event was defined as a hash - convert to array representation
      if (typeof(this.events[event]) === 'function') {
        this.events[event] = [this.events[event]];
      }

      this.events[event].push({
        callback: func,
        context: context || this
      });

      return this;
    },
    off: function(event, func) {
      function remover(e, f, events) {
        for (var i = 0; i < events[e].length; i++) {
          if (events[e][i].callback === f) {
            events[e].splice(i, 1);
          }
        }
      }
      if (arguments.length === 0) {
        this.events = {};
      } else if (arguments.length === 1) {
        if (typeof(arguments[0]) === 'string') {
          this.events[arguments[0]] = [];
        } else if (typeof(arguments[0]) === 'function') {
          for (var e in this.events) {
            remover(e, arguments[0], this.events);
          }
        }
      } else if (arguments.length === 2 && typeof(arguments[0]) === 'string' && typeof(arguments[1]) === 'function') {
        remover(event, func, this.events);
      }
    }
  };

  return PubSub;

}));
