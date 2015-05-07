#PubSub 

[![Build Status](https://travis-ci.org/romantaraban/pubsub.svg?branch=master)](https://travis-ci.org/romantaraban/pubsub)

Implementation of Publish/Subscribe pattern in JS.

#Basic Usage
```javascript
var dispatcher = new PubSub();
// subscribe to event
dispatcher.on('update:foo', function(event, prop, value) {
    console.log(prop + ':' + value);
});
// trigger event
dispatcher.trigger('update:foo', 'bar');
// remove listener
dispatcher.off('update:foo');

```

#Methods
```javascript
.on(eventName, function handler(eventName, data) {}, context)
```
{string} eventName -  can be any valid string;

{function} handler accepts 3 arguments:
- eventName - name of triggered event
- data - data passed from .trigger()

{object} context - context in which handler will called

```javascript
.trigger(eventName, [data, data2, ...])
```

```javascript
// will remove all handlers
.off()

// will remove all handlers on this event
.off(eventName)

// will unsubscribe this handler from all events
.off(handler)

// will remove only this handler under particular event
.off(eventName, handler)

// will remove only this handler under particular event in specified context
.off(eventName, handler, context) 
```
