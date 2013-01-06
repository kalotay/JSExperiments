//higher order functions

var slice = Array.prototype.slice

function variadic(fn) {
  if (fn.length < 1) return fn

  return function () {
    var args = 1 <= arguments.length ?
      slice.call(arguments, 0, fn.length - 1) :
      []
      , variadicArgs

    if (fn.length <= arguments.length) {
      variadicArgs = slice.call(arguments, fn.length - 1)
      args.push(variadicArgs)
    }

    return fn.apply(this, args)
  }
}

function _applyLeft(fn, leftArgs) {
  return variadic(function (rightArgs) {
    var args = leftArgs.concat(rightArgs)
    return fn.apply(this, args)
  })
}


exports.variadic = variadic
exports.applyLeft = variadic(_applyLeft)

