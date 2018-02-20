'use strict';

var startPage = document.querySelector('.start-page');
var gamePage = document.querySelector('.game-page');
var startButton = startPage.querySelector('.start-page_button');

startButton.addEventListener('click', function() {
  gamePage.classList.remove('hidden');
  startPage.classList.add('hidden');
});

// сортировка

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

// отбор 9 случайных карт

function compareRandom() {
  return Math.random() - 0.5;
}
function mixRandomArray(array) {
  var uniqueCards = 9;
  return array.sort(compareRandom).slice(0, uniqueCards);
}

// склейка двух случайных массивов

function concatArrays() {
  var primaryArray = mixRandomArray(cards);
  var secondaryArray = primaryArray.slice().sort();
  return primaryArray.concat(secondaryArray);
}

var cardArray = concatArrays();

var cardList = document.querySelector('.game-page_cards-list');

// создание элемента карты

function createCardEl(cardEl) {
  var newCard = document.createElement('li');
  newCard.style.backgroundImage = "url('img/Cards/" + cardEl + ".png')";
  newCard.setAttribute('tabindex', '0');
  newCard.classList.add('game-page_card');
  newCard.dataset.cardId = cardEl;
  newCard.dataset.cardStatus = 0;
  return newCard;
}

// добавление карт в DOM

function renderCardList(array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function(card) {
    var cardElement = createCardEl(card);
    fragment.appendChild(cardElement);
  });
  cardList.appendChild(fragment);
}

// отрисовка, сокрытие DOM элементов (возможно конструктор)

var gameOptions = {
  renderCards: function() {
    renderCardList(cardArray);

    setTimeout(function() {
      gameOptions.closeOrDeleteCard('', '', 'game-page_card--card-back', 0);
    }, 1000);
  },

  showCard: function(element) {
    element.classList.remove('game-page_card--card-back');
    element.setAttribute('data-card-status', 1);
  },

  closeOrDeleteCard: function(cardStatus, tabIndex, className, attribute) {
    var cardListOpen = document.querySelectorAll('.game-page_card');
    cardListOpen.forEach(function(element) {
      var attr = element.getAttribute('data-card-status');
      if (attr == attribute) {
        element.setAttribute('data-card-status', cardStatus);
        element.setAttribute('tabindex', tabIndex);
        element.classList.add(className);
      }
    });
  }
};

gameOptions.renderCards();

var clickability = 1;
var countClick = 0;
var lastCard;

// data-status: 0 - не используется, 1 - проверка, 2 - удалена

var selectCard = function(evt) {
  var target = evt.target;

  if (target.classList.contains('game-page_card--card-back') && clickability === 1) {
    if (countClick == 0) {
      countClick++;
      gameOptions.showCard(target);
      lastCard = target.getAttribute('data-card-id');
    } else {
      var newCard = target.getAttribute('data-card-id');

      if (lastCard === newCard) {
        gameOptions.showCard(target);
        clickability = 0;

        setTimeout(function() {
          gameOptions.closeOrDeleteCard(2, '', 'game-page_card--card-none', 1);
          clickability = 1;
        }, 300);
      } else {
        gameOptions.showCard(target);
        clickability = 0;

        setTimeout(function() {
          gameOptions.closeOrDeleteCard(0, '', 'game-page_card--card-back', 1);
          clickability = 1;
        }, 300);
      }
      countClick = 0;
    }
  }
};

document.addEventListener('click', selectCard);

// var cityPinMapClickHandler = function (evt) {
//   activateDialog(evt, data);
// };

// var cityPinMapEnterPressHandler = function (evt) {
//   if (evt.keyCode === window.utils.ENTER_KEYCODE) {
//     activateDialog(evt, data);
//   }
// };

// showPins(data, 3);

// cityMap.addEventListener('click', cityPinMapClickHandler);
// cityMap.addEventListener('keydown', cityPinMapEnterPressHandler);
// };
