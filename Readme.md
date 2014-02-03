
# event

  Event handler with delegation and filtering engine.

## Installation

  Install with [component](http://component.io):

    $ component install bredele/event

## Usage

### Attach and remove event listener

```js
var events = require('event'),
    btn = document.querySelector('button');

//attach
var handler = events(btn, 'click', function(ev, target) {
	//do something
});

//detach
events.off(btn, handler[0], handler[1]);

```


### Delegate event


```js
var list = document.querySelector('ul');

events(list, 'click li.clickable', function(ev, target) {
	//do something only when a li with the class clickable is clicked
});
```


### Filter event

```js
var input = document.querySelector('input');

events(input, 'keypress > 13', function(ev, target) {
	//do something
});

```


## License

  MIT
