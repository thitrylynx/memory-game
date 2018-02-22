'use strict';

var startPage = document.querySelector('.start-page');
var gamePage = document.querySelector('.game-page');
var endPage = document.querySelector('.end-page');
var endPageButton = document.querySelector('.end-page_button');
var startButton = startPage.querySelector('.start-page_button');
var restartButton = document.querySelector('.game-page_button');
var score = document.querySelector('.game-page_score-number');
var cardListAll = document.querySelector('.game-page_cards-list');
var endScore = document.querySelector('.end-page__score');

var clickability = 1;
var countClick = 0;
var lastCard;
var timeoutId;

var gameOptions = {
  renderCards: function() {
    window.card.renderCardList();

    (function() {
      timeoutId = setTimeout(function() {
        gameOptions.closeOrDeleteCard('', 0, 'game-page_card--card-back', 0);
      }, 5000);
    })();
  },

  //   var timeoutId = setTimeout(function() {
  //     gameOptions.closeOrDeleteCard('', 0, 'game-page_card--card-back', 0);
  //   }, 5000);
  // },

  showCard: function(element) {
    element.classList.remove('game-page_card--card-back');
    element.setAttribute('data-card-status', 1);
  },

  /*
     * Закрытие или удаление согласно входящим параметрам
     *
     * @param {number} cardStatus состояние карты
     * @param {string} tabIndex 
     * @param {string} className имя класса 
     * @param {string} attribute 
     */

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
  },

  // data-status: 0 - не используется, 1 - проверка, 2 - удалена
  selectCard: function(evt) {
    var target = evt.target;

    if (
      target.classList.contains('game-page_card--card-back') &&
      clickability == window.utils.CLICKABILITY_STATE.ABLE
    ) {
      if (countClick == window.utils.COUNT_CLICK.ZERO) {
        countClick++;
        gameOptions.showCard(target);
        lastCard = target.getAttribute('data-card-id');
      } else {
        var newCard = target.getAttribute('data-card-id');

        if (lastCard == newCard) {
          var cardsClose = cardListAll.getElementsByClassName('game-page_card--card-back').length;

          score.textContent = +score.textContent + cardsClose * 42;
          gameOptions.showCard(target);
          clickability = window.utils.CLICKABILITY_STATE.UNABLE;

          setTimeout(function() {
            gameOptions.closeOrDeleteCard(
              2,
              '',
              'game-page_card--card-none',
              window.utils.COUNT_CLICK.SINGLE
            );
            clickability = window.utils.CLICKABILITY_STATE.ABLE;
          }, 300);
        } else {
          gameOptions.showCard(target);
          clickability = window.utils.CLICKABILITY_STATE.UNABLE;
          var elems = document.querySelectorAll('[data-card-status="2"]').length;

          score.textContent = +score.textContent - elems * 42;

          if (score.textContent < 0) {
            score.textContent = 0;
          }

          setTimeout(function() {
            gameOptions.closeOrDeleteCard(
              0,
              0,
              'game-page_card--card-back',
              window.utils.COUNT_CLICK.SINGLE
            );
            clickability = window.utils.CLICKABILITY_STATE.ABLE;
          }, 300);
        }
        var dsdsd = document.querySelectorAll('[data-card-status="2"]').length;
        if (document.querySelectorAll('[data-card-status="2"]').length == 16) {
          gamePage.classList.add('hidden');
          endPage.classList.remove('hidden');
          endScore.textContent = score.textContent;
        }
        countClick = window.utils.COUNT_CLICK.ZERO;
      }
    }
  }
};

function startGame() {
  gamePage.classList.remove('hidden');
  startPage.classList.add('hidden');
  gameOptions.renderCards();
  document.removeEventListener(window.utils.EVENT_TYPES.CLICK, startGame);
}

function restartGame() {
  window.utils.removeChilds('.game-page_cards-list');
  score.textContent = 0;
  clearTimeout(timeoutId);
  gameOptions.renderCards();
  document.removeEventListener(window.utils.EVENT_TYPES.CLICK, restartGame);
}

function oneMoreGame() {
  endPage.classList.add('hidden');
  gamePage.classList.remove('hidden');
  window.utils.removeChilds('.game-page_cards-list');
  score.textContent = 0;
  gameOptions.renderCards();
  document.removeEventListener(window.utils.EVENT_TYPES.CLICK, restartGame);
}

// var debounceUpdate = window.utils.debounce(restartGame);

startButton.addEventListener(window.utils.EVENT_TYPES.CLICK, startGame);

restartButton.addEventListener(window.utils.EVENT_TYPES.CLICK, restartGame);

endPageButton.addEventListener(window.utils.EVENT_TYPES.CLICK, oneMoreGame);

var onClick = function(evt) {
  gameOptions.selectCard(evt);
  document.body.removeEventListener(window.utils.EVENT_TYPES.CLICK, onClick);
};

var onKeyDown = function(evt) {
  if (evt.keyCode === window.utils.KEY_CODES.ENTER) {
    gameOptions.selectCard(evt);
  }
};

document.addEventListener(window.utils.EVENT_TYPES.CLICK, onClick);
document.body.addEventListener(window.utils.EVENT_TYPES.KEYDOWN, onKeyDown);
