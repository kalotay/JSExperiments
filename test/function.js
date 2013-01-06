var _function = require('../lib/function')
var assert = require('assert')

describe('function', function () {
  describe('variadic', function () {
    var variadic = _function.variadic
    it ('should turn pure variadic to unary', function () {
      function toCsv() {
        var args = Array.prototype.slice.call(arguments, 0)
        return args.join()
      }

      var toCsv2 = variadic(function (args) {
        return args.join()
      })

      , first = 'a'
      , second = 'b'
      , third = 'c'
      , expected = toCsv(first, second, third)
      , actual = toCsv2(first, second, third)

      expected.should.equal(actual)
    })
    it('should split fixed from variadic arguments', function () {
      function podium(winner) {
        var losers = Array.prototype.slice.call(arguments, 1).join()

        return 'Winner: ' + winner + ' Losers: ' + losers
      }

      var podium2 = variadic(function (winner, losers) {
        return 'Winner: ' + winner + ' Losers: ' + losers
      })
      , winner = 'The Best'
      , second = 'Not as good'
      , third = 'Rubbish'
      , expected = podium(winner, second, third)
      , actual = podium2(winner, second, third)

      expected.should.equal(actual)
    })
  })
})
