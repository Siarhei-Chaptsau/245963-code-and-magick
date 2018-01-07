'use strict';

(function () {
  var setup = document.querySelector('.setup');
  /* var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');*/

  var similarListElement = setup.querySelector('.setup-similar-list'); // находим элемент, в который мы будем вставлять похожих магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Находим шаблон-мага, который мы будем копировать (мы используем весь DocumentFragment, находящийся в шаблоне)

  setup.classList.remove('hidden'); // показываем окно настроек пользователя

  // Отрисуем шаблон-мага - функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true); // клонируем содержимое шаблон-мага
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя в шаблон-мага
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // добавляем цвет плаща в шаблон-мага
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; // добавляем цвет глаз мага в шаблон-мага
    return wizardElement;
  };

  // Функция загрузки данных при успешном результате
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) { // отображать-вставлять будем только 4 мага из загруженных
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment); // вставляем отрисованного мага в нужное поле
    setup.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
  };

  // Функция вывода ошибки при отправке
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  // ----- использование callbacks ----- //

  // Функция изменения цвета
  /*
  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  // Функция изменения фона
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  // Обработчик событий - изменение цвета мантии персонажа по нажатию
  wizardCoat.addEventListener('click', function () {
    // event.target.style.fill = getRandom(WIZARD_COAT_COLOR);
    window.colorizeElement(wizardCoat, getRandom(WIZARD_COAT_COLOR), fillElement);
  });

  // Обработчик событий - изменение цвета глаз персонажа по нажатию
  wizardEyes.addEventListener('click', function () {
    // event.target.style.fill = getRandom(WIZARD_EYES_COLOR);
    window.colorizeElement(wizardEyes, getRandom(WIZARD_EYES_COLOR), fillElement);
  });

  // Обработчик событий - изменение цвета фаерболов по нажатию
  wizardFireball.addEventListener('click', function () {
    // fireball.style.background = getRandom(WIZARD_FIREBALL_COLOR);
    window.colorizeElement(wizardFireball, getRandom(WIZARD_FIREBALL_COLOR), changeElementBackground);
  });
  */

  // ----- Drag and drop ----- //

  var shopElement = document.querySelector('.setup-artifacts-shop'); // магазин артефактов
  var artifactsElement = document.querySelector('.setup-artifacts'); // рюкзак артефактов
  var draggedItem = null;

  // cрабатывает когда элемент начал перемещаться
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.style.outline = '2px dashed red';
  });

  // срабатывает каждые несколько сотен милисекунд когда перемещаемый элемент оказывается над зоной, принимающей перетаскиваемые элементы
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // cрабатывает, когда перемещаемый элемент попадает на элемент-назначение
  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow'; // подсветка эл-та-поля над которым перемащается объект
    evt.preventDefault();
  });

  // событие запускается при перемещении элемента
  artifactsElement.addEventListener('drag', function (evt) {
    artifactsElement.style.outline = '2px dashed red';
    evt.preventDefault();
  });

  // запускается при перемещении элемента
  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.appendChild(draggedItem);
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

  // запускается в момент перетаскивания, когда курсор мыши выходит за пределы элемента
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = ''; // убираем подсветку эл-та-поля над которым перемащался объект
    evt.preventDefault();
  });
})();
