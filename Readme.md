# Sewer

  Sewer will help you dealing with all the crap needed to handle dom events.

  Sewer is cross browser and provides some cool features such as:
   - cross browser target element
   - automatic touch mapping
   - delegation
   - chaining
   - filtering

## Installation

with [component](http://component.io):

    $ component install bredele/sewer

with [nodejs](http://nodejs.org/):

    $ npm install sewer

Sewer is small and do one thing, listening dom events. It encourages composition and is already used in some
projects such as **[brick](http://github.com/bredele/brick)** or **[wall](http://github.com/bredele/wall)**. 

## Usage

```js
var ev = require('sewer');

ev.bind(document.body, 'click', function(target, event) {
  // do something
});
```

  See [API](#api) for more details.

### Delegation 

 Delegate events with query selection. In the example above, the callback
 is executed only when a `button` with the className `clickable` is
 clicked.

```js
ev.bind(document.body, 'click button.clickable', function() {
  //do something only when buttons with the 
  //class clickable are clicked
});
```

### Touch events

  Touch events are automatically mapped with desktop/mouse events. It is great because
  your implementation doesn't depend on the device and at the end you'll have one code that works everywhere.

```js
ev.bind(el, 'click', function(target, event) {
  // do something on touch end
});
```

  In this example the callback is executed on `touchend` if you are on a mobile device
  and on `click` otherwise.

```
click => touchend
mouseup => touchend
mousedown => touchstart
mousemove => touchmove
```

### Chaining

  A code which depends on the event is hard to reuse or maintain. A good practice
  is to dissociate the event manipulation from the real logic:

```js
ev.bind(el, 'click', fn1, fn2);

function fn1(target, e) {
  e.preventDefault();
  return target.innerHTML;
}

function fn2(str) {
  //do something on target innerHTML
}
```

### Filtering

  Filter events with key code. In the example above, the callback is executed
  only when `enter` is pressed.

```js
var input = document.querySelector('input');

ev.bind(input, 'keypress > 13', function() {
  //do something only on enter
});
```

## API

### .bind(el, str, callback, capture)

  Add an event listener (alias `attach`).

```js
ev.bind(document.body, 'click', function(target, ev) {
  //do something
});
```
The first argument of the callback is the element (cross browser target) that trigerred the event.


`bind` returns an array (topic, callback, capture) in case you want to remove the listener.


### .unbind(el, topic, callback, capture)

 Remove an event listener (alias `detach`).

```js
ev.unbind(document.body,'click', fn);
```

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

