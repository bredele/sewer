
/**
 * Polyfill
 */

var attach = window.addEventListener ? 'addEventListener' : 'attachEvent',
		detach = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
		prefix = attach !== 'addEventListener' ? 'on' : '',
		indexOf = require('indexof');

/**
 * Matches query selection.
 * 
 * @param  {HTMLElement} el 
 * @param  {HTMLElement} target  
 * @param  {String} selector 
 * @return {Boolean}  true if the element would be selected by the 
 * specified selector string
 */

function matches(el, target, selector) {
	return indexOf([].slice.call(el.querySelectorAll(selector)), target) > -1 ;
}


module.exports = event;


/**
 * Attach Event Listener.
 * 
 * @param  {HTMLElement}   el
 * @param  {String}   str
 * @param  {Function} fn 
 * @param  {Boolean}   capture
 * @return {Array} handler to detach event      
 */

function event(el, str, fn, capture) {
	var filter = str.split('>'),
			phrase = filter[0].split(' '),
			topic = phrase.shift(),
			selector = phrase.join(' ');

	//TODO: do that globally?
	var cb = function(ev) {
		var target = ev.target || ev.srcElement;
		if(!selector || matches(el, target, selector)) {
			var code = filter[1] && filter[1].replace(/ /g,'');
			if(!code || ev.keyCode.toString() === code) fn(target, ev);
		}
	};

	el[attach](prefix + topic, cb, capture || false);
	return [topic, cb, capture];
}


/**
 * Detach event listener.
 * 
 * @param  {HTMLElement}   el
 * @param  {String}   str
 * @param  {Function} fn
 * @param  {Boolean}   capture   
 */

event.off = function(el, str, fn, capture) {
	el[detach](prefix + str, fn, capture || false);
};
