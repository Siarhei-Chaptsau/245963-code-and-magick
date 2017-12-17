'use strict';

(function () {
  // Нажатие на .setup-open удаляет класс hidden у блока setup, нажатие на .setup-close возвращает ему класс hidden
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');
  var defaultLocationPopup = { // координаты попапа по умолчанию
    x: 50,
    y: 80
  };
  var dialogHandle = setup.querySelector('.upload'); // объект который собираемся перетаскивать

  var returnToDefaultLocation = function () { // дефолтная локация попапа до перемещения
    setup.style.left = defaultLocationPopup.x + '%'; // 50% отступ от родит левого края
    setup.style.top = defaultLocationPopup.y + 'px';
  };

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

  var openPopup = function () {
    setup.classList.remove('hidden');
    returnToDefaultLocation();
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

  // функция перемещение попапа при нажатии на аватар
  dialogHandle.addEventListener('mousedown', function (evt) { // начало события перетаскивания
    evt.preventDefault();// отменяем, т.к. по умолчанию браузер запрещает перетаскивать что попало куда попал
    var startCoords = { // координаты точки, с которой начали перемещать диалог
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) { // смещение относительно первоначальной точки
      moveEvt.preventDefault(); // отменяем, т.к. по умолчанию браузер запрещает перетаскивать что попало куда попал
      var shift = { // объёкт записывает смещение относительно стартовых координат
        x: startCoords.x - moveEvt.clientX, // отнятие текущих координат от стартовых
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // перезапись стартовых координат после движения
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px'; // координаты верхней части родит узла минус смещение
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();// отменяем, т.к. по умолчанию браузер запрещает перетаскивать что попало куда попал

      document.removeEventListener('mousemove', onMouseMove); // удаление обработчиков перемещения
      document.removeEventListener('mouseup', onMouseUp); // удаление обработчиков отпускания кнопки
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
