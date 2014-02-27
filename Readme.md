# event

  Cross browser event handler with delegation and filtering engine.

## Installation

with [component](http://component.io):

    $ component install bredele/event

with [nodejs](http://nodejs.org/):

    $ npm install event-bredele

## Usage

See [article](http://bredele.github.io/events)

## API

### event(el, str, callback, capture)

  Add an event listener.

```js
var bind = require('event');

bind(document.body, 'click', function(ev, target) {
  //do something
});
```
The second argument of the callback is the element (cross browser target) that trigerred the event.

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

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

