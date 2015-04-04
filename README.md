#PubSub 

[![Build Status](https://travis-ci.org/romantaraban/pubsub.svg?branch=master)](https://travis-ci.org/romantaraban/pubsub)

Implementation of Publish/Subscribe pattern in JS.

#Basic Usage
```
var dispatcher = new PubSub();
// subscribe to event
dispatcher.on('update:foo', function(event, prop, value) {
    console.log(prop + ':' + value);
});
// trigger event
dispatcher.trigger('update:foo', 'bar');
// remove listner
dispatcher.off('update:foo');

```

#Methods
```
.on(eventName, function handler(eventName, data) {}, context)
```
{string} eventName -  can be any valid string;

{function} handler accepts 3 arguments:
- eventName - name of triggered event
- data - data passed from .trigger()

{object} context - context in which handler will called

```
.trigger(eventName, data)
```

```
.off() // will remove all handlers
.off(eventName) // will remove all handlers on this event
.off(handler) // will unsubscribe this handler from all events
.off(eventName, handler) // will remove only this handler under particular
```
