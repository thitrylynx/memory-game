'use strict';

window.card = (function() {
  var cards = [
    '0C',
    '0D',
    '0H',
    '0S',
    '2C',
    '2D',
    '2H',
    '2S',
    '3C',
    '3D',
    '3H',
    '3S',
    '4C',
    '4D',
    '4H',
    '4S',
    '5C',
    '5D',
    '5H',
    '5S',
    '6C',
    '6D',
    '6H',
    '6S',
    '7C',
    '7D',
    '7H',
    '7S',
    '8C',
    '8D',
    '8H',
    '8S',
    '9C',
    '9D',
    '9H',
    '9S',
    'AC',
    'AD',
    'AH',
    'AS',
    'JC',
    'JD',
    'JH',
    'JS',
    'KC',
    'KD',
    'KH',
    'KS',
    'QC',
    'QD',
    'QH',
    'QS'
  ];
  // отрисовка, сокрытие DOM элементов (возможно конструктор)
  function createCardEl(cardEl) {
    var newCard = document.createElement('li');
    newCard.style.backgroundImage = "url('img/Cards/" + cardEl + ".png')";
    newCard.style.cursor = 'pointer';
    newCard.setAttribute('tabindex', '0');
    newCard.classList.add('game-card');
    newCard.dataset.cardId = cardEl;
    newCard.dataset.cardStatus = 0;
    return newCard;
  }
  return {
    // добавление карт в DOM
    renderCardList: function() {
      var cardArray = window.utils.concatArrays(cards);
      var cardList = document.querySelector('.game-page_cards-list');
      var fragment = document.createDocumentFragment();
      cardArray.forEach(function(card) {
        var cardElement = createCardEl(card);
        fragment.appendChild(cardElement);
      });
      cardList.appendChild(fragment);
    },
    soundOpenCard: function() {
      var audio = new Audio();
      audio.src = 'sounds/openCard.mp3';
      audio.autoplay = true;
      audio.volume = 0.05;
    },
    soundCloseCard: function() {
      var audio = new Audio();
      audio.src = 'sounds/closeCard.mp3';
      audio.autoplay = true;
      audio.volume = 0.05;
    },
    soundEnd: function() {
      var audio = new Audio();
      audio.src = 'sounds/finish.mp3';
      audio.autoplay = true;
      audio.volume = 0.05;
    }
  };
})();
