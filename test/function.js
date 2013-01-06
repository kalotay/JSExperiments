var _function = require('../lib/function')
var assert = require('assert')

describe('function', function () {
  describe('variadic', function () {
    it ('should turn pure variadic to unary', function () {
      function toCsv() {
        var args = Array.prototype.slice.call(arguments, 0)
        return args.join()
      }

      var toCsv2 = _function.variadic(function (args) {
        return args.join()
      })

      , first = 'a'
      , second = 'b'
      , third = 'c'
      , expected = toCsv(first, second, third)
      , actual = toCsv2(first, second, third)

      expected.should.equal(actual)
    })
  })
})
