'use strict';

window.game = (function() {
  var startPage = document.querySelector('.start-page');
  var gamePage = document.querySelector('.game-page');
  var endPage = document.querySelector('.end-page');
  var startButton = startPage.querySelector('.start-page_button');
  var restartButton = gamePage.querySelector('.game-page_button');
  var endPageButton = endPage.querySelector('.end-page_button');
  var score = gamePage.querySelector('.game-page_score-number');
  var cardListAll = gamePage.querySelector('.game-page_cards-list');
  var endScore = endPage.querySelector('.end-page__score');

  var clickability = 1;
  var countClick = 0;
  var lastCard;
  var timeoutId;

  var gameOptions = {
    renderCards: function() {
      window.card.renderCardList();

      (function() {
        timeoutId = setTimeout(function() {
          gameOptions.closeOrDeleteCard('', 0, 'game-card--card-back', 0);
        }, 5000);
      })();
    },

    showCard: function(element) {
      element.classList.remove('game-card--card-back');
      element.setAttribute('data-card-status', 1);
      element.style.transform = 'rotate("180deg")';
    },

    /*
       * Сокрытие или удаление элемента согласно входящим параметрам
       *
       * @param {number} cardStatus состояние карты (data-status: 0 - не используется, 1 - проверка, 2 - удалена)
       * @param {string} tabIndex состояние фокуса 
       * @param {string} className имя класса (скрыть/удалить)
       * @param {string} attribute (проверка соответствия состояния карты)
       */

    closeOrDeleteCard: function(cardStatus, tabIndex, className, attribute) {
      var cardListOpen = document.querySelectorAll('.game-card');
      window.card.soundCloseCard();

      cardListOpen.forEach(function(element) {
        var attr = element.getAttribute('data-card-status');
        if (attr == attribute) {
          element.classList.remove('game-card--card-open');
          element.setAttribute('data-card-status', cardStatus);
          element.setAttribute('tabindex', tabIndex);
          element.classList.add(className);
        }
      });
    },

    selectCard: function(evt) {
      var target = evt.target;
      if (
        target.classList.contains('game-card--card-back') &&
        clickability == window.utils.CLICKABILITY_STATE.ABLE
      ) {
        // проверка первой карты
        if (countClick == window.utils.COUNT_CLICK.ZERO) {
          countClick++;
          window.card.soundOpenCard();
          gameOptions.showCard(target);
          target.classList.add('game-card--card-open');
          lastCard = target.getAttribute('data-card-id');
        } else {
          var newCard = target.getAttribute('data-card-id');

          // проверка соответствия с предыдущей картой
          if (lastCard == newCard) {
            var cardsClose = cardListAll.getElementsByClassName('game-card--card-back').length;

            score.textContent = +score.textContent + cardsClose * 42;
            window.card.soundOpenCard();
            gameOptions.showCard(target);
            target.classList.add('game-card--card-open');
            clickability = window.utils.CLICKABILITY_STATE.UNABLE;

            setTimeout(function() {
              gameOptions.closeOrDeleteCard(
                2,
                '',
                'game-card--card-none',
                window.utils.COUNT_CLICK.SINGLE
              );
              clickability = window.utils.CLICKABILITY_STATE.ABLE;
            }, 700);
          } else {
            // сокрытие несоответствующих карт
            window.card.soundOpenCard();
            gameOptions.showCard(target);
            target.classList.add('game-card--card-open');
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
                'game-card--card-back',
                window.utils.COUNT_CLICK.SINGLE
              );
              clickability = window.utils.CLICKABILITY_STATE.ABLE;
            }, 800);
          }
          // проверка количества карт
          if (document.querySelectorAll('[data-card-status="2"]').length == 16) {
            gamePage.classList.add('hidden');
            endPage.classList.remove('hidden');
            window.card.soundEnd();
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
    clickability = 1;
    countClick = 0;
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

  startButton.addEventListener(window.utils.EVENT_TYPES.CLICK, startGame);
  restartButton.addEventListener(window.utils.EVENT_TYPES.CLICK, restartGame);
  endPageButton.addEventListener(window.utils.EVENT_TYPES.CLICK, oneMoreGame);

  function onClick(evt) {
    gameOptions.selectCard(evt);
    document.body.removeEventListener(window.utils.EVENT_TYPES.CLICK, onClick);
  }

  function onKeyDown(evt) {
    if (evt.keyCode === window.utils.KEY_CODES.ENTER) {
      gameOptions.selectCard(evt);
    }
  }

  document.addEventListener(window.utils.EVENT_TYPES.CLICK, onClick);
  document.body.addEventListener(window.utils.EVENT_TYPES.KEYDOWN, onKeyDown);
})();
