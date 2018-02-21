'use strict';

window.utils = (function() {
  function compareRandom() {
    return Math.random() - 0.5;
  }
  function mixRandomArray(array) {
    var uniqueCards = 9;
    return array.sort(compareRandom).slice(0, uniqueCards);
  }

  return {
    EVENT_TYPES: {
      CLICK: 'click',
      KEYDOWN: 'keydown'
    },
    KEY_CODES: {
      ENTER: 13,
      ESC: 27
    },
    CLICKABILITY_STATE: {
      ABLE: 1,
      UNABLE: 0
    },
    COUNT_CLICK: {
      ZERO: 0,
      SINGLE: 1
    },
    concatArrays: function(array) {
      var primaryArray = mixRandomArray(array);
      var secondaryArray = primaryArray.slice().sort();
      return primaryArray.concat(secondaryArray);
    }
  };
})();
