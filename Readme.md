
# event

  Cross browser event handler with delegation and filtering engine.

## Installation

  Install with [component](http://component.io):

    $ component install bredele/event

## Usage

See [article](http://bredele.github.io/events)

## API

### event(el, str, callback, capture)

  Add an event listener.

```js
var bind = require('event');

bind(document.body, 'click', function() {
  //do something
});
```

  Delegate events.

```js
bind(document.body, 'click button.clickable', function() {
  //do something only when buttons with the 
  //class clickable are clicked
});
```

  Filter events.

```js
var input = document.querySelector('input');

bind(input, 'keypress > 13', function() {
  //do something only on enter
});
```

Returns an array (topic, callback, capture) in case you want to remove the listener.

### .off(el, topic, callback, capture)

 Remove an event listener.

```js
bind.off(document.body,'click', fn);
```

## License

  MIT

