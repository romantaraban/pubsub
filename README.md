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
.off(eventName, handler)
```
- If no arguments are passed - all unsubscribe will be removed
- If eventName is passed - it will unsubscribe all handlers on this event
- If handler is passed - it will unsubscribe this handler from all events 
- If both arguments are present - it will remove only this handler under particular event

