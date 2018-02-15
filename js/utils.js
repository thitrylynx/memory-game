'use strict';

window.utils = (function () {

  return {
    EVENT_TYPES: {
      CLICK: 'click',
      KEYDOWN: 'keydown',
      MOUSEDOWN: 'mousedown',
      MOUSEMOVE: 'mousemove',
      MOUSEUP: 'mouseup'
    },
    KEY_CODES: {
      ENTER: 13,
      ESC: 27
    },
    removeClass: function (elements, className) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(className)) {
          elements[i].classList.remove(className);
        }
      }
    },
    removeChild: function (parent) {
      while (parent.children.length !== 1) {
        parent.removeChild(parent.children[1]);
      }
    },
    translate: function (value) {
      switch (value) {
        case 'flat':
          return 'Квартира';
        case 'house':
          return 'Дом';
        case 'bungalo':
          return 'Бунгало';
      } return value;
    }
  };
})();
