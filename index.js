
/**
 * Module dependencies.
 */

var indexOf = require('indexof');


/**
 * Polyfill
 */

var attach = window.addEventListener ? 'addEventListener' : 'attachEvent';
var detach = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
var prefix = attach !== 'addEventListener' ? 'on' : '';
var touch = (window.ontouchstart !== undefined);
var keys = {
  'click' : 'touchend',
  'mousedown' : 'touchstart',
  'mouseup' : 'touchend',
  'mousemove' : 'touchmove'
};



/**
 * Expose 'sewer'
 */

var sewer = module.exports = {};


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


/**
 * Thunkify listener callback.
 *
 * Consolidate target element and parse
 * first argument to matches query selection.
 * 
 * @param  {String}   str 
 * @param  {Function} fn
 * @return {Function}
 * @api private
 */

function thunk(el, filter, selector, fn) {
  return function(ev) {
    var target = ev.target || ev.srcElement;
    if(!selector || matches(el, target, selector)) {
      var code = filter[1] && filter[1].replace(/ /g,'');
      if(!code || ev.keyCode.toString() === code) return fn(target, ev);
    }
  };
}


/**
 * Map with touch events (only if touch friendly).
 * 
 * @param  {String} key 
 * @return {String}
 * @api private
 */
function map(key) {
  return touch ? keys[key] : key;
}


/**
 * Attach Event Listener.
 *
 * Examples:
 *
 *   sewer.bind(el, 'click .clickable', function() {
 *     //do something
 *   });
 * 
 * @param  {HTMLElement}   el
 * @param  {String}   str
 * @param  {Function} fn 
 * @param  {Boolean}   capture
 * @return {Array} handler to detach event      
 */

sewer.attach = 
sewer.bind = function(el, str, fn) {
  var args = [].slice.call(arguments, 3);
  var l = args.length - 1;
  var capture = false;
  if(typeof args[l] === 'boolean') {
    capture = args[l];
    l = l - 1;
  }
  var filter = str.split('>');
  var phrase = filter[0].split(' ');
  var topic = phrase.shift();
  var selector = phrase.join(' ');
  var cb = function(ev) {
    var result = thunk(el, filter, selector, fn)(ev);
    for(var i = 0; i <= l; i ++) {
      result = args[i](result);
    }
  };
  el[attach](prefix + map(topic), cb, capture);
  return [topic, cb, capture];
};


/**
 * Detach event listener.
 * 
 * @param  {HTMLElement}   el
 * @param  {String}   str
 * @param  {Function} fn
 * @param  {Boolean}   capture   
 */

sewer.detach = 
sewer.unbind = function(el, str, fn, capture) {
  el[detach](prefix + map(str), fn, capture || false);
};
