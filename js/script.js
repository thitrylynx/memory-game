'use strict';

var startPage = document.querySelector('.start-page');
var gamePage = document.querySelector('.game-page');
var startButton = startPage.querySelector('.start-page_button');

startButton.addEventListener('click', function() {
  gamePage.classList.remove('hidden');
  startPage.classList.add('hidden');
});
