
/**
 * Polyfill
 */

var attach = window.addEventListener ? 'addEventListener' : 'attachEvent',
    detach = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = attach !== 'addEventListener' ? 'on' : '';


function matches(el, target, selector) {
	//refactor with maple (childnodes indexof)
	return [].slice.call(el.querySelectorAll(selector)).indexOf(target) > -1;
}

/**
 * [bind description]
 * @return {[type]} [description]
 */

 exports.bind = function(el, str, fn, capture) {
 	var filter = str.split('>');
 	var phrase = filter[0].split(' '),
 			topic = phrase.shift(),
 			selector = phrase.join(' ');

 	if(selector) {
 		el[attach](prefix + topic, function(ev) {
 			var target = ev.target || ev.srcElement,
 			 		code = filter[1] && filter[1].replace(/ /g,'');
 			if(matches(el, target, selector)) {
 				if(!code || ev.keyCode.toString() === code) fn(target, ev); //is it the order right?
 			}
 		}, capture === true);
 	} else {
 		el[attach](prefix + topic, function(ev){
 			var target = ev.target || ev.srcElement,
 			    code = filter[1] && filter[1].replace(/ /g,'');

 			if(!code || ev.keyCode.toString() === code) fn(target, ev);
 		}, capture === true);
 	}
 };
