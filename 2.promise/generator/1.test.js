'use strict';

var r = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var b, c;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return read('a.txt', 'utf8');

          case 2:
            b = _context.sent;
            _context.next = 5;
            return read(b, 'utf8');

          case 5:
            c = _context.sent;
            return _context.abrupt('return', c);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function r() {
    return _ref.apply(this, arguments);
  };
}();

function co(fn) { //let it = gen()
  return function () {
    var gen = fn.apply(this, arguments); // gen = it
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        }
        catch (error) {
          reject(error); return;
        }
        if (info.done) { resolve(value); }
        else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      } 
      return step("next");
    });
  };
}