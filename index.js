var PubSub = function() {};

PubSub.prototype = {
  trigger: function(event, data) {
    if (!this.events || !this.events[event]) {
      return false;
    }

    var subscribers = this.events[event],
      len = subscribers ? subscribers.length : 0;

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
      for (i = 0, l = events[e].length; i < l; i++) {
        if (events[e][i].callback === f) {
          events[e].splice(i, 1);
        }
      }
    }
    if (arguments.length === 0) {
      this.events = {};
    } else if (event && !func) {
      this.events[event] = [];
    } else if (!event && func) {
      for (var e in this.events) {
        remover(e, func, this.events);
      }
    } else if (event && func) {
      remover(event, func, this.events);
    }
  }
};

module.exports = PubSub;
