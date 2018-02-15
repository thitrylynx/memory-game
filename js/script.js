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

renderCardList(cardArray);
