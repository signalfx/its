/*! its - v1.0.2 - 2013-01-23
* Copyright 2013 Ozan Turgut; Licensed MIT */
its=function(){var e=function(e,t){e.exports=t;var n=Array.prototype.slice,r=Object.prototype.toString,i=/%s/,s=function(e,t){var n=[],r=e.split(i),s=0,o=r.length;for(;s<o;s++)n.push(r[s]),n.push(t[s]);return n.join("")},o=e.exports=function(e,t){if(e===!1)throw t&&typeof t!="string"?t(arguments.length>3?s(arguments[2],n.call(arguments,3)):arguments[2]):new Error(arguments.length>2?s(t,n.call(arguments,2)):t);return e};return o.type=function(e,t){if(e===!1)throw new TypeError(arguments.length>2?s(t,n.call(arguments,2)):t);return e},o.undefined=function(e){return o.type.apply(null,[e===void 0].concat(n.call(arguments,1)))},o.null=function(e){return o.type.apply(null,[e===null].concat(n.call(arguments,1)))},o.boolean=function(e){return o.type.apply(null,[e===!0||e===!1||r.call(e)==="[object Boolean]"].concat(n.call(arguments,1)))},o.array=function(e){return o.type.apply(null,[r.call(e)==="[object Array]"].concat(n.call(arguments,1)))},o.object=function(e){return o.type.apply(null,[e===Object(e)].concat(n.call(arguments,1)))},function(){var e=[["args","Arguments"],["func","Function"],["string","String"],["number","Number"],["date","Date"],["regexp","RegExp"]],t=0,i=e.length;for(;t<i;t++)(function(){var i=e[t];o[i[0]]=function(e){return o.type.apply(null,[r.call(e)==="[object "+i[1]+"]"].concat(n.call(arguments,1)))}})()}(),typeof /./!="function"&&(o.func=function(e){return o.type.apply(null,[typeof e=="function"].concat(n.call(arguments,1)))}),o.defined=function(e,t){if(e===void 0)throw new ReferenceError(arguments.length>2?s(t,n.call(arguments,2)):t);return e},o.range=function(e,t){if(e===!1)throw new RangeError(arguments.length>2?s(t,n.call(arguments,2)):t);return e},e.exports}({},{});return e}();