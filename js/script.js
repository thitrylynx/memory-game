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

    if (typeof gameOptions.hideCard === 'function') {
      setTimeout(function() {
        var cardsElements = cardList.querySelectorAll('.game-page_card');
        gameOptions.hideCard(cardsElements);
      }, 5000);
    }
  },

  hideCard: function(elements) {
    elements.forEach(function(element) {
      element.classList.add('game-page_card--card-back');
    });
  },

  showCard: function(elements) {
    elements.forEach(function(element) {
      element.classList.remove('game-page_card--card-back');
    });
  }
};

gameOptions.renderCards();

var numberClick = 1;
var countClick = 0;
var lastImg;

// newCard.setAttribute('data-card-status', 1);

// data-status: 0 - не используется, 1 - проверка, 2 - закрыта

var selectCard = function(evt) {
  var target = evt.target;

  if (target.classList.contains('game-page_card--card-back') && numberClick === 1) {
    if (countClick === 0) {
      countClick++;
      target.classList.remove('game-page_card--card-back');
      target.setAttribute('data-card-status', 1);
      lastImg = target.getAttribute('data-card-id');
    } else {
      var newImg = target.getAttribute('data-card-id');

      if (lastImg === newImg) {
        target.classList.remove('game-page_card--card-back');
        target.setAttribute('data-card-status', 1);
        numberClick = 0;
        setTimeout(function() {
          var cardListOpen = document.querySelectorAll('.game-page_card');
          cardListOpen.forEach(function(element) {
            var attrr = element.getAttribute('data-card-status');
            if (attrr == 1) {
              element.classList.add('game-page_card--card-none');
              element.setAttribute('data-card-status', 2);
              element.setAttribute('tabindex', '');
            }
          });
          numberClick = 1;
        }, 1000);
      } else {
        target.classList.remove('game-page_card--card-back');
        target.setAttribute('data-card-status', 1);
        numberClick = 0;
        setTimeout(function() {
          var cardListOpen = document.querySelectorAll('.game-page_card');
          cardListOpen.forEach(function(element) {
            var attr = element.getAttribute('data-card-status');
            if (attr == 1) {
              element.classList.add('game-page_card--card-back');
              element.setAttribute('data-card-status', 0);
            }
          });
          numberClick = 1;
        }, 1000);
      }
      countClick = 0;
    }
  }
};

document.addEventListener('click', selectCard);
// $('.igra_pamyat div').click(function(){ //Клик на игровом поле

//      if( $(this).data('state') == 0 && click_flag == 1 ){ //Если ячейка закрыта

//          if( count_click == 0 ){ //Если первый клик по закрытому полю
//              count_click++;
//              last_img = $(this).attr('class');
//              $(this).data('state',1).attr('data-state',1).css('backgroundImage', 'url(' + img_root + last_img.substr(3,1) + '.jpg)');
//          }else{

//              //Если картинки совпадают
//              if( last_img == $(this).attr('class')  ){
//                  $('.' + last_img).data('state',2).attr('data-state',2).css('backgroundImage', 'url(' + img_root + last_img.substr(3,1) + '.jpg)');
//              }else{

//                  $(this).data('state', 1).attr('data-state',1).css('backgroundImage', 'url(' + img_root + $(this).attr('class').substr(3,1) + '.jpg)');

//                   click_flag = 0;

//                  function hide_img() { //Делаем задержку
//                      $('.igra_pamyat div').each(function(){
//                          if( $(this).data('state') == 1 ){
//                              $(this).data('state',0).attr('data-state',0).css('backgroundImage', 'none');
//                          }
//                      });
//                       click_flag = 1;
//                  }
//                  setTimeout(hide_img, 1000);
//              }
//              count_click = 0;
//          }
//      }
//  });
// });

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
