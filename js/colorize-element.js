'use strict';

(function () {
  window.colorizeElement = function (element, color, callback) {
    element.addEventListener('click', function () {
      return callback(element, color);
    });
  };
})();
