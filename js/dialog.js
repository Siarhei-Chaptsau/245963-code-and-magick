'use strict';

(function () {
  // Нажатие на .setup-open удаляет класс hidden у блока setup, нажатие на .setup-close возвращает ему класс hidden
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');

  // открываем попап кликом
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  // закрываем попап кликом
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // закрываем попап кликом на кнопку Сохранить
  setupSubmit.addEventListener('click', function () {
    closePopup();
  });

  // закрываем попап Esc
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  /* старый аналог
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };
  */
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress); // добавляет обратобчик с возможностью закрыть попап через Esc
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress); // убирает обратобчик с возможностью закрыть попап через Esc
  };


  // открываем попап Enter
  var onIconEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };
  setupOpen.addEventListener('keydown', onIconEnterPress);

  // закрываем попап Enter
  var onButtonEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };
  setupClose.addEventListener('keydown', onButtonEnterPress);

  // закрываем попап Enter на кнопку Сохранить
  var onSubmitEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };
  setupSubmit.addEventListener('keydown', onSubmitEnterPress);

})();
