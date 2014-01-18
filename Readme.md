
# event

  Event handler with delegation and filtering engine.

## Installation

  Install with [component](http://component.io):

    $ component install bredele/event

## Usage

### Attach and remove event listener

```js
var event = require('event'),
    btn = document.querySelector('button');

//attach
var handler = event.attach(btn, 'click', function(ev, target) {
	//do something
});

//detach
event.detach(btn, handler[0], handler[1]);

```


### Delegate event


```js
var event = require('event'),
    list = document.querySelector('ul');

event.attach(list, 'click li.clickable', function(ev, target) {
	//do something only when a li with the class clickable is clicked
});
```


### Filter event

```js
var event = require('event'),
    input = document.querySelector('input');

event.attach(input, 'keypress > 13', function(ev, target) {
	//do something
});

```


## License

  MIT
