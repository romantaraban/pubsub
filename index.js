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
    trigger: function() {
      var event = arguments[0];
      if (!this.events || !this.events[event]) {
        return false;
      }

      var subscribers = this.events[event];
      var len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].callback.apply(subscribers[len].context, arguments);
      }

      return this;
    },
    on: function(event, func, context) {
      this.events || (this.events = {});
      this.events[event] || (this.events[event] = []);

      this.events[event].push({
        callback: func,
        context: context || this
      });

      return this;
    },
    off: function(event, func, context) {
      var allEvents = this.events;
      function remover(e, f, c) {
        for (var i = 0; i < allEvents[e].length; i++) {
          if (allEvents[e][i].callback === f && (!c || allEvents[e][i].context === c)) {
            allEvents[e].splice(i, 1);
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
            remover(e, arguments[0]);
          }
        }
      } else if (arguments.length === 2 && typeof(arguments[0]) === 'string' && typeof(arguments[1]) === 'function') {
        remover(event, func);
      } else if (arguments.length === 3 && typeof(arguments[0]) === 'string' && typeof(arguments[1]) === 'function' && typeof(arguments[2]) === 'object') {
        remover(event, func, context);
      }
    }
  };

  return PubSub;

}));
