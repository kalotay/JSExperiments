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

      actual.should.equal(expected)
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

      actual.should.equal(expected)
    })
  })

  describe('applyLeft', function () {
    var applyLeft = _function.applyLeft
    it('should partially apply a function', function () {
      function greet(greeterFirstName, greeterLastName, greetee) {
        return 'Hello, ' + greetee + '. I am ' + greeterFirstName + ' ' + greeterLastName
      }

      var firstName = 'Dan'
        , lastName = 'Kalotay'
        , greetee = 'Bob'
        , expected = greet(firstName, lastName, greetee)
        , partial1 = applyLeft(greet, firstName, lastName)
        , partial2 = applyLeft(greet, firstName)

      partial1(greetee).should.equal(expected)
      partial2(lastName, greetee).should.equal(expected)
    })
  })
})
