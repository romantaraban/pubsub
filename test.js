var PubSub = require('./index.js');
var assert = require('chai').assert;

describe('pubSub', function() {
  var observer = new PubSub();
  var event = 'update:size';
  var count;
  var counter = function () {
    count++;
  };
  beforeEach(function(){
    count = 0;
  });
  afterEach(function(){
    observer.off();
  });
  
  it('should be able to create new instanse of object', function() {
    assert.equal(true, observer instanceof PubSub);
  });
  
  it('should add lister to particluar event', function() {
    var listener = function () {};
    observer.on(event, listener);
    assert.equal(listener, observer.events[event][0].callback);
  });
  
  it('should trigger lister on particluar event', function() {
    observer.on(event, counter);
    observer.trigger(event,null);
    assert.equal(count, 1);
  });
  
  it('should trigger all listers on particluar event', function() {
    observer.on(event, counter);
    observer.on(event, counter);
    observer.trigger(event,null);
    assert.equal(count, 2);
  });
  
  it('should trigger only corresponding listers on particluar event', function() {
    observer.on(event, counter);
    observer.on('some other event', counter);
    observer.trigger(event,null);
    assert.equal(count, 1);
  });
  
  it('should pass data to listener', function() {
    var counter = function (event, data) {
      count += data;
    };
    observer.on(event, counter);
    observer.trigger(event, 8);
    assert.equal(count, 8);
  });
  
  it('should execute callback with correct context', function() {
    var context = {
      count: 0
    };
    var counter = function (data) {
      this.count = 2;
    };
    observer.on(event, counter, context);
    observer.trigger(event, null);
    assert.equal(2, context.count);
    
  });
  
  it('should execute callback with observer context when no context specified', function () {
    var Obj = function () {
      this.count = 2;
    };
    Obj.prototype = Object.create(PubSub.prototype);
    Obj.prototype.counter = function () {
      this.count = 1;
    };
    Obj.prototype.getCount = function () {
      return this.count;
    }
    var obj = new Obj();
    obj.on(event, obj.counter);
    obj.trigger(event, null);
    assert.equal(1, obj.getCount());
  });
  
  it('should able to remove all handlers', function() {
    var context = {
      count: 0
    };
    var counter = function () {
      this.count++;
    };
    var counter2 = function (event, data) {
      this.count += data;
    };
    observer.on(event, counter, context);
    observer.on(event, counter2, context);
    
    observer.trigger(event, 2);
    observer.off();
    observer.trigger(event);
    assert.equal(3, context.count);
    
  });
  
  it('should able to remove all handlers from particular event', function() {
    var context = {
      count: 0
    };
    var counter = function () {
      this.count++;
    };
    observer.on('event1', counter, context);
    observer.on('event2', counter, context);
    
    observer.trigger('event1');
    observer.trigger('event2');
    assert.equal(2, context.count);
    observer.off('event1');
    observer.trigger('event1');
    observer.trigger('event2');
    assert.equal(3, context.count);
    
  });
  
  it('should able to remove handler from all events', function() {
    var context = {
      count: 0
    };
    var counter = function () {
      this.count++;
    };
    observer.on('event1', counter, context);
    observer.on('event2', counter, context);
    
    observer.trigger('event1');
    observer.trigger('event2');
    assert.equal(2, context.count);
    observer.off(counter);
    observer.trigger('event1');
    observer.trigger('event2');
    assert.equal(2, context.count);
    
  });
  
  it('should able to remove handler under specified event', function() {
    var context = {
      count: 0
    };
    var counter = function () {
      this.count++;
    };
    var counter1 = function () {
      this.count++;
    };
    observer.on('event1', counter, context);
    observer.on('event1', counter1, context);
    observer.on('event2', counter, context);
    
    observer.trigger('event1');
    observer.trigger('event2');
    assert.equal(3, context.count);
    observer.off('event1', counter);
    observer.trigger('event1');
    observer.trigger('event2');
    assert.equal(5, context.count);
    
  });
  
});