//higher order functions

var slice = Array.prototype.slice;

function variadic(fn) {
  if (fn.length < 1) return fn;

  return function () {
    var originalArgs = 1 <= arguments.length ?
      slice.call(arguments, 0, fn.length - 1) :
      []

    var ellipsoidArgs = fn.length <= arguments.length ?
      originalArgs.concat([slice.call(arguments, fn.length - 1)]) :
      []

    return fn.apply(this, ellipsoidArgs)
  }
}

exports.variadic = variadic;

