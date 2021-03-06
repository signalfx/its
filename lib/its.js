// Helpers
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

var templateRegEx = /%s/; // The template placeholder, used to split message templates

/** A basic templating function. 
	
	Takes a string with 0 or more '%s' placeholders and an array to populate it with.

	@param {String} messageTemplate A string which may or may not have 0 or more '%s' to denote argument placement
	@param {Array} [messageArguments] Items to populate the template with

	@example
		templatedMessage("Hello"); // returns "Hello"
		templatedMessage("Hello, %s", ["world"]); // returns "Hello, world"
		templatedMessage("Hello, %s. It's %s degrees outside.", ["world", 72]); // returns "Hello, world. It's 72 degrees outside"

	@returns {String} The resolved message
*/
var templatedMessage = function(messageTemplate, messageArguments){
	var result = [],
		messageArray = messageTemplate.split(templateRegEx),
		index = 0,
		length = messageArray.length;

	for(; index < length; index++){
		result.push(messageArray[index]);
		result.push(messageArguments[index]);
	}

	return result.join('');
};


/** Generic check function which throws an error if a given expression is false
*
*	The params list is a bit confusing, check the examples to see the available ways of calling this function
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String|Object} [messageOrErrorType] A message or an ErrorType object to throw if expression is false
*   @param {String|Object} [messageOrMessageArgs] A message, message template, or a message argument
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {Error}
*
*	@example
*		its(0 < 10); // returns true
*		its(0 > 10); // throws Error with no message
*		its(0 > 10, "Something went wrong!"); // throws Error with message: "Something went wrong!"
*		its(0 > 10, "%s went %s!", "something", "wrong"); // throws Error with message: "Something went wrong!"
*		its(0 > 10, RangeError, "%s went %s!", "something", "wrong"); // throws RangeError with message: "Something went wrong!"
*		its(0 > 10, RangeError); // throws RangeError with no message
*/
var its = module.exports = function(expression, messageOrErrorType){
	if(expression === false){
		if(messageOrErrorType && typeof messageOrErrorType !== "string"){ // Check if custom error object passed
			throw messageOrErrorType(arguments.length > 3 ? templatedMessage(arguments[2], slice.call(arguments,3)) : arguments[2]);	
		} else {
			throw new Error(arguments.length > 2 ? templatedMessage(messageOrErrorType, slice.call(arguments,2)) : messageOrErrorType);	
		}
	}
	return expression;
};

/** Throws a TypeError if a given expression is false
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String} [message] A message or message template for the error (if it gets thrown)
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {TypeError}
*
*	@example
*		its.type(typeof "Team" === "string"); // returns true
*		its.type(typeof "Team" === "number"); // throws TypeError with no message
*		its.type(void 0, "Something went wrong!"); // throws TypeError with message: "Something went wrong!"
*		its.type(void 0, "%s went %s!", "something", "wrong"); // throws TypeError with message: "Something went wrong!"
*/
its.type = function(expression, message){
	if(expression === false){
		throw new TypeError(arguments.length > 2 ? templatedMessage(message, slice.call(arguments,2)) : message);
	}
	return expression;
};

// Helpers
its.undefined = function(expression){
	return its.type.apply(null, [expression === void 0].concat(slice.call(arguments, 1)));
};

its.null = function(expression){
	return its.type.apply(null, [expression === null].concat(slice.call(arguments, 1)));
};

its.boolean = function(expression){
	return its.type.apply(null, [expression === true || expression === false || toString.call(expression) === "[object Boolean]"].concat(slice.call(arguments, 1)));
};

its.array = function(expression){
	return its.type.apply(null, [toString.call(expression) === "[object Array]"].concat(slice.call(arguments, 1)));
};

its.object = function(expression){
	return its.type.apply(null, [expression === Object(expression)].concat(slice.call(arguments, 1)));
};

/** This block creates 
*	its.function
*	its.string
*	its.number
*	its.date
*	its.regexp
*/
(function(){
	var types = [
			['args','Arguments'],
			['func', 'Function'], 
			['string', 'String'], 
			['number', 'Number'], 
			['date', 'Date'], 
			['regexp', 'RegExp']
		],
		index = 0,
		length = types.length;

	for(; index < length; index++){
		(function(){
			var theType = types[index];
			its[theType[0]] = function(expression){
				return its.type.apply(null, [toString.call(expression) === '[object ' + theType[1] + ']'].concat(slice.call(arguments, 1)));
			};
		}());
	}
}());

// optimization from underscore.js by documentcloud -- underscorejs.org
if (typeof (/./) !== 'function') {
	its.func = function(expression) {
		return its.type.apply(null, [typeof expression === "function"].concat(slice.call(arguments, 1)));
	};
}

/** Throws a ReferenceError if a given expression is false
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String} [message] A message or message template for the error (if it gets thrown)
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Object} Returns the expression passed  
*	@throws {ReferenceError}
*
*	@example
*		its.defined("Something"); // returns true
*		its.defined(void 0); // throws ReferenceError with no message
*		its.defined(void 0, "Something went wrong!"); // throws ReferenceError with message: "Something went wrong!"
*		its.defined(void 0, "%s went %s!", "something", "wrong"); // throws ReferenceError with message: "Something went wrong!"
*/
its.defined = function(expression, message){
	if(expression === void 0){
		throw new ReferenceError(arguments.length > 2 ? templatedMessage(message, slice.call(arguments,2)) : message);
	}

	return expression;
};

/** Throws a RangeError if a given expression is false
*
*	@param {Boolean} expression The determinant of whether an exception is thrown
*	@param {String} [message] A message or message template for the error (if it gets thrown)
*	@param {...Object} [messageArgs] Arguments for a provided message template
*
*	@returns {Boolean} Returns the expression passed  
*	@throws {RangeError}
*
*	@example
*		its.range(1 > 0); // returns true
*		its.range(1 < 2); // throws RangeError with no message
*		its.range(1 < 2 && 1 > 2, "Something went wrong!"); // throws RangeError with message: "Something went wrong!"
*		its.range(1 < 2 && 1 > 2, "%s went %s!", "something", "wrong"); // throws RangeError with message: "Something went wrong!"
*/
its.range = function(expression, message){
	if(expression === false){
		throw new RangeError(arguments.length > 2 ? templatedMessage(message, slice.call(arguments,2)) : message);
	}

	return expression;
};